// ProfileJobRoute.js

const express = require('express');
const JobController = require("../Controllers/JobController");
const UserController = require("../Controllers/UserController");

const ProfileJobRoute = () => {
    const router = express.Router();
    
    try {
        router.get('/appliedJobs/:userId', (req, res) => JobController.getAppliedJobs(req, res));

        router.get('/:userId', (req, res) => UserController.getProfileData(req, res));

        router.post('/:userId', (req, res) => UserController.updateUser(req, res));
    } catch (err) {
        console.log(err.message);
    }

    return router;
}

module.exports = ProfileJobRoute;
