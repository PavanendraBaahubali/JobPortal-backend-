const FilterService = require("../Services/FilterService")
const filterJobs = async (db, req, res) => {
    try{
        const jobs = await FilterService.filterJobs(db, req.query);
        if (jobs.length > 0) return res.status(200).json(jobs);
        else return res.status(404).json({message : 'No Jobs were Found'});
    }
    catch(err){
        return res.status(500).json({message : err.message});
    }
}

module.exports = {filterJobs};