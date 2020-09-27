const common = require("./common");
const mongoose = require("mongoose");
const lodash_merge = require("lodash.merge");

let models = {};

let generic = {
    matchingIDOptions: {query: (req, res) => {_id: req.params.id}},
    allOptions: {multiple: true},
};

function loadModel(modelName) {
    if(!models[modelName])
        models[modelName] = mongoose.model(modelName);
    return models[modelName];
}

generic.get = (modelName, options, required = []) => {
    let model = loadModel(modelName);
    return (req, res) => {
        common.ensureParams(req, res, required, () => {
            common.findAndSendDocuments(req, res, model, options);
        })
    }
}

generic.idGet = (modelName, options = {}) => {
    lodash_merge(options, generic.matchingIDOptions)
    return generic.get(modelName, options, ["params.id"]);
}

generic.getAll = (modelName, options = {}) => {
    lodash_merge(options, generic.allOptions)
    return generic.get(modelName, options);
}

generic.delete = (modelName, options, required = []) => {
    let model = loadModel(modelName)
    return (req, res) => {
        common.ensureParams(req, res, required, () => {
            common.deleteDocumentsAndSendResponse(req, res, model, options);
        })
    }
}

generic.idDelete = (modelName, options = {}) => {
    lodash_merge(options, generic.matchingIDOptions)
    return generic.delete(modelName, options, ["params.id"]);
}

generic.deleteAll = (modelName, options = {}) => {
    lodash_merge(options, generic.allOptions)
    return generic.delete(modelName, options);
}

generic.post = (modelName, bodyFields, options = {}, required = bodyFields) => {
    let model = loadModel(modelName)
    return (req, res) => {
        common.ensureParams(req, res, required, () => {
            let documentBody = {}
            for(let i = 0; i < bodyFields.length; i++)
                documentBody[bodyFields[i]] = req.body[bodyFields[i]];
            common.createAndSendDocument(req, res, model, documentBody, options);
        })
    }
}

generic.patch = (modelName, bodyFields, options, required = []) => {
    let model = loadModel(modelName)
    return (req, res) => {
        common.ensureParams(req, res, required, () => {
            let patchBody = {}
            for(let i = 0; i < bodyFields.length; i++)
                patchBody[bodyFields[i]] = req.body[bodyFields[i]];
            common.patchDocumentsAndSendResponse(req, res, model, patchBody, options);
        })
    }
}

generic.idPatch = (modelName, bodyFields, options = {}) => {
    lodash_merge(options, generic.matchingIDOptions)
    return generic.patch(modelName, bodyFields, options, ["params.id"]);
}

generic.patchAll = (modelName, bodyFields, options = {}) => {
    lodash_merge(options, generic.allOptions)
    return generic.patch(modelName, bodyFields, options);
}

module.exports = generic;