const express = require("express")
const passport = require("passport")
const router = express.Router();

const middleware = require("../middleware")

const commonPath = "../routeModels/admin/auth/"
const Admin = require("../routeModels/admin/Admin")

const signup = require(`${commonPath}signup`)
const verifyOtp = require(`${commonPath}verifyOtp`)
const verifyOtpFunc = require(`../routeModels/admin/auth/verifyOtpFunc`) 

router.get("/",(req,res ) => {
    if(req.user){
        res.redirect("/admin/index")
    }
    res.render('admin/login',{ title : "Login", user : null } )
} )

router.post("/signin",passport.authenticate("admin",{
    failureRedirect : "/admin/wrongCredentials"
}),middleware.isLoggedIn, (req,res) => {
    res.redirect("/admin/index")
})


router.get("/signup",(req,res ) => {
    if(req.user){
        res.redirect("/admin/index")
    }
    res.render('admin/signup',{ title : "Register", user : null })
} )

router.post("/signup", signup )


router.get("/verifyOtp-:otpId",verifyOtp)
router.post("/verifyOtp-:otpId",verifyOtpFunc)


router.get("/wrongCredentials", (req,res) => {
    req.flash("error","Username or password is wrong")
    res.redirect("/admin")
})

router.get("/sessionExpired",(req,res) => {
    if(req.user){
        res.redirect("/index")
    }
    req.flash("error","Sign in to continue!!!")
    res.redirect("/admin")
})

router.get("/logout", (req,res) => { 
    var redirectTo = '/admin'
    if(req.user){
        req.logout();
        req.flash("success","Successfully logged you out")
        res.redirect(`${redirectTo}`)
    }else{
        // req.flash("error","NO USER IS LOGGED IN")
        res.redirect('/')
    }    
})



module.exports = router