const mongoose = require("mongoose");
const appliedJobsSchema = new mongoose.Schema({
    jobId : {type : mongoose.Schema.Types.ObjectId, required : true},
    userId : {type : mongoose.Schema.Types.ObjectId, required : true},
    jobRole : {type : String, required : true},
    appliedDate : {type : String, required : true}
})

const AppliedJobs = mongoose.model('AppliedJobs', appliedJobsSchema);
module.exports = AppliedJobs;