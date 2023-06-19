const express = require('express');
const mongoose = require('mongoose');
const getPersons = require('./controllers/controller');
const connectDB = require('./server/db');
const app = express();
const port = 3000;


// Connect to MongoDB

connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

getPersons.getPersons();
