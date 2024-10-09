const JobRepo = require("../Repository/JobRepo")

const getJobById = async (db, jobId) => {
    try{
        const job = await JobRepo.getJobById(db, jobId);
        return job
    }
    catch(err){
        throw new Error(err.message);
    }
}
module.exports = {getJobById};