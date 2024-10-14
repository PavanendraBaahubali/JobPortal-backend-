const User = require('../Models/UserModel');
const { HashPassword, hashCompare } = require('../security/HashPassword');
const {generateToken} = require('../security/JWT');
const mongoose = require('mongoose');

exports.registerUser = async (req, res) => {
    const { userName, emailId, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ emailId });
        console.log(existingUser);

        if (existingUser) {
            console.log("in existing user block");
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ userName, emailId, password, appliedJobs : [] });
        
        await user.save();
        const token = generateToken(user);

        res.status(201).json({ token, userId : user._id, userName, emailId });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    const { emailId, password } = req.body;
    try {
        const user = await User.findOne({ emailId });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await hashCompare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = generateToken(user);
        res.status(200).json({ token, userId : user._id, userName : user.userName, emailId : user.emailId });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUser = async(req, res) => {
    const ObjectId = mongoose.Types.ObjectId;
    const {userId} = req.params;
    const {name, emailId, password} = req.body;

    console.log('im in controller');
    console.log(userId);
    console.log(name, emailId, password);

    try{
        const user = await User.findOne({_id : new ObjectId(userId)});
        if(name){
            user.userName = name;
        }
        if(emailId){
            user.emailId = emailId;
        }
        if(password){
            user.password = password;
        }
        await user.save()
        return res.status(200).json({message : 'profile updated'});
    }
    catch(err){
        return res.status(500).json({message : err.message});
    }
}


exports.getProfileData = async(req, res) => {
    const {userId} = req.params;
    const ObjectId = mongoose.Types.ObjectId
    try{
        const profileData = await User.aggregate([
            {$match : {_id : new ObjectId(userId)}},
            {$project : {userName : 1, emailId : 1}}
        ])

        return res.status(200).json(profileData);
    }
    catch(err){
        return res.status(500).json({message : err.message});
    }
}