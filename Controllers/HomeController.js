const HomeService = require("../Services/HomeService")

const getAllUsers = async(db, req, res) => {
    try{
        const allJobs = await HomeService.getAllJobs(db);
        if (allJobs.length > 0) return  res.status(200).json(allJobs);
        else return res.status(404).json({message : "No Jobs are Found"});
    }
    catch(err){
        return res.status(500).json({message : err.message});
    }

}
module.exports = {getAllUsers}