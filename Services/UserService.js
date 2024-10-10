const User = require("../Models/UserModel")
const jwt = require("../security/JWT");

const saveUser = async (userData) => {
    const {userName, password, emailId} = userData
    console.log('i am in saveUser service');
    console.log(userName, password, emailId);
    try{

        const existUser = await User.findOne({emailId})
        if (existUser){
            throw new Error("User Already Existed");
        }
        const newUser = new User({
            userName, password, emailId
        })
        await newUser.save();
        const token = jwt.generateToken(newUser);

        return token
    }
    catch(err){
        throw new Error(err.message);
    }
}

module.exports = {saveUser}