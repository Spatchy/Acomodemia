const jwt = require('jsonwebtoken');
module.exports = {
  validateRegister: (req, res, next) => {

    // valid firstname
    if (req.body.firstName.length <= null) {
      return res.status(400).send({
        msg: 'Please enter your First Name',
      });
    }

    // valid surname
    if (req.body.secondName.length <= null) {
      return res.status(400).send({
        msg: 'Please enter your Second Name',
      });
    }

    // valid primary email
    validEmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

    if (!validEmailRegex.test(req.body.username)) {
      return res.status(400).send({
        msg: 'Please enter a valid primary email address',
      });
    }

    // why the hell does this need a new variable name?????
    validUniEmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

    if (!validUniEmailRegex.test(req.body.uniEmail) || !req.body.uniEmail.endsWith('.ac.uk')) {
      return res.status(400).send({
        msg: 'Please enter a valid university email address ending with .ac.uk',
      });
    }

    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars',
      });
    }

    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match',
      });
    }

    // checking if birth date is valid, person has >= than 16 years
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const usersBirthYear = req.body.dob.substring(0, 4);
    if ((currentYear - usersBirthYear) <= 17) {
      return res.status(400).send({
        msg: 'To register you need to be older than 17 years.',
      });
    }
    if ((usersBirthYear >= currentYear)) {
      return res.status(400).send({
        msg: 'You have entered future date. Are you time traveler? If not - please double check DOB input. Otherwise - contact MIB agency',
      });
    }


    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
          token,
          'SECRETKEY',
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!',
      });
    }
  },
  isVerified: (req, res, next) => {
    const db = require('../db.js');
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
          token,
          'SECRETKEY',
      );
      db.query(
          `SELECT Verified FROM User WHERE PrimaryEmail = ${db.escape(decoded.email)};`,
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).send({
                msg: 'query problem',
              });
            } else {
              if (result[0].Verified) {
                next();
              } else {
                return res.status(403).send({
                  msg: 'You are not verified',
                });
              }
            }
          },
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: 'other problem',
      });
    }
  },
};
