const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const logger = require('winston');

// Configuration Variable Setup
require('dotenv').config();
const config = require('config');

// Configure logging
require("./logging.js");

// Setup Express
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("port", config.get("api.port"));

let production = process.env.NODE_ENV === "production"
app.listen(app.get('port'), () => {
    logger.info("HTTP API server in " + (production ? "PRODUCTION" : "DEVELOPMENT") + " mode running on port " + app.get('port') + ".")
});