const logger = require('winston')
const Cryptr = require('cryptr');

if(!process.env.CRYPT_SECRET) {
    logger.error("The CRYPT_SECRET environment variable must be declared for password encryption to work. Please add this to .env.")
    process.exit(1);
}

const crypt = new Cryptr(process.env.CRYPT_SECRET);

module.exports.preSaveEncrypt = function(field, req, document) {
    if(req.body.password)
        document[field] = crypt.encrypt(document[field]);
}

module.exports.preSendDecrypt = function(field, req, document) {
    if(document[field])
        document[field] = crypt.decrypt(document[field]);
}