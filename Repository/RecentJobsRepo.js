const mongoose = require('mongoose');
const User = require('../Models/UserModel');
const ObjectId = mongoose.Types.ObjectId; 

const getAppliedJobs = async (userId) => {
    console.log('I am in repo');
    console.log('UserID passed:', userId);

  
    if (!ObjectId.isValid(userId)) {
        throw new Error('Invalid User ID');
    }

    try {
        const res = await User.aggregate([
            { $match: { '_id': new ObjectId(userId) } }, 
            { $unwind: '$appliedJobs' },  
            { 
                $project: {  
                    _id: 1, 
                    "appliedJobs.jobId": 1, 
                    "appliedJobs.jobRole": 1 ,
                    "appliedJobs.appliedDate" : 1,
                } 
            }
        ]);

        return res
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {getAppliedJobs};