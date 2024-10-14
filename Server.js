const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
require('dotenv').config(); // Load environment variables

const connectDB = require('./db');
const FilterRoute = require('./Routes/FilterRoute');
const JobRoute = require('./Routes/JobRoute');
const UserRoute = require('./Routes/UserRoute');
const ProfileJobRoute = require('./Routes/ProfileJobRoute');

const app = express();
app.use(express.json());
app.use(morgan('dev')); // Log HTTP requests

const allowedOrigins = [
    "https://jofind-1b960.web.app",
    "http://localhost:3000" // For local testing
];

app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

const PORT = process.env.PORT || 3030;

let db;

const startServer = async () => {
    try {
        db = await connectDB();
        app.use('/', FilterRoute(db));
        app.use('/job', JobRoute(db));
        app.use('/auth', UserRoute());
        app.use('/profile', ProfileJobRoute());

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit process with failure
    }
};

startServer();
