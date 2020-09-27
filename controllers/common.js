const logger = require("winston");
const lodash_merge = require("lodash.merge");
const nestedProperty = require("nested-property");

let common = {};

common.status = {
    OK: 			200,
    DOES_NOT_EXIST: 404,
    SERVER_ERROR: 	200,
    CLIENT_ERROR: 	400
}

/**
 * Send a JSON response with a status code
 * @param {object} res Express response object
 * @param {object} req Express request object
 * @param {number} status HTTP status number
 * @param {object} content Content of JSON
 */
common.sendJSON = (req, res, status, content) => {
    res.status(status);
    res.json(content);
}

/**
 * Ensures all required values are defined, sends error otherwise
 * @param {object} res Express response object
 * @param {object} req Express request object
 * @param {array} params Required parameters
 * @param {function()} callback Callback called if all required values are present
 */
common.ensureParams = (req, res, params, callback) => {
    for(let i = 0; i < params.length; i++){
        if(typeof nestedProperty.get(req, params[i]) == 'undefined'){
            common.sendJSON(req, res, common.status.CLIENT_ERROR, {
                error: "Invalid request parameters."
            });
            logger.warn("Invalid request parameters received on '" + req.path + "'");
            return;
        }
    }

    callback();
}

/**
 * Creates a document in the database, sends errors if errors are thrown
 * @param {object} res Express response object
 * @param {object} req Express request object
 * @param {object} model Mongoose model
 * @param {object} document The document to be added
 * @param {function(document)} callback Called with the document created
 */
common.createDocument = (req, res, model, document, callback) => {
    model.create(document, (err, doc) => {
        if(err) {
            if(!common.detectValidatorErrors(req, res, err)) {
                common.sendJSON(req, res, common.status.SERVER_ERROR, {
                    error: "A server error has occurred. Ask the Software lead for assistance."
                });
                logger.error("Server error occurred when creating document on '" + req.path + "'");
            }
        } else {
            callback(doc)
        }
    })
}

/**
 * Creates and sends a document in the database, sends errors if errors are thrown
 * @param {object} res Express response object
 * @param {object} req Express request object
 * @param {object} model Mongoose model
 * @param {object} document The document to be added
 */
common.createAndSendDocument = (req, res, model, document) => {
    common.createDocument(req, res, model, document, (document) => {
        if(!document) {
            common.sendJSON(req, res, common.status.SERVER_ERROR, {
                error: "An api error has occurred and the document could not be created. Please ask the Software lead for assistance."
            })
            logger.error("Server error occurred when creating document on '" + req.path + "'. It was not created, but no error was thrown.");
            return;
        } else {
            common.sendJSON(req, res, common.status.OK, {
                document: document
            })
        }
    })
}

/**
 * Finds document(s) in the database, sends errors if errors are thrown
 * @param {object} res Express response object
 * @param {object} req Express request object
 * @param {object} model Mongoose model
 * @param {object} query The search query
 * @param {boolean} multiple Whether or not multiple items should be returned
 * @param {function(documents)} callback Called with the document(s) found (array if multiple)
 */
common.findDocuments = (req, res, model, query, multiple, callback) => {
    let findFunction = multiple ? "find" : "findOne";
    model[findFunction](query).exec((err, documents) => {
        if(err){
            common.sendJSON(req, res, common.status.DOES_NOT_EXIST, {
                error: "An API error has occurred. Please contact the Software Lead for assistance."
            })
            logger.error("Server error occurred when finding document" + (multiple ? "s" : "") + " with query " + JSON.stringify(query) + " on '" + req.path + "': " + err);
            return;
        }
        callback(documents);
    })
}

/**
 * Finds and sends document(s) in the database, sends errors if errors are thrown
 * @param {object} res Express response object
 * @param {object} req Express request object
 * @param {object} model Mongoose model
 * @param {object} query The search query
 * @param {object} query Whether there should be more than one document returned
 * @param {boolean} multiple Whether or not multiple items should be found and sent
 */
common.findAndSendDocuments = (req, res, model, query, multiple) => {
    common.findDocuments(req, res, model, query, multiple, (documents) => {
        if(multiple) {
            common.sendJSON(req, res, common.status.OK, {
                documents: documents
            })
        } else {
            if(!documents)
                common.sendJSON(req, res, common.status.DOES_NOT_EXIST, {
                    error: "The document you have requested does not exist."
                })
            else
                common.sendJSON(req, res, common.status.OK, {
                    document: documents
                })
        }
    })
}

/**
 * Deletes the document(s) matching the query parameter
 * @param {object} res Express response object
 * @param {object} req Express request object
 * @param {object} model Mongoose model
 * @param {object} query Query for the documents to be deleted
 * @param {boolean} multiple Whether or not multiple items should be deleted
 * @param {function(document)} callback Called with the number of items deleted
 */
common.deleteDocuments = (req, res, model, query, multiple, callback) => {
    common.findDocuments(req, res, model, query, multiple, (documents) => {
        if(multiple) {
            documents.forEach(document => {
                document.remove()
            });
            callback(documents.length);
        } else {
            if(documents) {
                documents.remove();
                callback(1);
            }else{
                callback(0);
            }
        }
    })
}

/**
 * Deletes the document(s) matching the query parameter and sends a response
 * @param {object} res Express response object
 * @param {object} req Express request object
 * @param {object} model Mongoose model
 * @param {object} query Query for the documents to be deleted
 * @param {boolean} multiple Whether or not multiple items should be deleted
 */
common.deleteDocumentsAndSendResponse = (req, res, model, query, multiple) => {
    common.deleteDocuments(req, res, model, query, multiple, (numDeleted) => {
        if(multiple) {
            common.sendJSON(req, res, common.status.OK, {deleted: numDeleted});
        } else {
            if(numDeleted === 0)
                common.sendJSON(req, res, common.status.DOES_NOT_EXIST, {
                    error: "Document requested for deletion does not exist."
                });
            else
                common.sendJSON(req, res, common.status.OK, {});
        }

    })
}

/**
 * Patches the document(s) matching the specified query parameter
 * @param {object} res Express response object
 * @param {object} req Express request object
 * @param {object} model Mongoose model
 * @param {object} query Query for the document(s) to be deleted
 * @param {object} patch The data to patch the document(s) found
 * @param {boolean} multiple Whether or not multiple items should be patched
 * @param {function(document)} callback Called with the updated document(s) (array if multiple)
 */
common.patchDocuments = (req, res, model, query, patch, multiple, callback) => {
    let updateDocument = (document) => {
        // Don't edit anything if an error has been sent
        if(res.headersSent)
            return;
        lodash_merge(document, patch);

        // Check for validation errors before saving
        if(!common.detectValidatorErrors(req, res, document.validateSync()))
            document.save();
    }

    common.findDocuments(req, res, model, query, multiple, (documents) => {
        if(multiple)
            documents.forEach(document => {
                updateDocument(document)
            });
        else
            if(documents)
                updateDocument(documents)

        // Send the document(s) back if successful, undefined if not
        // Only call the callback if the headers haven't already been sent
        if(!res.headersSent)
            callback(documents);
    })
}

/**
 * Patches the document(s) matching the specified query parameter and sends a response
 * @param {object} res Express response object
 * @param {object} req Express request object
 * @param {object} model Mongoose model
 * @param {object} query Query for the document(s) to be deleted
 * @param {object} patch The data to patch the document(s) found
 * @param {boolean} multiple Whether or not multiple items should be patched
 */
common.patchDocumentsAndSendResponse = (req, res, model, query, patch, multiple) => {
    common.patchDocuments(req, res, model, query, patch, multiple, (documents) => {
        if(multiple) {
            common.sendJSON(req, res, common.status.OK, { documents: documents });
        } else {
            if(documents) {
                common.sendJSON(req, res, common.status.OK, { document: documents })
            } else {
                common.sendJSON(req, res, common.status.DOES_NOT_EXIST, {
                    error: "Document requested for patch does not exist."
                });
            }
        }
    });
}

common.detectValidatorErrors = (req, res, err) => {
    if(!err || !err.errors)
        return false;

    let response = {
        message: "Your POST body does nos not meet the APIs standards. Please contact the software lead.",
        errors: []
    }

    for(const error in err.errors) {
        let e = err.errors[error];
        if (e.name === "ValidatorError")
            response.errors.push(e.message);
        if (e.reason && e.reason.code === "ERR_ASSERTION")
            response.errors.push("Path `" + e.path + "` expects a " + e.kind + " value.");
    }

    if(response.errors.length > 0) {
        common.sendJSON(req, res, common.status.CLIENT_ERROR, response);
        return true;
    }

    return false;
}

module.exports = common;