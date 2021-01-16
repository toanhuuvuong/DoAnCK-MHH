var userDAO = require('../dao/user');
var bcrypt = require('bcryptjs');

var LocalStrategy = require('passport-local').Strategy;
var ObjectId = require("mongodb").ObjectId;

module.exports = function(passport)
{
  passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done)
  {
    userDAO.find({ email: email }, function(users)
    {
      var user = users[0];
      
      if(!user) 
      {
        return done(null, false, { message: 'That email is not registered :(' });
      }

      if(user.didDelete) 
      {
        return done(null, false, { message: 'Your account is locked :(' });
      }

      bcrypt.compare(password, user.password, function(err, isMatch)
      {
        if (err) throw err;

        if (isMatch) 
        {
          if(process.env.LOGIN_TYPE == 'admin' && user.type== 'customer') 
          {
            return done(null, false, { message: 'Your account is not allowed for this login :(' });
          }

          process.env.ADMIN_NAME = user.name;
          
          return done(null, user);
        } 

        return done(null, false, { message: 'Password incorrect :(' });
      });
    });
  }));

  passport.serializeUser(function(user, done) 
  {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done)
  {
    userDAO.find({ _id: ObjectId(id) }, function(users)
    {
      done(null, users[0]);
    });
  });
}
