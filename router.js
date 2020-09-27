const express = require("express")
const logger = require('winston');

const sponsorController = require("./controllers/sponsorController");

let router = express.Router();


// Sponsor Routes
router.post('/sponsors/', sponsorController.postSponsor);
router.get('/sponsors/:id', sponsorController.getSponsorByID);
router.get('/sponsors/', sponsorController.getSponsors);
router.patch('/sponsors/:id', sponsorController.patchSponsor);
router.delete('/sponsors/:id', sponsorController.deleteSponsor);

module.exports = router;