const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sponsorSchema = new Schema({
    tier:       {type: String, required: false},
    website:    {type: String, required: false},
    company:    {type: String, required: false},
    logo:       {type: String, required: false},
});

mongoose.model("Sponsor", sponsorSchema);