const User = require("../user/User")

purchasePlan =  async (req,res) => {
    var userId = req.user._id
    var { planNum } = req.params
    try {
        var user = await User.findById(userId)
        if(!user){
            console.log(error)
            req.flash("error","Not able to fetch data from database")
            res.redirect("/")
        }else{
            var planName = "",planPrice = "$",numScreens,
            purchaseDate = new Date(), 
            tempDate = new Date(),
            screens = []
            var expiryDate = new Date( tempDate.setMonth(tempDate.getMonth()+1)) 
            if( planNum == 1 ){
                planName = "Basic"
                planPrice += "19"
                numScreens = 1
            }else if(planNum == 2){
                planName = "Standard"
                planPrice += "35"
                numScreens = 2
            }else if(planNum == 3){
                planName = "Premium"
                planPrice += "59"
                numScreens = 4
            }

            // here payment gateway will be implemented
            

            // db work
            planPrice += "/Per month"
            user.isVIP = true
            var newPlan = { 
                planName,
                planPrice,
                numScreens,
                purchaseDate,
                expiryDate,
                screens 
            }
            user.currentPlan = newPlan
            var savedUser = await user.save()
            var updatedUser = await User.findOneAndUpdate(userId,savedUser)
            req.flash("success",planName + " successfully purchased")
            res.redirect('createScreens')
        }
       
    } catch (error) {
        console.log(error)
        req.flash("error","Not able to fetch data from database")
        res.redirect("/")
    }
   
} 
module.exports = purchasePlan