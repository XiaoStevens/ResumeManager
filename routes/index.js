const homeRoutes = require("./home");
const userRoutes = require('./login');
const registerRoutes = require('./register');
const recRoutes = require('./rec');

const constructorMethod = app => {
    app.use("/", userRoutes);
    app.use("/", registerRoutes);
   

    app.get('/logout', function(req, res, next) {
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if(err) {
                    return next(err);
                } else {
                    res.clearCookie("AuthCookie");
                    return res.redirect('/');
                }
            });
        }
    });

    app.use("/home", (req, res, next) => {
        if(!req.cookies.AuthCookie || !req.session.user){
            res.clearCookie("AuthCookie");
            res.redirect('/login');
        } else{
            next();
        }
        return;
    });
    
     app.use("/rec", (req, res, next) => {
        if(!req.cookies.AuthCookie || !req.session.user){
            res.clearCookie("AuthCookie");
            res.redirect('/login');
        } else{
            next();
        }
        return;
    });

    app.use(function (req, res, next) {
        res.locals.session = req.session;
        next();
    });

    app.use("/", homeRoutes);
    app.use("/",recRoutes);

    app.use("*", (req, res) => {
      if (req.cookies.AuthCookie || req.session.user) {
          res.redirect('/home');
      }
      else {
          res.render('main/login');
      }
  });
};


module.exports = constructorMethod;
