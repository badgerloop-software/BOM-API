const logger = require("winston");
const common = require("./controllers/common");

// https://github.com/expressjs/body-parser/issues/122
module.exports = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        logger.warn("Malformed JSON received on '" + req.path + "'")
        common.sendJSON(req, res, common.status.CLIENT_ERROR, {
            message: "Malformed JSON received."
        })
    }
}