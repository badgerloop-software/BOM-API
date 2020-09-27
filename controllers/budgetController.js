const logger = require("winston");
const mongoose = require("mongoose");
const common = require("./common");

const Budget = mongoose.model("Budget");

module.exports.getLatest = (req, res) => {
    common.findDocuments(req, res, Budget, {}, true, (documents) => {
        if(!documents) {
            common.sendJSON(req, res, common.status.DOES_NOT_EXIST, {
                error: "The document you have requested does not exist."
            })
            return;
        }
        common.sendJSON(req, res, common.status.OK, {
            document: documents.reduce((newest, current) => {
                return current.dateEffective > newest.dateEffective ? current : newest;
            })
        })
    })
}