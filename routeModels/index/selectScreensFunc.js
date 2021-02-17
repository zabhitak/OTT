const User = require("../user/User")

const passport = require("passport")

selectScreenFunc =  async (req,res) => {
    var userId = req.user._id
    var { screenNumber } = req.params
    try {
        var user = await User.findById(userId)
        if(!user){
            console.log(error)
            req.flash("error","Not able to fetch data from database")
            res.redirect("/")
        }else{
            var { currentPlan } = user 
            var { screens } = currentPlan
            if( screens[screenNumber].pin == req.body.password ){
                user.screenSelected = (screenNumber)
                currentPlan.screens[screenNumber].inUse = true
                user.currentPlan = currentPlan
                var savedUser = await user.save()
                var updatedUser = await User.findByIdAndUpdate(userId,savedUser)
                passport.authenticate("user",{
                    failureRedirect : "/wrongCredentials"
                })
                
                res.redirect("/index")
            }else{
                req.flash("error","Incorrect pin for screen " + screens[screenNumber].name)
                res.redirect("selectScreen")
            }
        }
       
    } catch (error) {
        console.log(error)
        req.flash("error","Not able to fetch data from database")
        res.redirect("/")
    }
   
} 
module.exports = selectScreenFunc