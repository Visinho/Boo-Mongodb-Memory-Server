'use strict';

import express from 'express';
import connect from './database/connection.js';
const app = express();
const port =  process.env.PORT || 3001;

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
// app.use('/', require('./routes/profile')());
app.use(express.json());

// start server
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server!")
    }
}).catch((error) => {
    console.log("Invalid Database Connection!!!")
})

