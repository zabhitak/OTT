const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/index/"

const indexRoute = require(`${commonPath}indexRoute`)
const addMovieUser = require(`${commonPath}addMovieUser`)
const addMovieUserFunc = require(`${commonPath}addMovieUserFunc`)
const requestedMovieDetail = require(`${commonPath}requestedMovieDetail`)
const plans = require(`${commonPath}plans`)
const manageuser = require(`${commonPath}manageuser`)
const purchasePlan = require(`${commonPath}purchasePlan`)
const createScreens = require(`${commonPath}createScreens`)
const createScreensFunc = require(`${commonPath}createScreensFunc`)
const myScreens = require(`${commonPath}myScreens`)
const selectScreen = require(`${commonPath}selectScreen`)
const selectScreensFunc = require(`${commonPath}selectScreensFunc`)

const middleware = require("../middleware");

const User = require("../routeModels/user/User")

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
router.get("/manageuser",middleware.isLoggedIn,manageuser)
router.get("/addMovieUser",middleware.isLoggedIn,addMovieUser)
router.post("/addMovieUser",middleware.isLoggedIn,addMovieUserFunc)

router.get("/requestedMovieDetail-:movieId",middleware.isLoggedIn,requestedMovieDetail)

router.get("/plans",middleware.isLoggedIn,plans)
router.post("/purchasePlan-:planNum",middleware.isLoggedIn,purchasePlan)
router.get("/createScreens",middleware.isLoggedIn,createScreens)
router.post("/createScreens",middleware.isLoggedIn,createScreensFunc)
router.get("/myScreens",middleware.isLoggedIn,myScreens)
router.get("/selectScreen",middleware.isLoggedIn,selectScreen)
router.post("/selectScreens-:screenNumber",middleware.isLoggedIn,selectScreensFunc)


module.exports = router