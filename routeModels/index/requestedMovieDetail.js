const RequestedProduct = require("../admin/product/RequestedProduct")

myProducts =  async (req,res) => {
    var { movieId } = req.params
    try {
        var movie = await RequestedProduct.findById(movieId)
        if(req.user.role == "User"){ 
            res.render("movieDetail",{ movie , title : movie.title, user : req.user,requested : true })
        }else{
            res.render("admin/movieDetail",{ movie , title : movie.title, user : req.user,requested : true })
        }
       
    } catch (error) {
        console.log(error)
        req.flash("error","Not able to fetch data from database")
        res.redirect("/")
    }
   
} 
module.exports = myProducts