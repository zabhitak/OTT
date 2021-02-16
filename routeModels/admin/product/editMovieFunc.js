const Admin = require('../Admin');
const Product = require("./Product")
const {getVideoDurationInSeconds} = require('get-video-duration');
var formidable = require('formidable');
var fileSystem = require('fs');
const path = require('path');
var mv = require('mv');

editProductFunc = async (req, res) => {
  try {
    const userId = req.user._id;
    const {movieId} = req.params
    var user = await Admin.findById(userId);
    if (user.role == 'User') {
      res.redirect('/admin/index');
    } else {
        var movie = await Product.findById(movieId) 
        var formData = new formidable({multiples: true});
        formData.maxFileSize = 1000 * 1024 * 1204;

        formData.parse(req,  async (error1, fields, files) => {
            const {title, quality, description, category, releaseYear,language,movieDuration,forVIPOnly} = fields;
            var images = [];
            console.log(files.thumbnail.size + " : " + files.thumbnail.length)
            if(files.thumbnail.length){
                files.thumbnail.forEach((thumbnail) => {
                    var oldPathThumbnail = thumbnail.path;
                    var thumbnail = new Date().getTime() + '-' + thumbnail.name;
                    var thumbnail = path.join('public', 'thumbnails', thumbnail);
                    images.push(thumbnail);
        
                    mv(oldPathThumbnail, thumbnail, function (error2) {
                    if(error2){
                        console.log(error2);
                        req.flash('error', 'Cannot Add Movie Right Now !!!');
                        res.redirect('/admin/index');
                    }
                    });
                
                });   
                
            }else{
                images = movie.images
            }
            var updatedProduct = { title, quality, description, 
                category, releaseYear,language,movieDuration,
                forVIPOnly,user,images }
            const newProduct = await Product.findByIdAndUpdate(movieId,updatedProduct) 
            req.flash("success","Movie " + title + " updated successfully")
            res.redirect('/admin/index');
      });
    }
  } catch (err) {
    console.log(err);
    req.flash('error', 'Cannot Add Movie Right Now !!!');
    res.redirect('/admin/index');
  }
};

module.exports = editProductFunc;