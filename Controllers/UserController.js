const User = require('../Models/UserModel');
const { HashPassword, hashCompare } = require('../security/HashPassword');
const {generateToken} = require('../security/JWT');

exports.registerUser = async (req, res) => {
    const { userName, emailId, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ emailId });
        console.log(existingUser);

        if (existingUser) {
            console.log("in existing user block");
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ userName, emailId, password });
        console.log(user)
        await user.save();
        console.log("after save user")
        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    console.log('i am in login controller');
    const { emailId, password } = req.body;
    try {
        const user = await User.findOne({ emailId });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('before match')
        const isMatch = await hashCompare(password, user.password);
        console.log('after match')
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
