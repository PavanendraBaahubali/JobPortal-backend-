const express = require('express');
const cors = require("cors");

const connectDB = require('./db');
const HomeRoute = require('./Routes/HomeRoute');
const FilterRoute = require('./Routes/FilterRoute');
const JobRoute = require('./Routes/JobRoute');
const UserRoute = require('./Routes/UserRoute');


const app = express();
app.use(cors({
    origin : "http://localhost:3000"
}))
const PORT = process.env.PORT || 3030;


app.use(express.json());

let db;

const startServer = async () => {
    db = await connectDB();

    app.use('/', FilterRoute(db));
    app.use('/job', JobRoute(db));
    app.use('/auth', UserRoute());

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
};

startServer()

