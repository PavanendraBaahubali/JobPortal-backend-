const express = require('express');
const cors = require("cors");

const connectDB = require('./db');
const HomeRoute = require('./Routes/HomeRoute');
const FilterRoute = require('./Routes/FilterRoute');
const JobRoute = require('./Routes/JobRoute');


const app = express();
app.use(cors({
    origin : "http://localhost:3000"
}))
const PORT = 3030;


app.use(express.json());

let db;

const startServer = async () => {
    db = await connectDB();

    // app.use('/', HomeRoute(db));
    app.use('/', FilterRoute(db));
    app.use('/job', JobRoute(db));

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
};

startServer()

