var Admin = require("../Admin")

addMovie = (req,res) => {
    if(req.user.role == 'User' ){
        res.redirect("/index")
    }else{
        Admin.findById(req.user._id)
        .exec(function(err,user) {
            if(err){
                console.log(err)
                req.flash("error","Unexpected Error Occured!!!")
                res.redirect("/admin")
            }else{
                res.render("admin/addMovie",{ title : "Add Movie", user })
                
            }
        })
    }
}
module.exports = addMovie