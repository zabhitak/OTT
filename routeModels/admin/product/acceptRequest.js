const Admin = require('../Admin');
const Product = require("./Product")
const User = require("../../user/User")
const RequestedProduct = require("./RequestedProduct")
const {getVideoDurationInSeconds} = require('get-video-duration');
var formidable = require('formidable');
var fileSystem = require('fs');
const path = require('path');
var mv = require('mv');

acceptRequest = async (req, res) => {
    var {movieId} = req.params
  try {
    const userId = req.user._id;
    var user = await Admin.findById(userId);
    var requestedProduct = await RequestedProduct.findById(movieId)
    
    if (user.role == 'User') {
      res.redirect('/admin/index');
    } else {
        const {title, quality, description, category, releaseYear,language,movieDuration,images,video} = requestedProduct;
        
        const newProduct = await Product.create({ title, quality, description, 
          category, releaseYear,language,movieDuration,
          video,images, })

        var ownerUser = await User.findById(requestedProduct.user)
        ownerUser.movies.unshift(newProduct)
        var savedUser = await ownerUser.save()

        var deletedProduct = await RequestedProduct.findByIdAndDelete(movieId)

        req.flash("success","Movie " + title + " accepted uploaded successfully")
        res.redirect('/requestedMovies');
    }
  } catch (err) {
    console.log(err);
    req.flash('error', 'Cannot Accept Movie Request Right Now !!!');
    res.redirect('/admin/index');
  }
};

module.exports = acceptRequest;