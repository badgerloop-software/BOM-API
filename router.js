const express = require("express")
const logger = require('winston');

const generic = require("./controllers/generic")
const budgetController = require("./controllers/budgetController")

let router = express.Router();


// Sponsor Routes
let accessibleSponsorFields = ["tier", "website", "company", "logo"];
let requiredSponsorFields = ["body.company"];
router.post(    '/sponsors/',       generic.post        ("Sponsor", accessibleSponsorFields, requiredSponsorFields));
router.get(     '/sponsors/:id',    generic.idGet       ("Sponsor"));
router.get(     '/sponsors/',       generic.getAll      ("Sponsor"));
router.patch(   '/sponsors/:id',    generic.idPatch     ("Sponsor", accessibleSponsorFields));
router.delete(  '/sponsors/:id',    generic.idDelete    ("Sponsor"));

// Budget Routes
let accessibleBudgetFields = ["name", "subTeams"];
let requiredBudgetFields = ["body.name"];
router.post(    '/budgets/',       generic.post        ("Budget", accessibleBudgetFields, requiredBudgetFields));
router.get(     '/budget/',        budgetController.getLatest);
router.get(     '/budgets/:id',    generic.idGet       ("Budget"));
router.get(     '/budgets/',       generic.getAll      ("Budget"));
router.patch(   '/budgets/:id',    generic.idPatch     ("Budget", accessibleBudgetFields));
router.delete(  '/budgets/:id',    generic.idDelete    ("Budget"));

module.exports = router;