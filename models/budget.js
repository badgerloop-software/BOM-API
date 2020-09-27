const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let budgetSchema = new Schema({
    dateEffective:  {type: Date, default: Date.now},
    name:           {type: String, required: true},
    subTeams:       [{
        name:       {type: String, required: true},
        allocated:  {type: Number, required: true},
        spent:      {type: Number, required: true}
    }]
});

mongoose.model("Budget", budgetSchema);