const mongoose = require("mongoose")

var passportLocalMongoose = require("passport-local-mongoose")
const UserSchema = mongoose.Schema({
    username : {
        type : String,
        default : ""
    },
    email : {
        type : String,
        default : ""
    },
    password : {
        type : String,
    },
    otp : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "OTP"
    },
    role : {
        type : String,
        default : "User"
    },
    requestedMovies : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "RequestedProduct",
        default : []
    }],
    movies : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        default : []
    }],
    isVIP : {
        type : Boolean,
        default : false
    },
    currentPlan : {
        planName : String,
        planPrice : String,
        numScreens : String,
        purchaseDate : Date,
        expiryDate : Date,
        screens : [{
            name : String,
            pin : String,
            inUse : Boolean,
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User", 
            }
        }],
        default : ""
    },
    screenSelected : {
        type : String,
        default : "-1"
    },
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    child : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            default : []
        },
    ],
})
 

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",UserSchema)