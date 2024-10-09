const getAllJobs = async(db) => {
    try{
        console.log('I am in repo')
        const allJobs = await db.collection("companies").find({}).toArray();
        return allJobs
    }
    catch(err) {
        throw new Error(err.message);
    }
}


module.exports = {getAllJobs}