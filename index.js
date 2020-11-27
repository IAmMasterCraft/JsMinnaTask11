require('dotenv').config();
const express = require("express");
// cors
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const authRoute = require('./routes/auth.route');
const suggestionRoute = require('./routes/suggestion.route');
// bring in keys.js
const db = require("./config/keys");
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
};
//connect to mongoose
mongoose.connect(db.mongoURI, db.mongoSetup)
    .then(() => console.log("MongoDb connected..."))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api', authRoute);
app.use('/api', suggestionRoute);

const port = process.env.PORT || 3000;

app.listen(port, (() => console.log(`server started on port ${port}`)));