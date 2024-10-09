const {ObjectId} = require("mongodb")
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

module.exports = {getJobById};