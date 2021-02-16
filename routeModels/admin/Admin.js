const mongoose = require("mongoose")

var passportLocalMongoose = require("passport-local-mongoose")

const AdminSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
    },
    otp : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "OTP"
    },
    avatar : {
        type : String,
        default : null
    },
    fullName : {
        type : String,
        default : ""
    },
    address : {
        type : String,
        default : ""
    },
    description : {
        type : String,
        default : ""
    },
    phoneNumber : {
        type : String,
        default : ""
    },
    website : {
        type : String,
        default : ""
    },
    products : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        default : []
    }],
})
 

AdminSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Admin",AdminSchema)