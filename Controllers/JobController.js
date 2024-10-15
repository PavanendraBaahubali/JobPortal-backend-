const jobService = require("../Services/GetJobService")
const JobRepo = require("../Repository/JobRepo")
const RecentJobsRepo = require("../Repository/RecentJobsRepo");
const User = require("../Models/UserModel");
const mongoose = require('mongoose');

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

const postTheAppliedJob = async (req, res) => {
    const applicationData = req.body;
    
    // Function to fetch the date in "dd/mm/yy" format
    const fetchDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0'); // Corrected to getDate() instead of getDay()
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    }

    // Add the applied date to application data
    applicationData['appliedDate'] = fetchDate(new Date());

    const ObjectId = mongoose.Types.ObjectId;

    if (!ObjectId.isValid(applicationData.userId)) {
        return res.status(400).json({ message: 'Invalid User ID format' });
    }

    try {
        console.log('Applying for job...', applicationData);

        const updateResponse = await User.updateOne(
            { _id: new ObjectId(applicationData.userId) },  // Ensure userId is treated as an ObjectId
            { $push: { appliedJobs: applicationData } }
        );

        if (updateResponse.nModified === 0) {  // Check if any document was modified
            return res.status(404).json({ message: 'User not found or job not applied' });
        }

        return res.status(200).json({ message: "Your application has been successfully posted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};




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
            return res.status(404).json({message : 'not applied jobs are found'})
        }
        return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({message : err.message})
    }
}

module.exports = {getJobById, postTheAppliedJob, getAppliedJobsCount, getAppliedJobs};