const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/admin/product/"

const middleware = require("../middleware")

const addMovie = require(`${commonPath}addMovie`)
const addMovieFunc = require(`${commonPath}addMovieFunc`)
const requestedMovies = require(`${commonPath}requestedMovies`)
const acceptRequest = require(`${commonPath}acceptRequest`)
const deleteRequest = require(`${commonPath}deleteRequest`)
const myMovies = require(`${commonPath}myMovies`)
const postDeleteProduct = require(`${commonPath}deleteProduct`)
const editMovie = require(`${commonPath}editMovie`)
const editMovieFunc = require(`${commonPath}editMovieFunc`)


router.get("/addMovie",middleware.isLoggedIn,addMovie)
router.post("/addMovie",middleware.isLoggedIn,addMovieFunc)

router.get("/requestedMovies",middleware.isLoggedIn,requestedMovies)

router.get("/acceptRequest-:movieId",middleware.isLoggedIn,acceptRequest)
router.get("/deleteRequest-:movieId",middleware.isLoggedIn,deleteRequest)

router.get('/editMovie-:movieId',middleware.isLoggedIn,editMovie)
router.post('/editMovie-:movieId',middleware.isLoggedIn,editMovieFunc)


router.get("/myMovies",middleware.isLoggedIn,myMovies)

router.get('/delete-:movieId', middleware.isLoggedIn, postDeleteProduct);

module.exports = router