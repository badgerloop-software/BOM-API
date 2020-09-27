const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({
    dateRequested:          {type: Date, default: Date.now},
    submittedBy:            {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    item:                   {type: String, required: true},
    subteam:                {type: String, required: true},
    supplier:               {type: String, required: true},
    productNum:             {type: String, required: true},
    quantity:               {type: String, required: true},
    individualPrice:        {type: String, required: true},
    project:                {type: String, required: true},
    needDate:               {type: String, required: true},
    isDigikey:              {type: Boolean, default: false},
    countsTowardPodCost:    {type: Boolean, default: false},
    tax:                    {type: String, required: true},
    shipping:               {type: String, required: true},
    tax:                    {type: String, required: true},

    orderMessage:           {
        slackTimestamp:     {type: String, required: true},
        approvedStatusSent: {type: Boolean, default: false},
        orderedStatusSent:  {type: Boolean, default: false},
        reactions:          [{
            type:           {type: String, required: true},
            users:          [{type: mongoose.ObjectId, ref: "User"}]
        }]
    },
    
    isApproved:             {type: Boolean, default: false},
    approvedBy:             {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    trackingNum:            {type: String},
    isOrdered:              {type: Boolean, default: false},
    dateOrdered:            {type: Date},
    purchaser:              {type: String},
    comments: [{
        postedBy:           {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        postedAt:           {type: Date, required: true},
        contents:           {type: String, required: true}
    }],
    linkToPurchase:         {type: String},
    invoice:                {type: String},
    isReimbursement:        {type: Boolean, default: false}
});

mongoose.model("Order", orderSchema);