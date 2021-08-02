const User = require("../user/User")

createScreens =  async (req,res) => {
    var userId = req.user._id
    try {
        var user = await User.findById(userId)
        var {username,email} = user
        if(!user){
            console.log(error)
            req.flash("error","Not able to fetch data from database")
            res.redirect("/")
        }else{
            var { currentPlan } = user 
            var {numScreens} = currentPlan
            numScreens = parseInt(numScreens)
            var screens = []
            var num = (Math.floor(10000 * Math.random()))
            
            if(num < 1000){
                num *= 10;
            }
            num += ""
            var {name1} = req.body
            var newUser = await User.register({ username : username+"0",email : email+"0" , parent : userId, currentPlan,isVIP : true ,screenSelected : 0, }, num ) 
         
            await newUser.save()
            user.child.push(newUser)
            screens.push({
                name : name1,
                pin : num,
                inUse : false,
                user : newUser
            })
            if(req.body.name2){
                num = (Math.floor(10000 * Math.random()))
                
                if(num < 1000){
                    num *= 10;
                }
                num += ""
                var {name2} = req.body
                var newUser2 = await User.register({ username : username+"1",email : email+"1" , parent : userId, currentPlan,isVIP : true ,screenSelected : 1 }, num ) 
                await newUser2.save()
                user.child.push(newUser2)
                screens.push({
                    name : name2,
                    pin : num,
                    inUse : false,
                    user : newUser2
                })
            }
            if(req.body.name3){
                num = (Math.floor(10000 * Math.random()))
                
                if(num < 1000){
                    num *= 10;
                }
                num += ""
                var {name3} = req.body
                var newUser3 = await User.register({ username : username+"2",email : email+"2" , parent : userId, currentPlan,isVIP : true ,screenSelected : 2 }, num ) 
                await newUser3.save()
                user.child.push(newUser3)
                screens.push({
                    name : name3,
                    pin : num,
                    inUse : false,
                    user : newUser3
                })
            }
            if(req.body.name4){
                num = (Math.floor(10000 * Math.random()))
                
                if(num < 1000){
                    num *= 10;
                 }
                num += ""
                 var {name4} = req.body
                var newUser4 = await User.register({ username : username+"3",email : email+"3" , parent : userId, currentPlan,isVIP : true ,screenSelected : 3 }, num ) 
                await newUser4.save()
                user.child.push(newUser4)
                screens.push({
                    name : name4,
                    pin : num,
                    inUse : false,
                    user : newUser4
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