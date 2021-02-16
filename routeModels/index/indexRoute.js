var User = require("../user/User")
var Product = require("../admin/product/Product")
indexRoute = async (req,res) => {
  var allMovies = await Product.find({})
    User.findById(req.user._id)
    .populate("requestedMovies")
    .populate("movies")
    .exec(function(err,user) {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/signin")
        }else{
          if(user){
            if(user.role != "User"){
              res.redirect("/admin/index")
            }else{
              var { movies,requestedMovies } = user
              res.render("index",{ user : user, title : "My Profile",allMovies,requestedMovies,movies })
            }
          }else{
            res.redirect("index")
          }
        }
    })
}
module.exports = indexRoute