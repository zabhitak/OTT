const express = require("express")
const router = express.Router();

const passport = require("passport")
var User = require("../routeModels/user/User")
const commonPath = "../routeModels/index/"

const indexRoute = require(`${commonPath}indexRoute`)
const addMovieUser = require(`${commonPath}addMovieUser`)
const addMovieUserFunc = require(`${commonPath}addMovieUserFunc`)
const requestedMovieDetail = require(`${commonPath}requestedMovieDetail`)
const plans = require(`${commonPath}plans`)
const purchasePlan = require(`${commonPath}purchasePlan`)
const createScreens = require(`${commonPath}createScreens`)
const createScreensFunc = require(`${commonPath}createScreensFunc`)
const myScreens = require(`${commonPath}myScreens`)
const selectScreen = require(`${commonPath}selectScreen`)
const selectScreensFunc = require(`${commonPath}selectScreensFunc`)

const middleware = require("../middleware");

router.get('/', async (req,res) => {
    user = null
    if(req.user){
        user = await User.findById(req.user._id)
        if(!user){
            res.redirect("/admin/index")
        }else{
            res.redirect("/index")
        }
    }else{
        res.redirect("signin")
    }
} )

router.get("/index",middleware.isLoggedIn,indexRoute)
router.get("/addMovieUser",middleware.isLoggedIn,addMovieUser)
router.post("/addMovieUser",middleware.isLoggedIn,addMovieUserFunc)

router.get("/requestedMovieDetail-:movieId",middleware.isLoggedIn,requestedMovieDetail)

router.get("/plans",middleware.isLoggedIn,plans)
router.post("/purchasePlan-:planNum",middleware.isLoggedIn,purchasePlan)
router.get("/createScreens",middleware.isLoggedIn,createScreens)
router.post("/createScreens",middleware.isLoggedIn,createScreensFunc)
router.get("/myScreens",middleware.isLoggedIn,myScreens)
router.get("/selectScreen",middleware.isLoggedIn,selectScreen)

router.post("/signin-:screenNumber", passport.authenticate("user",{
    failureRedirect : "/selectScreen",
    failureFlash : "Sorry ... Wrong Pin !!!"
}),middleware.isLoggedIn, async(req,res) => {
    var userId = req.user._id
    var { screenNumber } = req.params
    var user = await User.findById(userId)
    var { parent } = user
    var parentUser = await User.findById(parent)
    var { currentPlan } = parentUser
    if(currentPlan.screens[screenNumber].pin != req.body.password ){
        req.logout()
        req.flash("error","Wrong Pin ... Login To Continue !!!")
        res.redirect("/signin")
    }else{
        if(currentPlan.screens[screenNumber].inUse){
            req.logout()
            req.flash("error","This Screen Already In Use")
            res.redirect("/signin")
        }else{
            currentPlan.screens[screenNumber].inUse = true
            parentUser.currentPlan = currentPlan
            var savedParent = await parentUser.save()
            var updatedUser = await User.findByIdAndUpdate(parent,savedParent)
            res.redirect("/index")
        }
    }   
})

router.post("/logoutScreen-:screenNumber",middleware.isLoggedIn, async (req,res) => {
    try {
        var { screenNumber } = req.params 
        var userId = req.user._id
        var user = await User.findById(userId)
        var {currentPlan} = user
        currentPlan.screens[screenNumber].inUse = false
        user.currentPlan = currentPlan
        var savedUser = await user.save()
        var updatedUser = await User.findByIdAndUpdate(userId,savedUser)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        req.flash("error","Not able to fetch your data right now")
        res.redirect("/selectScreen")
    }
})

module.exports = router