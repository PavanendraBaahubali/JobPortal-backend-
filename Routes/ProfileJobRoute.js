// ProfileJobRoute.js

const express = require('express');
const JobController = require("../Controllers/JobController");
const UserController = require("../Controllers/UserController");

const ProfileJobRoute = () => {
    const router = express.Router();
    
    try {
        // Define the more specific route first
        router.get('/appliedJobs/:userId', (req, res) => JobController.getAppliedJobs(req, res));

        // Define the general route after the specific one
        router.get('/:userId', (req, res) => UserController.getProfileData(req, res));

        // Apply CORS middleware if needed for the POST request
        router.post('/:userId', (req, res) => UserController.updateUser(req, res));
    } catch (err) {
        console.log(err.message);
    }

    return router;
}

module.exports = ProfileJobRoute;
