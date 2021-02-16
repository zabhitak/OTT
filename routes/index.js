const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/index/"

const indexRoute = require(`${commonPath}indexRoute`)
const addMovieUser = require(`${commonPath}addMovieUser`)
const addMovieUserFunc = require(`${commonPath}addMovieUserFunc`)
const requestedMovieDetail = require(`${commonPath}requestedMovieDetail`)
const plans = require(`${commonPath}plans`)
const purchasePlan = require(`${commonPath}purchasePlan`)

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

router.get("/addMovieUser",middleware.isLoggedIn,addMovieUser)
router.post("/addMovieUser",middleware.isLoggedIn,addMovieUserFunc)

router.get("/requestedMovieDetail-:movieId",middleware.isLoggedIn,requestedMovieDetail)

router.get("/plans",middleware.isLoggedIn,plans)
router.post("/purchasePlan-:planNum",middleware.isLoggedIn,purchasePlan)

module.exports = router