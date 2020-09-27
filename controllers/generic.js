const common = require("./common");
const mongoose = require("mongoose");

let models = {};

let generic = {};

function loadModel(modelName) {
    if(!models[modelName])
        models[modelName] = mongoose.model(modelName);
    return models[modelName];
}

function queryFromString(req, res, queryString) {
    // Yes, yes, I know
    return eval("exports = " + queryString);
}

generic.get = (modelName, queryString, required = [], multiple = true) => {
    let model = loadModel(modelName)
    return (req, res) => {
        common.ensureParams(req, res, required, () => {
            common.findAndSendDocuments(req, res, model, queryFromString(req, res, queryString), multiple);
        })
    }
}

generic.delete = (modelName, queryString, required = [], multiple = true) => {
    let model = loadModel(modelName)
    return (req, res) => {
        common.ensureParams(req, res, required, () => {
            common.deleteDocumentsAndSendResponse(req, res, model, queryFromString(req, res, queryString), multiple);
        })
    }
}

generic.post = (modelName, bodyFields, required = bodyFields) => {
    let model = loadModel(modelName)
    return (req, res) => {
        common.ensureParams(req, res, required, () => {
            let documentBody = {}
            for(let i = 0; i < bodyFields.length; i++)
                documentBody[bodyFields[i]] = req.body[bodyFields[i]];
            common.createAndSendDocument(req, res, model, documentBody);
        })
    }
}

generic.patch = (modelName, bodyFields, queryString, required = [], multiple = true) => {
    let model = loadModel(modelName)
    return (req, res) => {
        common.ensureParams(req, res, required, () => {
            let patchBody = {}
            for(let i = 0; i < bodyFields.length; i++)
                patchBody[bodyFields[i]] = req.body[bodyFields[i]];
            common.patchDocumentsAndSendResponse(req, res, model, queryFromString(queryString), patchBody, multiple);
        })
    }
}

module.exports = generic;