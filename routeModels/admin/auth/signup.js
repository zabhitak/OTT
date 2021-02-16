var Admin = require("../Admin")
var OTP = require("../../OTP/OTP")

const nodemailer = require("nodemailer")

const user = process.env.EMAIL_ID 
const pass = process.env.PASSWORD

const auth = {
    user ,
    pass  
}

var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


const signup = async (req,res) => {
    
    var {username,email,password,confirmPassword } = req.body
    var role = "Restaurant"
    try {
        if(password !== confirmPassword ){
            req.flash("error","Passwords are not same")
            res.redirect("/admin/signup")
        }else if(password.length <= 5){
            req.flash("error","Password length must be atleast 6")
            res.redirect("/admin/signup")
        }else{
            var users = await Admin.findOne({ email })
            if(users){
                req.flash("error","Email already in use")
                res.redirect("/admin/signup")
            } 
            
            users = await Admin.findOne({ username })
            if(users){
                req.flash("error","Username already in use")
                res.redirect("/admin/signup")
            }

            const smtpTrans = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth 
            })
            var otp = ""
            for(var i = 0 ; i < 6; i++ ){
                var randomIndex = Math.floor(Math.random() * 62)
                otp += characters[randomIndex]
            }
    
            const mailOpts = {
                from: "OTT",
                to : email,
                subject: 'OTT | Verify Account',
                text: "Hi," + "\n\n" + 
                "To proceed further with your account verification at OTT(admin) , Please use the OTP given below.This OTP is only valid for 60 minutes."
                + "\n\n" + 
                "OTP : " + otp + " \n\n" + 
                "Regards,\n" +
                "Team ,OTT"
            }
    
            var response = await smtpTrans.sendMail(mailOpts)
            var otpCreated = await OTP.create({
                timeOfSending : Date.now(),
                otp ,
                username,
                email,
                password,
                role
            })
            req.flash("success",`Enter OTP sent to provided email`)
            res.redirect(`/admin/verifyOtp-${otpCreated.id}`)
           
        }  
    } catch(err){
        console.error(err)
        req.flash("error","Cannot Verify Your Account !!!")
        res.redirect("/admin/signup")
    }
    
}
module.exports = signup