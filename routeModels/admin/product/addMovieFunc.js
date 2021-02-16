const Admin = require('../Admin');
const Product = require('./Product');
const {getVideoDurationInSeconds} = require('get-video-duration');
var formidable = require('formidable');
var fileSystem = require('fs');
const path = require('path');
var mv = require('mv');

addProductFunc = async (req, res) => {
  try {
    const userId = req.user._id;
    var user = await Admin.findById(userId);
    if (user.role == 'User') {
      res.redirect('/admin/index');
    } else {
      var formData = new formidable({multiples: true});
      formData.maxFileSize = 1000 * 1024 * 1204;

      formData.parse(req, async (error1, fields, files) => {
        const {
          title,
          quality,
          description,
          category,
          releaseYear,
          language,
          movieDuration,
          forVIPOnly,
        } = fields;
        var images = [];
        var oldPath = files.video.path;
        var newPath = new Date().getTime() + '-' + files.video.name;
        var newPath = path.join('public', 'videos', newPath);

        var oldPath2 = files.trailer.path;
        var newPath2 = new Date().getTime() + '-' + files.video.name;
        var newPath2 = path.join('public', 'trailers', newPath2);

        var oldPath3 = files.preview.path;
        var newPath3 = new Date().getTime() + '-' + files.video.name;
        var newPath3 = path.join('public', 'previews', newPath3);

        files.thumbnail.forEach((thumbnail) => {
          var oldPathThumbnail = thumbnail.path;
          var thumbnail = new Date().getTime() + '-' + thumbnail.name;
          var thumbnail = path.join('public', 'thumbnails', thumbnail);
          images.push(thumbnail);

          mv(oldPathThumbnail, thumbnail, function (error2) {
            if (error2) {
              console.log(error2);
              req.flash('error', 'Cannot Add Movie Right Now !!!');
              res.redirect('/admin/index');
            }
          });
        });
        mv(oldPath, newPath, function (error2) {
          if (error2) {
            console.log(error2);
            req.flash('error', 'Cannot Add Movie Right Now !!!');
            res.redirect('/admin/index');
          }
        });

        mv(oldPath2, newPath2, function (error2) {
          if (error2) {
            console.log(error2);
            req.flash('error', 'Cannot Add Movie Request Right Now !!!');
            res.redirect('/index');
          }
        });

        mv(oldPath3, newPath3, function (error2) {
          if (error2) {
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
        const newProduct = await Product.create({
          title,
          quality,
          description,
          category,
          releaseYear,
          language,
          movieDuration,
          forVIPOnly,
          user,
          images,
          video: newPath,
          trailer: newPath2,
          preview: newPath3,
        });

        user.products.unshift(newProduct);

        var savedUser = await user.save();

        var updatedUser = await Admin.findByIdAndUpdate(userId, savedUser);
        req.flash('success', 'Movie ' + title + ' uploaded successfully');
        res.redirect('/admin/index');
      });
    }
  } catch (err) {
    console.log(err);
    req.flash('error', 'Cannot Add Movie Right Now !!!');
    res.redirect('/admin/index');
  }
};

module.exports = addProductFunc;