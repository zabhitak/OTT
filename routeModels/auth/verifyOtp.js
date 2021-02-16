var OTP = require("../OTP/OTP")

const verifyOtp = async (req,res ) => {
    const { otpId } = req.params
    try{
        var otp = await OTP.findById(otpId)

        if(!otp){
            req.flash("error","Cannot verify your account right now !!!")
            res.redirect("/signup")
        }
        if(otp.role == "Restaurant"){
            res.redirect(`/admin/verifyOtp-${otp.id}`)
        }
        res.render("otp",{ title : "Account Verification", otp })
        

    }catch(err){
        console.log(err)
        req.flash("error","Cannot verify your account right now !!!")
        res.redirect("/signup")
    }
}

module.exports = verifyOtp