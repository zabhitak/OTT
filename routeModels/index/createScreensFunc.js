const User = require("../user/User")

createScreens =  async (req,res) => {
    var userId = req.user._id
    try {
        var user = await User.findById(userId)
        if(!user){
            console.log(error)
            req.flash("error","Not able to fetch data from database")
            res.redirect("/")
        }else{
            var { currentPlan } = user 
            var {numScreens} = currentPlan
            numScreens = parseInt(numScreens)
            var screens = []
            var num = Math.floor(10000 * Math.random())
            if(num < 1000){
                num *= 10;
            }
            screens.push({
                name : req.body.name1,
                pin : num
            })
            if(req.body.name2){
                num = Math.floor(10000 * Math.random())
                if(num < 1000){
                    num *= 10;
                }
                screens.push({
                    name : req.body.name2,
                    pin : num
                })
            }
            if(req.body.name3){
                num = Math.floor(10000 * Math.random())
                if(num < 1000){
                    num *= 10;
                }
                screens.push({
                    name : req.body.name3,
                    pin : num
                })
            }
            if(req.body.name4){
                num = Math.floor(10000 * Math.random())
                if(num < 1000){
                    num *= 10;
                }
                screens.push({
                    name : req.body.name4,
                    pin : num
                })
            }
            currentPlan.screens = screens
            user.currentPlan = currentPlan
            var savedUser = await user.save()
            var updatedUser = await User.findByIdAndUpdate(userId,savedUser)
            req.flash("success","Your screens has been generated")
            res.redirect("/myScreens")
        }
       
    } catch (error) {
        console.log(error)
        req.flash("error","Not able to fetch data from database")
        res.redirect("/")
    }
   
} 
module.exports = createScreens