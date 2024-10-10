const express = require('express');
const UserController = require("../Controllers/UserController")

const UserRoute = () => {
    const router = express.Router();
    try{
        router.post('/register', (req, res) => UserController.registerUser(req, res))
        router.post('/login', (req, res) => UserController.loginUser(req, res))
    }
    catch(err) {
        console.log(err.message)
    }
    return router
}

module.exports = UserRoute