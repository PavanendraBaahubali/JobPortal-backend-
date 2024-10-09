const FilterRepo = require("../Repository/FilterRepo")

const filterJobs = async (db, filterObj) => {
    try{
        console.log("i am in filter service")
        const jobs = await FilterRepo.filteringJobs(db, filterObj);
        return jobs
    }
    catch(err){
        throw new Error(err.message);

    }
}

module.exports = {filterJobs};