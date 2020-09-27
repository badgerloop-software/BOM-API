const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let vendorLoginSchema = new Schema({
    name:               {type: String, required: true},
    associatedEmail:    {type: String, required: true},
    username:           {type: String},
    password:           {type: String}
});

mongoose.model("VendorLogin", vendorLoginSchema);