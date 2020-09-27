const mongoose = require('mongoose');
const logger = require('winston');
const common = require("./common.js");

const Sponsor = mongoose.model("Sponsor");

let sponsorController = {};

sponsorController.postSponsor = (req, res) => {
    common.ensureParams(req, res, [req.body.company], () => {
        common.createAndSendDocument(req, res, Sponsor, {
            tier: req.body.tier,
            website: req.body.website,
            company: req.body.company,
            logo: req.body.logo
        });
    })
}

sponsorController.getSponsors = (req, res) => {
    common.findAndSendDocuments(req, res, Sponsor, {}, true);
}

sponsorController.getSponsorByID = (req, res) => {
    common.ensureParams(req, res, [req.params.id], () => {
        common.findAndSendDocuments(req, res, Sponsor, {_id: req.params.id}, false);
    });
}

sponsorController.patchSponsor = (req, res) => {
    common.ensureParams(req, res, [req.params.id], () => {
        common.patchDocumentsAndSendResponse(req, res, Sponsor, {_id: req.params.id}, {
            company: req.body.company,
            website: req.body.website,
            logo: req.body.logo,
            tier: req.body.tier
        }, false);
    });
}

sponsorController.deleteSponsor = (req, res) => {
    common.ensureParams(req, res, [req.params.id], () => {
        common.deleteDocumentsAndSendResponse(req, res, Sponsor, {_id: req.params.id}, false);
    })
}

module.exports = sponsorController;