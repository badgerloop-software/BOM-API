const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let logSchema = new Schema({
    date:  {type: Date, default: Date.now},
    user:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    action: { type: String, required: true},
    field: { type: String, required: true}
});

mongoose.model("Log", logSchema);