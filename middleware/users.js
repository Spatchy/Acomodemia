module.exports = {
  validateRegister: (req, res, next) => {

    var errorMessages = [];

    // valid primary email
    validEmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
    
    if (!validEmailRegex.test(req.body.username)) {
      return res.status(400).send({
        msg: 'Please enter a valid primary email address'
      });
    }

    // why the hell does this need a new variable name?????
    validUniEmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

    if (!validUniEmailRegex.test(req.body.uniEmail) || !req.body.uniEmail.endsWith('.ac.uk')) {
      return res.status(400).send({
        msg: 'Please enter a valid university email address ending with .ac.uk'
      });
    }

    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }

    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
    }
    
    // checking if birth date is valid, person has >= than 16 years
    var currentDate = new Date(); 
    var currentYear = currentDate.getFullYear();
    var usersBirthYear = req.body.dob.substring(0, 4);
    if((currentYear - usersBirthYear) <= 16 || (usersBirthYear > currentYear)) {
      return res.status(400).send({
        msg: 'Please enter valid birth date.'
      });
    }

    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        'SECRETKEY'
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!'
      });
    }
  },
  isVerified: (req, res, next) => {
    const db = require('../db.js');
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        'SECRETKEY'
      );
      db.query(
        `SELECT Verified FROM User WHERE PrimaryEmail = ${db.escape(decoded.email)};`,
        (result, err) => {
          if (err) {
            return res.status(500).send({
              msg: 'internal server error'
            });
          }
          else {
            console.log(typeof result[0]["Verified"])
            next()
          }
        }
      )
    } catch (err) {
      return res.status(500).send({
        msg: 'internal server error'
      });
    }
  }
};