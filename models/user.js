const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name:                   {type: String, required: true},
    displayName:            {type: String, required: false},
    slackID:                {type: String, required: true},
    picture:                {type: String, required: false},
    isAdmin:                {type: Boolean, default: false},
    isFSC:                  {type: Boolean, default: false},
    isTeamLead:             {type: Boolean, default: false},
    additionalInformation: {
        team:               {type: String, required: false},
        major:              {type: String, required: false},
        year:               {type: String, required: false}
    }
});

mongoose.model("User", userSchema);