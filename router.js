const express = require("express")
const logger = require('winston');

const generic = require("./controllers/generic")
const { preSaveEncrypt, preSendDecrypt } = require("./controllers/middleware");


let router = express.Router();


// Sponsor Routes
let accessibleSponsorFields = ["tier", "website", "company", "logo"];
let requiredSponsorFields = ["body.company"];
router.post(    '/sponsors/',       generic.post        ("Sponsor", accessibleSponsorFields, {}, requiredSponsorFields));
router.get(     '/sponsors/:id',    generic.idGet       ("Sponsor"));
router.get(     '/sponsors/',       generic.getAll      ("Sponsor"));
router.patch(   '/sponsors/:id',    generic.idPatch     ("Sponsor", accessibleSponsorFields));
router.delete(  '/sponsors/:id',    generic.idDelete    ("Sponsor"));

// // Budget Routes
let accessibleBudgetFields = ["name", "subTeams"];
let requiredBudgetFields = ["body.name"];
router.post(    '/budgets/',        generic.post        ("Budget", accessibleBudgetFields, {}, requiredBudgetFields));
router.get(     '/budget/',         generic.get         ("Budget", {sort: {dateEffective:  -1}}));
router.get(     '/budgets/:id',     generic.idGet       ("Budget"));
router.get(     '/budgets/',        generic.getAll      ("Budget"));
router.patch(   '/budgets/:id',     generic.idPatch     ("Budget", accessibleBudgetFields));
router.delete(  '/budgets/:id',     generic.idDelete    ("Budget"));

//
// // Vendor Routes
let accessibleVendorFields = ["name", "associatedEmail", "username", "password"];
let requiredVendorFields = ["body.name", "body.associatedEmail"];
let preSaveOptions = {preSave: preSaveEncrypt.bind(undefined, "password")}
let preSendOptions = {preSend: preSendDecrypt.bind(undefined, "password")}
router.post(    '/vendors/',        generic.post        ("VendorLogin", accessibleVendorFields, preSaveOptions, requiredVendorFields));
router.get(     '/vendors/:id',     generic.idGet       ("VendorLogin", preSendOptions));
router.get(     '/vendors/',        generic.getAll      ("VendorLogin", preSendOptions));
router.patch(   '/vendors/:id',     generic.idPatch     ("VendorLogin", accessibleVendorFields, preSaveOptions));
router.delete(  '/vendors/:id',     generic.idDelete    ("VendorLogin"));

module.exports = router;