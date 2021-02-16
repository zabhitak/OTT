var Admin = require("../Admin")
const RequestedProduct = require("./RequestedProduct")
const fileHelper = require('../../../util/file');

postDeleteProduct = async (req, res, next) => {
  try {
    const {movieId} = req.params;
    var admin = await Admin.findById(req.user._id)
    if(admin){
        var product = await RequestedProduct.findByIdAndDelete(movieId)
        console.log(product)
        product.images.forEach(element => {
          fileHelper.deleteFile(element);
        });
        fileHelper.deleteFile(product.video)
        console.log(product.video)
        req.flash("success","Movie Request deleted successfully")
        res.redirect('requestedMovies');
    }else{
      res.redirect('/index');
    }
  } catch (err) {
    console.log(err)
    req.flash("error","Movie not deleted")
    res.redirect('/admin/index')
  }

 
};

module.exports = postDeleteProduct