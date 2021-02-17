const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStratergy = require('passport-local');

const dotenv = require('dotenv');
dotenv.config();

const keys = require('./keys');
const MONGODB_URI = keys.MONGODB_URI;

const app = express();



var http = require("http").createServer(app);

const server = app.listen(3000 , () => {
  console.log(`Listening on port 3000`)
})


app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('database connected');
  })
  .catch((err) => {
    console.log(err);
  });

const User = require('./routeModels/user/User');
const Admin = require("./routeModels/admin/Admin")

app.use(
  require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: 'This is food shop',
  })
);

app.use(flash());
app.use(function (req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});


app.use(passport.initialize());
app.use(passport.session());

passport.use("user" ,new LocalStratergy(User.authenticate()))
passport.use("admin" ,new LocalStratergy(Admin.authenticate()))

passport.serializeUser(function(user, done) { 
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    if(user!=null)
        done(null,user);
}); 

var indexRoutes = require('./routes/index');
var authRoutes = require('./routes/auth');
var productRoutes = require("./routes/product")
var adminRoutesAuth = require("./routes/adminAuth")
var adminIndexRoutes = require("./routes/adminRoutes")
var adminProductRoutes = require("./routes/adminProductRoutes")

app.use(indexRoutes);
app.use(authRoutes);
app.use(productRoutes)
app.use("/admin",adminRoutesAuth)
app.use("/admin",adminIndexRoutes)
app.use(adminProductRoutes)
