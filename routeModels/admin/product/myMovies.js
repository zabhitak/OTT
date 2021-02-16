var Admin = require("../Admin")

myMovies =  async (req,res) => {
    if(req.user.role == "User"){
        res.redirect("/index")
    }else{
        try {
            var user = await  Admin.findById(req.user._id).populate("products")
            if(user.role == 'User'){
                res.redirect("/index")
            }
            var { products } = user
            
            res.render("admin/movies",{ title : "My Products", user, products , myMovies : true })
        } catch (error) {
            req.flash("error","Not able to fetch data from database")
            res.redirect("/admin")
        }
    }
   
} 
module.exports = myMovies