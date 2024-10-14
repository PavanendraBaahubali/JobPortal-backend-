const jobService = require("../Services/GetJobService")
const { postAppliedJob } = require("../Repository/RecentJobsRepo")
const JobRepo = require("../Repository/JobRepo")
const RecentJobsRepo = require("../Repository/RecentJobsRepo")

const getJobById  =  async(db, req, res) =>{
    const {jobId} = req.params;
    console.log(jobId)
    try{
        const job = await jobService.getJobById(db, jobId);
        if(job){
            return res.status(200).json(job);
        }
        else{
            return res.status(404).json({message : 'JOB NOT FOUND'})
        }
    }
    catch(err){
        res.status(500).json({message : err.message});
        console.log(err.message);
    }
}

const postTheJob = async (req, res) => {
    try{
        console.log('im in controller');
        const isSuccess = await postAppliedJob(req.body);
        if(isSuccess) return  res.status(200).json({message : "Your application successfully posted"});
        
    }
    catch(err){
        return res.status(500).json({message : err.message});
    }
}



const getAppliedJobsCount = async (req, res) => {
        const userId = req.params;
        try{
            const counter = await JobRepo.getAppliedJobsCount(userId);
            console.log(counter, 'from controller');
        }
        catch(err) {
            res.status(500).json({message : err.message});
        }

}

const getAppliedJobs = async (req, res) => {
    const {userId} = req.params;
    try{
        const data = await RecentJobsRepo.getAppliedJobs(userId);
        if (data.length <= 0){
            res.status(404).json({message : 'not applied jobs are found'})
        }
        return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({message : err.message})
    }
}

module.exports = {getJobById, postTheJob, getAppliedJobsCount, getAppliedJobs};