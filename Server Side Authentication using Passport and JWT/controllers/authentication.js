const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(422)
      .send({ error: "Email and Password are both required" });

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) return next(err);

    // If user with given email already exists, return an error
    if (existingUser) return res.status(422).send("Email already exists");

    // If user with email doesnt exists then create a new user.
    const user = new User({ email, password });
    console.log(user);
    user.save(function(err) {
      console.log(user);
      if (err) return next(err);

      // User created successfully;
      res.json({ success: true, token: tokenForUser(user) });
    });
  });
};
