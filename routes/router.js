
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../db.js');
const userMiddleware = require('../middleware/users.js');

// SQL query to retrieve Sports from interests list 
router.post('/sportsData', (req, res, next) => {
  db.query(
    'SELECT Interest FROM Interests WHERE Category = "Sports";',
    (err, result) => {
      if (err){
        throw err;
      }
      //console.log(result)
      return res.status(200).send({
        msg: result
      });
    }
  )
});
// SQL query to retrieve Outdoor/Adventure from interests list 
router.post('/oaData', (req, res, next) => {
  db.query(
    'SELECT Interest FROM Interests WHERE Category = "Outdoor/Adventure";',
    (err, result) => {
      if (err){
        throw err;
      }
      //console.log(result)
      return res.status(200).send({
        msg: result
      });
    }
  )
});
// SQL query to retrieve Indoor from interests list 
router.post('/indoorData', (req, res, next) => {
  db.query(
    'SELECT Interest FROM Interests WHERE Category = "Indoor";',
    (err, result) => {
      if (err){
        throw err;
      }
      //console.log(result)
      return res.status(200).send({
        msg: result
      });
    }
  )
});
// SQL query to retrieve Music from interests list 
router.post('/musicData', (req, res, next) => {
  db.query(
    'SELECT Interest FROM Interests WHERE Category = "Music";',
    (err, result) => {
      if (err){
        throw err;
      }
      //console.log(result)
      return res.status(200).send({
        msg: result
      });
    }
  )
});

//signup function
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM User WHERE LOWER(PrimaryEmail) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This username is already in use!'
        });
      } else {
        // username is available
        var photoID = uuid.v4().replace(/-/g, '')
        var salt = uuid.v4().replace(/-/g, '')
        var password = req.body.password+salt
        bcrypt.hash(password, 12, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO User (PrimaryEmail, FirstName, Surname, DateOfBirth, UniversityEmail, Gender, HashedPassword, Salt, PhotoUUID) VALUES (${db.escape(req.body.username)}, ${db.escape(req.body.firstName)}, ${db.escape(req.body.secondName)}, ${db.escape(req.body.dob)}, ${db.escape(req.body.uniEmail)}, ${db.escape(req.body.gender)}, ${db.escape(hash)}, ${db.escape(salt)}, ${db.escape(photoID)});`,
              /* `INSERT INTO User (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(req.body.username)}, ${db.escape(hash)}, now())`, */              
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'Registered!'
                });
              }
            );
          }
        });
      }
    }
  );
});

router.get('/settings', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

router.get('/complete', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

router.post('/settings', (req, res, next) => {
  db.query(
    `UPDATE User SET Bio = ${db.escape(req.body.newBio)}, MoveDate = ${db.escape(req.body.movDate)}, Location = ${db.escape(req.body.location)}, Budget = ${db.escape(req.body.budget)}, DrinkingLevel = ${db.escape(req.body.drinkingVal)}, IsNightOwl = ${db.escape(req.body.nightOwl)}, IsExtrovert = ${db.escape(req.body.extro)}, SmokingLevel = ${db.escape(req.body.smoke)}, DietLevel = ${db.escape(req.body.diet)}, StudySubject = ${db.escape(req.body.study)} WHERE PrimaryEmail = ${db.escape(req.body.PrimaryEmail)};`,
    (err, result) => {
      if(err){
        throw err;
        return res.status(400).send({
          msg: err
        });
      } 
      return res.status(200).send({
        msg: 'Changed!'
      });
    }
  );
});

// login function
router.post('/login', (req, res, next) => {
  db.query(
    `SELECT * FROM User WHERE PrimaryEmail = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        //throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
      // check password
      bcrypt.compare(
        req.body.password+result[0]['Salt'],
        result[0]['HashedPassword'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            //throw bErr;
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({
                email: result[0].PrimaryEmail,
                name: result[0].FirstName
              },
              'SECRETKEY', {
                expiresIn: '30d'
              }
            );
            /* db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            ); */
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
});

router.get('/secret-route', (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});
module.exports = router;