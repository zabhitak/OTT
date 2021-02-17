var User = require("../user/User")

manageuser = (req,res) => {
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
                res.render("manageuser",{ title : "Profile", user })
                
            }
        })
    }
}
module.exports = manageuser