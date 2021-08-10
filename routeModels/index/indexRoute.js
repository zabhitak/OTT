var User = require("../user/User")
var Product = require("../admin/product/Product")


indexRoute = async (req,res) => {
  var allMovies = await Product.find({})
    User.findById(req.user._id)
    .populate("requestedMovies")
    .populate("movies")
    .exec( async (err,user) => {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/signin")
        }else{
          if(user){
            if(user.role != "User"){
              res.redirect("/admin/index")
            }else{
              var currentDate = new Date()
              if(user.isVIP == true && currentDate <= user.currentPlan.expiryDate && !user.parent ){
                res.redirect("selectScreen")
              }else{
                var { movies,requestedMovies } = user
                var comedyMovies = allMovies.filter( eachMovie => {
                  return eachMovie.category == "Comedy"
                } )
                var crimeMovies = allMovies.filter( eachMovie => {
                  return eachMovie.category == "Crime"
                } )
                var dramaMovies = allMovies.filter( eachMovie => {
                  return eachMovie.category == "Drama"
                } )
                var horrorMovies = allMovies.filter( eachMovie => {
                  return eachMovie.category == "Horror"
                } )
                var romanceMovies = allMovies.filter( eachMovie => {
                  return eachMovie.category == "Romance"
                } )
                res.render("index",{ user : user, title : "My Profile",allMovies,requestedMovies,movies,
                    comedyMovies, crimeMovies,dramaMovies, horrorMovies,romanceMovies
                })
              }
            }
          }else{
            res.redirect("/signin")
          }
        }
    })
}
module.exports = indexRoute