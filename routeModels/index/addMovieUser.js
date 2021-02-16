var User = require("../user/User")

addMovieUser = (req,res) => {
    if(req.user.role !== 'User' ){
        res.redirect("/admin/index")
    }else{
        User.findById(req.user._id)
        .exec(function(err,user) {
            if(err){
                console.log(err)
                req.flash("error","Unexpected Error Occured!!!")
                res.redirect("/index")
            }else{
                res.render("addMovieUser",{ title : "Add Movie", user })
                
            }
        })
    }
}
module.exports = addMovieUser