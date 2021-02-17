var passport = require("passport")

var User = require("../user/User")
var OTP = require("../OTP/OTP")

const verifyOtpFunc = async (req,res) => {
    var { enteredOtp } = req.body
    var { otpId } = req.params
    try{

        var otpObject = await OTP.findById(otpId)

        if(!otpObject){
            req.flash("error","Cannot verify your account right now !!!")
            res.redirect("/signup")
        }

        var diff = ( otpObject.timeOfSending - Date.now() ) / 1000;
        diff /= (60 * 60);
        diff < 0 ? diff = -diff : diff = diff;
        diff = Math.floor(diff);

        if(diff >= 1){
            var removed = await OTP.findByIdAndRemove(otpId)
            req.flash("error","Your OTP has been expired !!!")
            res.redirect("/signup")
        }else{
            if( otpObject.otp != enteredOtp ){
                req.flash("error","Entered OTP is wrong !!!")
                res.redirect(`/verifyOtp-${otpId}`)
            }else{
                var removed = await OTP.findByIdAndRemove(otpId)

                const { username , email , password, role } = otpObject
                
                var newUser = await User.register({ username , email , role, parent : null }, password ) 
             
                await newUser.save()
              
                passport.authenticate("user");
                req.flash("success","Please signin to continue !!!")
                res.redirect("/signin" )            
            }
        }
    }
    catch(err){
        console.log(err)
        req.flash("error","Cannot verify your account right now !!!")
        res.redirect("/signup")
    }
    
}

module.exports = verifyOtpFunc