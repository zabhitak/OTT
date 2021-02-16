const express = require("express")
const router = express.Router();

const commonPath = "../routeModels/admin/index/"

const indexRoute = require(`${commonPath}indexRoute`)

const middleware = require("../middleware")

router.get("/index",middleware.isLoggedIn,indexRoute)

module.exports = router