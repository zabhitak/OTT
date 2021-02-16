const User = require("../user/User")
const Admin = require("../admin/Admin")
const Product = require("../admin/product/Product")

myProducts =  async (req,res) => {
    var { movieId } = req.params
    try {
        var movie = await Product.findById(movieId)
        if(req.user.role == "User"){ 
            res.render("movieDetail",{ movie , title : movie.title, user : req.user,requested : false })
        }else{
            res.render("admin/movieDetail",{ movie , title : movie.title, user : req.user,requested : false })
        }
       
    } catch (error) {
        console.log(error)
        req.flash("error","Not able to fetch data from database")
        res.redirect("/")
    }
   
} 
module.exports = myProducts