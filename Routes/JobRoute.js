const express = require('express');
const JobController = require("../Controllers/JobController")

const JobRoute = (db) => {
    const router = express.Router();
    try{

        router.get('/:jobId', (req, res) => JobController.getJobById(db, req, res));
        router.post('/:jobId', (req, res) => JobController.postTheJob(req, res));
        
    }
    catch(err){
        console.log(err.message);
    }
    return router
}
module.exports = JobRoute;