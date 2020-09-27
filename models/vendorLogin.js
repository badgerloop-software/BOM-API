const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { preSaveEncrypt, preFindDecrypt } = require("./middleware");
const { validateEmail }  = require("./validators");

let vendorLoginSchema = new Schema({
    name:               {type: String, required: true},
    associatedEmail:    {type: String, required: true, validate: validateEmail},
    username:           {type: String},
    password:           {type: String}
});

vendorLoginSchema.pre("save", function preSave(next) {
    preSaveEncrypt(this, "password", next);
})

vendorLoginSchema.pre("find", function preFind(next) {
    preFindDecrypt(this, "password", next);
})

mongoose.model("VendorLogin", vendorLoginSchema);