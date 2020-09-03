const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");

console.log("Passport file");

var tokenExtractor = function (req) {
  var { authorization } = req.headers;
  console.log("Auth : ", authorization);
  var token = authorization.replace("Bearer ", "");
  return token;
};


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email })
        .then((foundUser) => {
          if (!foundUser) {
            return done(null, false, { message: "User not found" });
          }
          bcrypt.compare(password, foundUser.password).then((match) => {
            if (!match) {
              return done(null, false, { message: "Wrong password" });
            }
            return done(null, foundUser);
          });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.use(
  new JwtStrategy(
    { jwtFromRequest: tokenExtractor, secretOrKey: "jtrlkgsjflgiosgtiwrtit894r98498t984" },
    (jwt_payload, done) => {
      console.log("JWt pay ", jwt_payload);
      User.findOne({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          console.log("THe user has been found -", user);
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    }
  )
);

