const jobService = require("../Services/GetJobService")
const getJobById  =  async(db, req, res) =>{
    const {jobId} = req.params;
    console.log(jobId)
    try{
        const job = await jobService.getJobById(db, jobId);
        if(job){
            res.status(200).json(job);
        }
        else{
            res.status(404).json({message : 'JOB NOT FOUND'})
        }
    }
    catch(err){
        res.status(500).json({message : err.message});
        console.log(err.message);
    }
}

module.exports = {getJobById};