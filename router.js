const express = require("express")
const logger = require('winston');

const sponsorController = require("./controllers/sponsorController");
const generic = require("./controllers/generic")

let router = express.Router();

const matchingIDQuery = "{_id: req.params.id}";
const allQuery = "{}";

// Sponsor Routes
let accessibleSponsorFields = ["tier", "website", "company", "logo"];
router.post(    '/sponsors/',       generic.post        ("Sponsor", accessibleSponsorFields, ["body.company"]));
router.get(     '/sponsors/:id',    generic.idGet       ("Sponsor"));
router.get(     '/sponsors/',       generic.getAll      ("Sponsor"));
router.patch(   '/sponsors/:id',    generic.idPatch     ("Sponsor", accessibleSponsorFields));
router.delete(  '/sponsors/:id',    generic.idDelete    ("Sponsor"));

module.exports = router;