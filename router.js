const express = require("express")
const logger = require('winston');

const sponsorController = require("./controllers/sponsorController");
const generic = require("./controllers/generic")

let router = express.Router();

const matchingIDQuery = "{_id: req.params.id}";
const emptyQuery = "{}";

// Sponsor Routes
let accessibleSponsorBodyFields = ["tier", "website", "company", "logo"];
router.post(    '/sponsors/',       generic.post    ("Sponsor", accessibleSponsorBodyFields, ["body.company"]));
router.get(     '/sponsors/:id',    generic.get     ("Sponsor", matchingIDQuery, ["params.id"], false));
router.get(     '/sponsors/',       generic.get     ("Sponsor", emptyQuery));
router.patch(   '/sponsors/:id',    generic.patch   ("Sponsor", accessibleSponsorBodyFields, matchingIDQuery, ["params.id"], false));
router.delete(  '/sponsors/:id',    generic.delete  ("Sponsor", matchingIDQuery, ["params.id"], false));

module.exports = router;