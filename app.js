'use strict';

import express from 'express';
import connect from './database/connection.js';
import userProfile from './routes/userProfile.js';
import userComment from "./routes/userComment.js";
import userLike from "./routes/userLike.js";
const app = express();
const port =  process.env.PORT || 3001;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.json());

// routes
app.use("/profile", userProfile)
app.use("/comment", userComment)
app.use("/like", userLike)


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

