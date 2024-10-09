const express = require("express");
const HomeController = require("../Controllers/HomeController")
const HomeRoute = (db) => {
    const router = express.Router();
    router.get("/", (req, res) => HomeController.getAllUsers(db, req, res));
    return router
}

module.exports = HomeRoute