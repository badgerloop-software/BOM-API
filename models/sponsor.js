const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { validateURL }  = require("./validators");

let sponsorSchema = new Schema({
    company:    {type: String, required: true},
    website:    {type: String, required: false, validate: validateURL},
    logo:       {type: String, required: false, validate: validateURL},
    tier:       {type: String, required: false}
});

mongoose.model("Sponsor", sponsorSchema);