var Admin = require("../Admin")
var RequestedProduct = require("../product/RequestedProduct")
myMovies =  async (req,res) => {
    if(req.user.role == "User"){
        res.redirect("/index")
    }else{
        try {
            var user = await  Admin.findById(req.user._id).populate("products")
            if(user.role == 'User'){
                res.redirect("/index")
            }
            var requestedMovies = await RequestedProduct.find({})
            
            res.render("admin/requestedMovies",{ title : "My Products", user, requestedMovies })
        } catch (error) {
            req.flash("error","Not able to fetch data from database")
            res.redirect("/admin")
        }
    }
   
} 
module.exports = myMovies