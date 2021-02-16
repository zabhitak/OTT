const User = require("../user/User")

myScreens =  async (req,res) => {
    var userId = req.user._id
    try {
        var user = await User.findById(userId)
        if(!user){
            console.log(error)
            req.flash("error","Not able to fetch data from database")
            res.redirect("/")
        }else{
            var { currentPlan } = user 
            var {screens} = currentPlan
            var currentDate = new Date()
            if( user.isVIP == false || currentDate < currentPlan.expiryDate ){
                user.isVIP = false
                user.currentPlan = {}
                var savedUser = await user.save()
                var updatedUser = await User.findOneAndUpdate(userId,savedUser)
                req.flash("error","Sorry , your plan has expired")
                res.redirect("/index")
            }else{
                res.render("myScreens",{ user , currentPlan, screens, title : "My Screens" })
            }
        }
       
    } catch (error) {
        console.log(error)
        req.flash("error","Not able to fetch data from database")
        res.redirect("/")
    }
   
} 
module.exports = myScreens