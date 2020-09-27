const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const logger = require('winston');

// Configuration Variable Setup
require('dotenv').config();
const config = require('config');

// Configure logging
require("./logging.js");

// State Environment Mode
logger.info("Running in " + (process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEVELOPMENT") + " mode.");

// Configure database connection
require("./database.js");

// Setup Express
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add routes
app.use('/', require("./router.js"));

// Start the actual server
app.set("port", config.get("api.port"));
app.listen(app.get('port'), () => {
    logger.info("HTTP API server running on port " + app.get('port') + ".")
});