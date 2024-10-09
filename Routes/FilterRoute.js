const express = require("express");
const FilterController = require("../Controllers/FilterController")

const FilterRoute = (db) => {
    const router = express.Router();
    try{
        router.get('/', (req, res) => FilterController.filterJobs(db, req, res));
    }   
    catch(err){
        console.log(err.message);
    }
    return router;    
}

module.exports = FilterRoute;
