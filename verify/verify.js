var jwt = require('jsonwebtoken');
var config = require('../config/db.js');

exports.getToken = function(user){
  return jwt.sign(user, config.secretKey, {
      expiresIn: 3600
  });
};
exports.verifyOrdinaryUser = function (req, res, next) {
    console.log("cookies",req.cookies);
    var token= req.cookies.auth;
    // check header or url parameters or post parameters for token
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                console.log("decoded",decoded);
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};
