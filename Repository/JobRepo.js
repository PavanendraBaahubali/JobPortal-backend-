const {ObjectId} = require("mongodb");
const User = require("../Models/UserModel");
const getJobById = async (db, jobId) => {
    try{
        console.log("i am in job repo");
        if (!ObjectId.isValid(jobId)) {
            throw new Error('Invalid Job ID');
        }
        const job = await db.collection("companies").findOne({_id : new ObjectId(jobId)});
        return job;
    }catch(err) {
        throw new Error(err.message);
    }
}

const getAppliedJobsCount = async () => {
    console.log('im in job repo');
    try{
        const count = User.aggregate([
            { 
              $unwind: "$appliedJobs" 
            },
            { 
              $addFields: {
                month: { 
                  $toInt: { $arrayElemAt: [{ $split: ["$appliedJobs.appliedDate", "/"] }, 1] } 
                }
              }
            },
            { 
              $group: { 
                _id: "$month", 
                count: { $sum: 1 } 
              }
            },
            { 
              $sort: { _id: 1 } 
            },
            {
              $group: {
                _id: null,
                result: { $push: { k: { $toString: "$_id" }, v: "$count" } }
              }
            },
            {
              $replaceRoot: {
                newRoot: { $arrayToObject: "$result" }
              }
            }
          ]);
          
        console.log(count[0]);
    }
    catch(err){
        throw new Error(err.message);
    }
}



module.exports = {getJobById, getAppliedJobsCount};