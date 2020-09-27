const mongoose = require("mongoose");
const logger = require("winston");
const config = require("config");

// Generate URI
let production = process.env.NODE_ENV === "production";
let uri = production ? process.env.PROD_MONGO_SERVER : config.get("api.mongoose.server");
if(!uri) {
    logger.error("Could not locate MongoDB server URI.");
    process.exit(1);
}

let database = config.get("api.mongoose.database");

// Initiate database connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: database
}).then(
    () => {
        logger.info("Successfully connected to MongoDB database at '" + uri + database + "'.")
    },
    (err) => {
        logger.error("Could not initiate connection to database. Error: " + err);
        process.exit(1);
    }
);

mongoose.connection.on("error", (err) => {
    logger.error("Database Error: " + err)
});

mongoose.connection.on("disconnected", () => {
    logger.warn("Disconnected from mongoose database.");
});

// Set maximum length of string to 500
mongoose.Schema.Types.String.set('maxlength', 500);

// Load in models here
require("./models/budget.js");
require("./models/log.js");
require("./models/order.js");
require("./models/sponsor.js");
require("./models/user.js");
require("./models/vendorLogin");