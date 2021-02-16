const User = require("../user/User")
const Admin = require("../admin/Admin")
const Product = require("../admin/product/Product")

myProducts =  async (req,res) => {
    var { movieId } = req.params
    var userId = req.user._id
    try {
        var movie = await Product.findById(movieId)
        var user = await User.findById(userId)
        if(req.user.role == "User"){ 
            var currentDate = new Date()
            if(user.isVIP == true && currentDate <= user.currentPlan.expiryDate ){
                res.render("movieDetail",{ movie , title : movie.title, user : req.user,requested : false })
            }else{
                user.isVIP = false
                user.currentPlan = {}
                var savedUser = await user.save()
                var updatedUser = await User.findByIdAndUpdate(userId,savedUser)
                res.redirect("/plans")
            }
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