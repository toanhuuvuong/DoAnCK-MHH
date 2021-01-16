module.exports = 
{
  ensureAuthenticated: function(req, res, next) 
  {
    if (req.isAuthenticated() && process.env.LOGIN_TYPE != 'admin') 
    {
      process.env.DID_LOGIN = 'TRUE';

      return next();
    }
    
    req.flash('error_msg', 'Please log in to view that resource :(');

    res.redirect('login.html');
  },
  forwardAuthenticated: function(req, res, next) 
  {
    if (!req.isAuthenticated()) 
    {
      return next();
    }

    process.env.DID_LOGIN = 'TRUE';

    res.redirect('home.html');    
  },
  ensureAuthenticatedAdmin: function(req, res, next) 
  {
    if (req.isAuthenticated() && process.env.LOGIN_TYPE != 'customer') 
    {
      process.env.DID_LOGIN_ADMIN = 'TRUE';

      return next();
    }

    req.flash('error_msg', 'Please log in to view that resource :(');

    res.redirect('login.html');
  },
  forwardAuthenticatedAdmin: function(req, res, next) 
  {
    if (!req.isAuthenticated()) 
    {
      return next();
    }
    
    process.env.DID_LOGIN_ADMIN = 'TRUE';

    res.redirect('admin-home.html');   
  },
  checkLoginStatus: function(req, res, next) 
  {
    if (req.isAuthenticated() && process.env.LOGIN_TYPE != 'admin') 
    {
      process.env.DID_LOGIN = 'TRUE';
    }
    else
    {
      process.env.DID_LOGIN = 'FALSE';
    }

    return next(); 
  }
};
