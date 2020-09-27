const logger = require('winston')
const Cryptr = require('cryptr');

if(!process.env.CRYPT_SECRET) {
    logger.error("The CRYPT_SECRET environment variable must be declared for password encryption to work. Please add this to .env.")
    process.exit(1);
}

const crypt = new Cryptr(process.env.CRYPT_SECRET);

module.exports.preSaveEncrypt = function(document, field, next) {
    if(document.isModified("password"))
        document.password = crypt.encrypt(document.password);
    next();
}

module.exports.preFindEncrypt = function(document, field, next) {
    document.password = crypt.decrypt(document.password);
    next();
}