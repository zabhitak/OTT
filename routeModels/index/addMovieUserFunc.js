const User = require('../user/User');
const RequestedProduct = require("../admin/product/RequestedProduct")
const {getVideoDurationInSeconds} = require('get-video-duration');
var formidable = require('formidable');
var fileSystem = require('fs');
const path = require('path');
var mv = require('mv');

addProductFunc = async (req, res) => {
  try {
    const userId = req.user._id;
    var user = await User.findById(userId);
      var formData = new formidable({multiples: true});
      formData.maxFileSize = 1000 * 1024 * 1204;

      formData.parse(req,  async (error1, fields, files) => {
        const {title, quality, description, category, releaseYear,language,movieDuration} = fields;
        var images = [];
        var oldPath = files.video.path;
        var newPath = new Date().getTime() + '-' + files.video.name;
        var newPath = path.join('public/requested', 'videos', newPath);

        files.thumbnail.forEach((thumbnail) => {
          var oldPathThumbnail = thumbnail.path;
          var thumbnail = new Date().getTime() + '-' + thumbnail.name;
          var thumbnail = path.join('public/requested', 'thumbnails', thumbnail);
          images.push(thumbnail);

          mv(oldPathThumbnail, thumbnail, function (error2) {
            if(error2){
              console.log(error2);
              req.flash('error', 'Cannot Add Movie Request Right Now !!!');
              res.redirect('/index');
            }
          });
        
        });
        mv(oldPath, newPath, function (error2) {
          if(error2){
            console.log(error2);
            req.flash('error', 'Cannot Add Movie Request Right Now !!!');
            res.redirect('/index');
          }
          
        });
        fileSystem.rename(oldPath, newPath, function (error2) {
          var currentTime = new Date().getTime();

          getVideoDurationInSeconds(newPath).then((duration) => {
            var hours = Math.floor(duration / 60 / 60);
            var minutes = Math.floor(duration / 60) - hours * 60;
            var seconds = Math.floor(duration % 60);
          });
        });
        const newReqProduct = await RequestedProduct.create({ title, quality, description, 
          category, releaseYear,language,movieDuration,
          user,images,video : newPath })

        user.requestedMovies.unshift(newReqProduct)

        var savedUser = await user.save()

        var updatedUser =  await User.findByIdAndUpdate(userId, savedUser )

        req.flash("success","Request for " + title + " uploaded successfully !!!")
        res.redirect('/index');
      });
  } catch (err) {
    console.log(err);
    req.flash('error', 'Cannot Add Movie Request Right Now !!!');
    res.redirect('/index');
  }
};

module.exports = addProductFunc;