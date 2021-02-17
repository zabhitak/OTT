const express = require("express")
const passport = require("passport")
const router = express.Router();
var User = require("../routeModels/user/User")

const commonPath = "../routeModels/auth/"

const signup = require(`${commonPath}signup`)
const verifyOtp = require(`${commonPath}verifyOtp`)
const verifyOtpFunc = require(`${commonPath}verifyOtpFunc`) 

const middleware = require("../middleware")


const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '210498558473-m9adhkqreen1mgubu1ojgk2ohqlt5buk.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '8uQTRx0bVpcJGoIKU06dtP3o';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      const email = userProfile['emails'][0]['value']
      const fullName = userProfile['displayName']
      const password = 'zabhitak'
      var users = await User.findOne({ email })
            if(users){
                    //we already have a record with the given profile id
                    return done(null, users);
            }else{
                var n =email.indexOf('@');
                var username = email.substring(0, n);
                var newUser = await User.register({ username , email,fullName},password) 
                await newUser.save()
            }
      return done(null, newUser);
  }
));

router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google'),(req, res) => {
        res.redirect("/index")
  });

router.get("/signin",(req,res ) => {
    if(req.user){
        res.redirect("/index")
    }else{
        res.render('signin',{ title : "Login Now" } )
    }
} )

router.post("/signin",passport.authenticate("user",{
    failureRedirect : "/wrongCredentials"
}),middleware.isLoggedIn, (req,res) => {
    if(req.user.parent != null){
        req.logout()
        res.redirect("/wrongCredentials")
    }else{
        res.redirect("/index")
    }
})


router.get("/signup",(req,res ) => {
    if(req.user){
        res.redirect("/index")
    }else{
        res.render('signup',{ title : "Register Now" })
    }
} )

router.post("/signup", signup )


router.get("/verifyOtp-:otpId",verifyOtp)
router.post("/verifyOtp-:otpId",verifyOtpFunc)


router.get("/wrongCredentials", (req,res) => {
    req.flash("error","USERNAME OR PASSWORD IS WRONG")
    res.redirect("/signin")
})

router.get("/sessionExpired",(req,res) => {
    if(req.user){
        res.redirect("/index")
    }
    req.flash("error","Sign in to continue!!!")
    res.redirect("/signin")
})

router.get("/logout",async (req,res) => { 
    var redirectTo = '/'
    if(req.user){
        var userId = req.user._id
        var user = await User.findById(userId)
        if(user){
            if(user.parent != null){
                var {parent} = user
                var parentUser = await User.findById(parent)
                var { screenSelected } = user
                var {currentPlan} = parentUser
                currentPlan.screens[screenSelected].inUse = false
                parentUser.currentPlan = currentPlan
                var savedParent = await parentUser.save()
                var updatedUser = await User.findByIdAndUpdate(parent,savedParent)
            }
        }
        req.logout();
        req.flash("success","SUCCESSFULLY LOGGED YOU OUT")
        res.redirect(`${redirectTo}`)
    }else{
        req.flash("error","NO USER IS LOGGED IN")
        res.redirect('/')
    }    
})


module.exports = router