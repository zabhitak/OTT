var Admin = require("../Admin")
var Product = require("./Product")

editMovie = async (req,res) => {
    if(req.user.role == "User"){
        res.redirect("/index")
    }else{
        const { movieId } = req.params
        try {
            var user = await Admin.findById(req.user._id)
    
            var movie = await Product.findById(movieId)
    
            if(user.role == 'User' ){
                res.redirect("/index")
            }else{
                res.render("admin/editMovie",{ title : "Edit Product", user, movie })
            }
    
        } catch (err) {
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/admin")
        }
    }
}
module.exports = editMovie