const express = require('express');
const cors = require("cors");

const connectDB = require('./db');
const FilterRoute = require('./Routes/FilterRoute');
const JobRoute = require('./Routes/JobRoute');
const UserRoute = require('./Routes/UserRoute');


const app = express();
app.use(cors({
    origin : "https://jofind-1b960.web.app"
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

