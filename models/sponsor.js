const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sponsorSchema = new Schema({
    company:    {type: String, required: true},
    website:    {type: String, required: false},
    logo:       {type: String, required: false},
    tier:       {type: String, required: false}
});

mongoose.model("Sponsor", sponsorSchema);