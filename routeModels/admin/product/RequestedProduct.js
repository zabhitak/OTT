var mongoose = require("mongoose")

var productSchema = new mongoose.Schema({
    timeOfUploading : {
        type : Date,
        default : Date.now()
    },
    user : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
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
})

module.exports = mongoose.model("RequestedProduct",productSchema)