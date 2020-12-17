
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../db.js');
const userMiddleware = require('../middleware/users.js');
const multer = require('multer');
const fs = require('fs');
const { resolve } = require('path');

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
        var photoID = '00000000000000000000000000000000';
        var salt = uuid.v4().replace(/-/g, '')
        var matchingID = uuid.v4().replace(/-/g, '')
        var password = req.body.password+salt
        bcrypt.hash(password, 12, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database

            // create an expiry datetime 3 hours in the future and convert it to mysql's format
            var expiryDate = new Date(new Date().getTime() + 7200000).toISOString().replace('T',' ').substring(0, 19)
            db.query(
              `INSERT INTO User (PrimaryEmail, MatchingID, FirstName, Surname, DateOfBirth, UniversityEmail, Gender, HashedPassword, Salt, PhotoUUID) VALUES (${db.escape(req.body.username)}, ${db.escape(matchingID)}, ${db.escape(req.body.firstName)}, ${db.escape(req.body.secondName)}, ${db.escape(req.body.dob)}, ${db.escape(req.body.uniEmail)}, ${db.escape(req.body.gender)}, ${db.escape(hash)}, ${db.escape(salt)}, ${db.escape(photoID)});`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                db.query(
                  `INSERT INTO UnverifiedUsers VALUES(${db.escape(req.body.username)}, '1234', '5678', '${expiryDate}');`,
                  (err, result) => {
                    if (err) {
                      throw err;
                    }
                  }
                )
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

const upload = multer({
  dest: './uploads/'
});

router.post('/fileUpload', upload.single('file'), (req, res) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if(!allowedTypes.includes(req.file.mimetype)){
    return res.status(400).send({
      msg: 'Incorrect filetype!'
    })
  } else {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(
      token,
      'SECRETKEY'
    );
    db.query(
      `UPDATE User SET PhotoUUID = '${req.file.filename}' WHERE PrimaryEmail = ${db.escape(decoded.email)};`,
      (result, err) => {})
    return res.status(201).send({
      msg: 'Uploaded!'
    })
  }
})

router.get('/settings', userMiddleware.isLoggedIn, (req, res, next) => {
  //console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

router.get('/complete', userMiddleware.isLoggedIn, (req, res, next) => {
  //console.log(req.userData);
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
                name: result[0].FirstName,
                verified: result[0].Verified
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

router.post('/confirm', (req, res, next) => {
  db.query(
    `SELECT UserId FROM UnverifiedUsers WHERE UserId = ${db.escape(req.body.username)} AND CodeP1 = ${db.escape(req.body.confirm1)} AND CodeP2 = ${db.escape(req.body.confirm2)} ;`,
    
    (err, result) => {
      if(err){
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if(result){
        return res.status(200).send({
          msg: 'Confirmed!'
        });
      } 
      return res.status(403).send({
        msg: 'Incorrect Code!'
      });
    }
  );
});

router.post('/details', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
          token,
          'SECRETKEY'
        );
  db.query(`SELECT * FROM User WHERE PrimaryEmail = ${db.escape(decoded.email)};`,
  (err, result) => {
    if(err) {
      return res.status(400).send({
        msg:err
      });
    }
    if(result) {
      //console.log(result)
      return res.status(200).send({
        email: result[0].PrimaryEmail,
        bio: result[0].Bio,
        location: result[0].Location,
        budget: result[0].Budget,
        movDate: result[0].MoveDate,
        drinking: result[0].drinkingVal,
        owl: result[0].IsNightOwl,
        extro: result[0].IsExtrovert,
        smoke: result[0].SmokingLevel,
        diet: result[0].DietLevel,
        study: result[0].StudySubject
      });
    }
  })
});

router.post('/interests', (req, res, next) => {
  db.query(
    `INSERT INTO InterestsSet VALUES(${db.escape(req.body.username)}, ${db.escape(req.body.sportsSelection)});`,

    (err, result) => {
      if(err){
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      db.query(
        `INSERT INTO InterestsSet VALUES(${db.escape(req.body.username)}, ${db.escape(req.body.outdoorSelection)});`,
    
        (err, result) => {
          if(err){
            throw err;
            return res.status(400).send({
              msg: err
            });
          }
          db.query(
            `INSERT INTO InterestsSet VALUES(${db.escape(req.body.username)}, ${db.escape(req.body.indoorSelection)});`,
        
            (err, result) => {
              if(err){
                throw err;
                return res.status(400).send({
                  msg: err
                });
              }
              db.query(
                `INSERT INTO InterestsSet VALUES(${db.escape(req.body.username)}, ${db.escape(req.body.musicSelection)});`,
            
                (err, result) => {
                  if(err){
                    throw err;
                    return res.status(400).send({
                      msg: err
                    });
                  }
                  if(result){
                    return res.status(200).send({
                      msg: 'Confirmed!'
                    });
                  } 
                  return res.status(403).send({
                    msg: 'Incorrect Code!'
                  });
                }     
              );    
            }
          );
        }
      );
    }
  );
});

router.get('/getProfilePic', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
    token,
    'SECRETKEY'
  );
  db.query(`SELECT PhotoUUID FROM User WHERE PrimaryEmail = ${db.escape(decoded.email)};`, 
  (err, result) => {
    if(err) {
      throw err
    }
    else {
      payload = fs.readFileSync('./uploads/' + result[0].PhotoUUID)
      res.status(200).send(
        payload
      )
    }
  })
})

function calculateAge(birthday) { // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function retrieveInterests (id) {
  
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT Interest FROM InterestsSet WHERE UserID = ${db.escape(id)}`,
      (err, result) => {
        if(err) {
          throw err
        }
        else{
          resolve(result)
        }
      }
    )
  })
}

router.post('/getFeed', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
    token,
    'SECRETKEY'
  );
  db.query(
    `SELECT Location FROM User Where PrimaryEmail = ${db.escape(decoded.email)};`,
    (err, result) => {
      if(err) {
        throw err
      }
      else {
        db.query(
          `SELECT PrimaryEmail, MatchingID, Bio, FirstName, Gender, DateOfBirth, Location, Budget, DrinkingLevel, SmokingLevel, DietLevel, IsNightOwl, IsExtrovert, StudySubject FROM User WHERE Location = ${db.escape(result[0].Location)} AND PrimaryEmail != ${db.escape(decoded.email)};`,
          async (err, result) => {
            if(err) {
              throw err
            }
            else {
              payload = []
              pageSize = 20
              firstIndex = pageSize * req.body.page
              lastIndex = firstIndex + pageSize
              if(result.length < 20){
                lastIndex = result.length
              }
              for(i = firstIndex; i<lastIndex; i++){
                payload.push(
                  {
                    name: result[i].FirstName,
                    bio: result[i].Bio,
                    gender: result[i].Gender,
                    age: calculateAge(result[i].DateOfBirth),
                    budget: result[i].Budget,
                    drinking: result[i].DrinkingLevel,
                    smoking: result[i].SmokingLevel,
                    location: result[i].Location,
                    diet: result[i].DietLevel,
                    sleep: result[i].IsNightOwl,
                    social: result[i].IsExtrovert,
                    subject: result[i].StudySubject,
                    interests: await retrieveInterests(result[i].PrimaryEmail).then(data => {
                      return data
                    }),
                    matchingId: result[i].MatchingID
                  }
                ) 
              }
              res.status(200).send(
                payload
              )
            }
          }
        )
      }
    }
  )
})

router.post('/requestMatch', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
    token,
    'SECRETKEY'
  );
  db.query(
    `SELECT PrimaryEmail FROM User WHERE MatchingID = ${db.escape(req.body.matchingId)};`,
    (err, result) => {
      if(err) {
        throw err
      }
      else{
        emailToSelect = result[0].PrimaryEmail //needed as `result` is overwritten in next statement
        db.query(
          `SELECT RelType FROM Matches WHERE Person1 = ${db.escape(emailToSelect)} AND Person2 = ${db.escape(decoded.email)};`,
          (err, result) => {
            if(err){
              throw err
            }
            // there is either a requested match or a rejection in the table
            else if(result[0] !== undefined) {
              console.log(typeof result)
              if(result[0].RelType == "Requested"){
                // other user has already requested, match the users
                db.query(
                  `UPDATE Matches SET RelType = 'Matched' WHERE Person1 = ${db.escape(emailToSelect)} AND Person2 = ${db.escape(decoded.email)};`,
                  (err, result) => {
                    if(err) {
                      throw err
                    }
                    else{
                      res.status(200).send({
                        msg: `Matched with ${req.body.matchingId}`
                      })
                    }
                  }
                )
                
              }
              else if(result[0].RelType == "Rejected"){
                //not a match
                res.status(202).send({
                  msg: 'request accepted'
                })
              }
            }
            else {
              // not yet a match, save the request
              db.query(
                `INSERT INTO Matches VALUES( ${db.escape(decoded.email)}, ${db.escape(emailToSelect)}, 'Requested');`,
                (err, result) => {
                  if(err) {
                    throw err
                  }
                  else {
                    res.status(202).send({
                      msg: 'request accepted'
                    })                    
                  }
                }
              )
            }
          }
        )
      }
    }
  )
})

router.get('/secret-route', (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});
module.exports = router;