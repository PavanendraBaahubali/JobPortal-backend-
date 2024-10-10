const filteringJobs = async (db, filterObj) => {

    const { location, role, minSalary, maxSalary,
            fullTime, internship, partTime, contract,
            onSite, remote, hybrid,
            entryLevel, intermediate, advanced
     } = filterObj;

    const filter = {};

    // Matching location
    if (location) {
        filter['job.location'] = {$regex : new RegExp(location, 'i')};
    }

    // Matching role
    if (role) {
        filter['job.title'] = {$regex : new RegExp(role, 'i')}
    }

    // fullTime, internship, partTime, contract
    if (fullTime)
        filter["workTypes.fullTime"] = true
    if(internship)
        filter["workTypes.internship"] = true
    if(partTime)
        filter["workTypes.partTime"] = true
    if(contract)
        filter["workTypes.contract"] = true

    // onSite, remote, hybrid
    if (onSite)
        filter["workSettings.onSite"] = true
    if(remote)
        filter["workSettings.remote"] = true
    if(hybrid)
        filter["workSettings.hybrid"] = true
    
    // entryLevel, intermediate, advanced
    if (entryLevel)
        filter["careerGoals.entryLevel"] = true
    if(intermediate)
        filter["careerGoals.intermediate"] = true
    if(advanced)
        filter["careerGoals.advanced"] = true



    console.log(filter)

    // Matching salary range with conversion
    const salaryFilter = {};
    if (minSalary) {
        salaryFilter['$gte'] = parseInt(minSalary);
    }
    if (maxSalary) {
        salaryFilter['$lte'] = parseInt(maxSalary);
    }

    if (minSalary || maxSalary) {
        filter['$expr'] = {
            $and: [
                { $gte: [{ $toInt: "$salaryRange.from" }, salaryFilter['$gte'] || 0] },
                { $lte: [{ $toInt: "$salaryRange.to" }, salaryFilter['$lte'] || Number.MAX_VALUE] }
            ]
        };
    }

    console.log("I am in filter repo");
    console.log(filter);

    try {
        const jobs = await db.collection("companies").aggregate([
            { $match: filter },
            // { $project: { _id: 1, job: 1, company: 1, salaryRange: 1 } }
        ]).toArray();

        return jobs;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = { filteringJobs };
