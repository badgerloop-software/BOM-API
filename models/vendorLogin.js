const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { validateEmail }  = require("./validators");

let vendorLoginSchema = new Schema({
    name:               {type: String, required: true},
    associatedEmail:    {type: String, required: true, validate: validateEmail},
    username:           {type: String},
    password:           {type: String}
});

mongoose.model("VendorLogin", vendorLoginSchema);