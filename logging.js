const winston = require('winston');

// Define how the console logs should be formatted
const consoleFormat = winston.format.combine(
    winston.format.printf(({level, message}) => {
       return (typeof message === "object" ? JSON.stringify(message) : message);
    }),
    winston.format.timestamp({format: "MM/DD/YYYY h:mm:ss A"}),
    winston.format.colorize(),
    winston.format.printf(({timestamp, level, message}) => {
        return "[" + timestamp + "] " + level + ": " + message;
    })
);

// Define how JSON logfiles should be formatted
const jsonFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
)

// Define the console transport (what shows up on the screen)
const consoleTransport = new winston.transports.Console({
    timestamp: true,
    colorize: true,
    format: consoleFormat,
    level: "debug"
})

// Define debug.log, a JSON logfile with debug logs
const debugFileTransport = new winston.transports.File({
    dirname: "logs",
    filename: "debug.log",
    options: {
        // Open the file in write, rather than append mode
        // Replaces contents of file, instead of adding to them
        flags: "w"
    },
    format: jsonFormat,
    level: "debug"
});

// Define clean.log, a JSON logfile with no debug logs
const cleanFileTransport = new winston.transports.File({
    dirname: "logs",
    filename: "clean.log",
    options: {
        // Open the file in write, rather than append mode
        // Replaces contents of file, instead of adding to them
        flags: "w"
    },
    format: jsonFormat,
    level: "info"
});

// Configure Winston
winston.configure({
    level: "debug",
    transports: [
        consoleTransport,
        debugFileTransport,
        cleanFileTransport
    ]
});

// Override Default Logging
// https://stackoverflow.com/questions/56097580/override-console-logerror-with-winston-no-longer-working
console.log = (...args) => winston.info.call(winston, args);
console.info = (...args) => winston.info.call(winston, args);
console.debug = (...args) => winston.debug.call(winston, args);
console.error = (...args) => winston.error.call(winston, args);