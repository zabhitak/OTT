var Admin = require("../Admin")

indexRoute = (req,res) => {
    Admin.findById(req.user._id)
    .exec(function(err,admin) {
        if(err){
            console.log(err)
            req.flash("error","Unexpected Error Occured!!!")
            res.redirect("/admin")
        }else{
          if(admin){
            if(admin.role == 'User' ){
              res.redirect("/index")
            }else{
              res.render("admin/dashboard",{ user : admin, title : "Dashboard" })
         
            }
          }else{
            res.redirect("/index")
          }
        }
    })
}
module.exports = indexRoute