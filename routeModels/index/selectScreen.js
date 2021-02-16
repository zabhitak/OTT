var User = require("../user/User")

indexRoute = async (req,res) => {
    User.findById(req.user._id)
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
                res.render("selectScreen",{ user, title : "Select Screen", screens : user.currentPlan.screens })
            }
          }else{
            res.redirect("/signin")
          }
        }
    })
}
module.exports = indexRoute