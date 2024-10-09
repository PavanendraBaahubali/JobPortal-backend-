const HomeRepo = require("../Repository/HomeRepo");

const getAllJobs = async(db) => {
    try{
        console.log("I am in service")
        const allJobs = await HomeRepo.getAllJobs(db);
        return allJobs
    }
    catch(err) {
        throw new Error(err.message);
    }
}

module.exports = {getAllJobs}