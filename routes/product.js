const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/product/"

const middleware = require("../middleware")

const movieDetail = require(`${commonPath}movieDetail`)

router.get("/movieDetail-:movieId",middleware.isLoggedIn, movieDetail)
module.exports = router