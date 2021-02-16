var Admin = require("../Admin")
const Product = require("./Product")
const fileHelper = require('../../../util/file');

postDeleteProduct = async (req, res, next) => {
  try {
    const {movieId} = req.params;
    var admin =await Admin.findById(req.user._id)
    
    if(admin){
        var product = await Product.findByIdAndDelete(movieId)
        product.images.forEach(element => {
          fileHelper.deleteFile(element);
        });
        fileHelper.deleteFile(product.video)
        req.flash("success","Movie deleted successfully")
        res.redirect('/admin/index');
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