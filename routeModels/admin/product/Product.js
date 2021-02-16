var mongoose = require("mongoose")

var productSchema = new mongoose.Schema({
    timeOfUploading : {
        type : Date,
        default : Date.now()
    },
    user : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin"
    },
    title : {
        type : String,
        default : "",
    },
    images : [{
        type : String,
        default : []
    }],
    description : {
        type : String,
        default : ""
    },
    category : {
        type : String,
        default : "Comedy"
    },
    quality : {
        type : String,
        default : "HD"
    },
    video : {
        type : String,
        default : ""
    },
    trailer : {
        type : String,
        default : ""
    },
    preview : {
        type : String,
        default : ""
    },
    releaseYear : {
        type : String,
        default : ""
    },
    language : {
        type : String,
        default : ""
    },
    movieDuration : {
        type : String,
        default : ""
    },
    forVIPOnly : {
        type : String,
        default : "VIP",
    }
})

module.exports = mongoose.model("Product",productSchema)