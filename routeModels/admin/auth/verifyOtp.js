var OTP = require("../../OTP/OTP")

const verifyOtp = async (req,res ) => {
    const { otpId } = req.params
    try{
        var otp = await OTP.findById(otpId)

        if(!otp){
            req.flash("error","Cannot verify your account right now !!!")
            res.redirect("/signup")
        }
        res.render("admin/otp",{ title : "Account Verification", otp })
        

    }catch(err){
        console.log(err)
        req.flash("error","Cannot verify your account right now !!!")
        res.redirect("/admin/signup")
    }
}

module.exports = verifyOtp