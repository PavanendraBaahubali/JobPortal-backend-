const HomeService = require("../Services/HomeService")

const getAllUsers = async(db, req, res) => {
    try{
        const allJobs = await HomeService.getAllJobs(db);
        if (allJobs.length > 0) res.status(200).json(allJobs);
        else res.status(404).json({message : "No Jobs are Found"});
    }
    catch(err){
        res.status(500).json({message : err.message});
    }

}
module.exports = {getAllUsers}