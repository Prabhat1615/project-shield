const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
{
    timestamp:{
        type:String
    },

    sourceIP:{
        type:String
    },

    destinationIP:{
        type:String
    },

    protocol:{
        type:String,
        uppercase:true,
        trim:true
    },

    duration:{
        type:Number,
        default:0
    },

    srcBytes:{
        type:Number,
        default:0
    },

    dstBytes:{
        type:Number,
        default:0
    },

    threatScore:{
        type:Number,
        default:0
    },

    prediction:{
        type:String,
        default:"safe"
    },

    aiPrediction:{
        type:String,
        default:"unknown"
    },

    anomalyScore:{
        type:Number,
        default:0
    },

    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Log", logSchema);
