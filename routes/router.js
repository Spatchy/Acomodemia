const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../db.js');
const userMiddleware = require('../middleware/users.js');
const multer = require('multer');
const fs = require('fs');
const nodemailer = require('nodemailer');

// SQL query to retrieve Sports from interests list
router.post('/sportsData', (req, res, next) => {
  db.query(
      'SELECT Interest FROM Interests WHERE Category = "Sports";',
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        }
        return res.status(200).send({
          msg: result,
        });
      },
  );
});
// SQL query to retrieve Outdoor/Adventure from interests list
router.post('/oaData', (req, res, next) => {
  db.query(
      'SELECT Interest FROM Interests WHERE Category = "Outdoor/Adventure";',
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        }
        return res.status(200).send({
          msg: result,
        });
      },
  );
});
// SQL query to retrieve Indoor from interests list
router.post('/indoorData', (req, res, next) => {
  db.query(
      'SELECT Interest FROM Interests WHERE Category = "Indoor";',
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        }
        return res.status(200).send({
          msg: result,
        });
      },
  );
});
// SQL query to retrieve Music from interests list
router.post('/musicData', (req, res, next) => {
  db.query(
      'SELECT Interest FROM Interests WHERE Category = "Music";',
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        }
        return res.status(200).send({
          msg: result,
        });
      },
  );
});

const credentials = JSON.parse(fs.readFileSync('credentials.json'));
async function sendVerifEmail(emailAddress, verifCode) {
  // create nodemailer connection to gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: credentials['smtp']['user'],
      pass: credentials['smtp']['password'],
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"CO600 Housematefinder" <co600housematefinder@gmail.com>', // sender address
    to: `${emailAddress}`, // list of receivers
    subject: 'Your verification code', // Subject line
    html: `Here is one half of your verification code: <b>${verifCode}</b><br>Please check your other email for the other half`, // plain text body
  });

  console.log('Message sent: %s', info.messageId);
}

async function sendResetEmail(emailAddress, verifCode) {
  // create nodemailer connection to gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: credentials['smtp']['user'],
      pass: credentials['smtp']['password'],
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"CO600 Housematefinder" <co600housematefinder@gmail.com>', // sender address
    to: `${emailAddress}`, // list of receivers
    subject: 'Your verification code', // Subject line
    html: `Here is your password reset verification code: <b>${verifCode}</b><br>`, // plain text body
  });

  console.log('Message sent: %s', info.messageId);
}


// signup function
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
  db.query(
      `SELECT * FROM User WHERE LOWER(PrimaryEmail) = LOWER(${db.escape(
          req.body.username,
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: 'This username is already in use!',
          });
        } else {
          // username is available
          const photoID = '00000000000000000000000000000000';
          const salt = uuid.v4().replace(/-/g, '');
          const matchingID = uuid.v4().replace(/-/g, '');
          const password = req.body.password + salt;
          bcrypt.hash(password, 12, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err,
              });
            } else {
              // has hashed pw => add to database

              // create an expiry datetime 3 hours in the future and convert it to mysql's format
              const expiryDate = new Date(new Date().getTime() + 7200000).toISOString().replace('T', ' ').substring(0, 19);
              db.query(
                  `INSERT INTO User (PrimaryEmail, MatchingID, FirstName, Surname, DateOfBirth, UniversityEmail, Gender, HashedPassword, Salt, PhotoUUID) VALUES (${db.escape(req.body.username)}, ${db.escape(matchingID)}, ${db.escape(req.body.firstName)}, ${db.escape(req.body.secondName)}, ${db.escape(req.body.dob)}, ${db.escape(req.body.uniEmail)}, ${db.escape(req.body.gender)}, ${db.escape(hash)}, ${db.escape(salt)}, ${db.escape(photoID)});`,
                  (err, result) => {
                    if (err) {
                      return res.status(500).send({
                        msg: err,
                      });
                    }
                    // generate 2 4-digit codes for email verification
                    const codePt1 = Math.floor(1000 + Math.random() * 9000);
                    const codePt2 = Math.floor(1000 + Math.random() * 9000);
                    db.query(
                        `INSERT INTO UnverifiedUsers VALUES(${db.escape(req.body.username)}, '${codePt1}', '${codePt2}', '${expiryDate}');`,
                        (err, result) => {
                          if (err) {
                            return res.status(500).send({
                              msg: err,
                            });
                          }
                        },
                    );
                    sendVerifEmail(req.body.username, codePt1);
                    sendVerifEmail(req.body.uniEmail, codePt2);
                    return doLogin(req.body.username, req.body.password, res);
                  },
              );
            }
          });
        }
      },
  );
});

const upload = multer({
  dest: './uploads/',
});

router.post('/fileUpload', upload.single('file'), (req, res) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).send({
      msg: 'Incorrect filetype!',
    });
  } else {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(
        token,
        'SECRETKEY',
    );
    db.query(
        `UPDATE User SET PhotoUUID = '${req.file.filename}' WHERE PrimaryEmail = ${db.escape(decoded.email)};`,
        (result, err) => {});
    return res.status(201).send({
      msg: 'Uploaded!',
    });
  }
});

router.get('/settings', userMiddleware.isLoggedIn, (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});

router.get('/complete', userMiddleware.isLoggedIn, (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});

router.post('/settings', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(
        token,
        'SECRETKEY',
    );
  db.query(
      `UPDATE User SET Bio = ${db.escape(req.body.newBio)}, MoveDate = ${db.escape(req.body.movDate)}, Location = ${db.escape(req.body.location)}, Budget = ${db.escape(req.body.budget)}, DrinkingLevel = ${db.escape(req.body.drinkingVal)}, IsNightOwl = ${db.escape(req.body.nightOwl)}, IsExtrovert = ${db.escape(req.body.extro)}, SmokingLevel = ${db.escape(req.body.smoke)}, DietLevel = ${db.escape(req.body.diet)}, StudySubject = ${db.escape(req.body.study)} WHERE PrimaryEmail = ${db.escape(decoded.email)};`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        }
        return res.status(200).send({
          msg: 'Changed!',
        });
      },
  );
});

// login moved to seperate function to be called by both login and signup API calls
function doLogin(username, password, res) {
  db.query(
      `SELECT * FROM User WHERE PrimaryEmail = ${db.escape(username)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          // throw err;
          return res.status(500).send({
            msg: err,
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: 'Email or password is incorrect!',
          });
        }
        // check password
        bcrypt.compare(
            password + result[0]['Salt'],
            result[0]['HashedPassword'],
            (bErr, bResult) => {
              // wrong password
              if (bErr) {
                // throw bErr;
                return res.status(401).send({
                  msg: 'Email or password is incorrect!',
                });
              }
              if (bResult) {
                const token = jwt.sign({
                  email: result[0].PrimaryEmail,
                  name: result[0].FirstName,
                  verified: result[0].Verified,
                  matchingID: result[0].MatchingID,
                },
                'SECRETKEY', {
                  expiresIn: '30d',
                },
                );
                /* db.query(
                          `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        ); */
                let essentialSettingsComplete = false;
                if (result[0].PhotoUUID != '00000000000000000000000000000000' && result[0].Location != null) {
                  essentialSettingsComplete = true;
                }
                return res.status(200).send({
                  msg: 'Logged in!',
                  token,
                  user: {
                    PrimaryEmail: result[0].PrimaryEmail,
                    FirstName: result[0].FirstName,
                    Verified: result[0].Verified,
                    EssentialSettingsComplete: essentialSettingsComplete,
                  },
                });
              }
              return res.status(401).send({
                msg: 'Email or password is incorrect!',
              });
            },
        );
      },
  );
}

router.post('/login', (req, res, next) => {
  return doLogin(req.body.username, req.body.password, res);
});

router.post('/confirm', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(
      `SELECT UserId FROM UnverifiedUsers WHERE UserId = ${db.escape(decoded.email)} AND CodeP1 = ${db.escape(req.body.confirm1)} AND CodeP2 = ${db.escape(req.body.confirm2)} ;`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        }
        if (result.length > 0) {
          db.query(
              `UPDATE User SET Verified = true WHERE PrimaryEmail = ${db.escape(decoded.email)};`,
              (err, result) => {
                if (err) {
                  return res.status(500).send({
                    msg: err,
                  });
                } else {
                  db.query(
                      `DELETE FROM UnverifiedUsers WHERE UserID = ${db.escape(decoded.email)};`,
                      (err, result) => {
                        if (err) {
                          return res.status(500).send({
                            msg: err,
                          });
                        } else {
                          return res.status(200).send({
                            msg: 'Confirmed!',
                          });
                        }
                      },
                  );
                }
              },
          );
        } else {
          return res.status(403).send({
            msg: 'Incorrect Code!',
          });
        }
      },
  );
});

router.post('/details', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(`SELECT * FROM User WHERE PrimaryEmail = ${db.escape(decoded.email)};`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        }
        if (result) {
          return res.status(200).send({
            email: result[0].PrimaryEmail,
            bio: result[0].Bio,
            location: result[0].Location,
            budget: result[0].Budget,
            movDate: result[0].MoveDate,
            drinking: result[0].DrinkingLevel,
            owl: result[0].IsNightOwl,
            extro: result[0].IsExtrovert,
            smoke: result[0].SmokingLevel,
            diet: result[0].DietLevel,
            study: result[0].StudySubject,
          });
        }
      });
});

router.post('/interests', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  let allSelections = req.body.sportsSelection.concat(req.body.outdoorSelection, req.body.indoorSelection, req.body.musicSelection);
  let interestsQuery = `DELETE FROM InterestsSet WHERE UserID = ${db.escape(decoded.email)};`; // just delete everything before re-inserting to allow for individual deletions
  allSelections.forEach(selection => {
    interestsQuery += `INSERT INTO InterestsSet VALUES(${db.escape(decoded.email)}, ${db.escape(selection)});`;
  })
  db.query(
    interestsQuery,

    (err, result) => {
      if (err) {
        return res.status(500).send({
          msg: err,
        });
      } else {
        return res.status(200).send({
          msg: 'Confirmed!',
        });
      }
    },
  );
});

router.get('/getInterests', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(
    `SELECT InterestsSet.Interest, Category FROM InterestsSet, Interests WHERE InterestsSet.UserID = ${db.escape(decoded.email)} AND InterestsSet.Interest = Interests.Interest;`,
    (err, result) => {
      if (err) {
        return res.status(500).send({
          msg: err,
        });
      } else {
        res.status(200).send(
          result,
        )
      }
    },
);
});

router.get('/getProfilePic', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(`SELECT PhotoUUID FROM User WHERE PrimaryEmail = ${db.escape(decoded.email)};`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        } else {
          payload = fs.readFileSync('./uploads/' + result[0].PhotoUUID);
          res.status(200).send(
              payload,
          );
        }
      });
});

function calculateAge(birthday) { // birthday is a date
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function retrieveInterests(id) {
  return new Promise((resolve, reject) => {
    db.query(
        `SELECT Interest FROM InterestsSet WHERE UserID = ${db.escape(id)}`,
        (err, result) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            resolve(result);
          }
        },
    );
  });
}

router.post('/getFeed', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(
      `SELECT Location FROM User Where PrimaryEmail = ${db.escape(decoded.email)};`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        } else {
          // Select everyone not yet matched with, requested or rejected from the same location as the user
          var usersNotInMatchingTable = `(SELECT RelType FROM Matches WHERE (Person1 = ${db.escape(decoded.email)} AND Person2 = u.PrimaryEmail) OR (Person2 = ${db.escape(decoded.email)} AND Person1 = u.PrimaryEmail))`;
          var usersThatHaveRequested = `(SELECT RelType FROM Matches WHERE (Person2 = ${db.escape(decoded.email)} AND Person1 = u.PrimaryEmail))`
          db.query(
              `SELECT u.PrimaryEmail, u.MatchingID, u.Bio, u.FirstName, u.Gender, u.DateOfBirth, u.Location, u.Budget, u.DrinkingLevel, u.SmokingLevel, u.DietLevel, u.IsNightOwl, u.IsExtrovert, u.StudySubject, u.PhotoUUID FROM User u WHERE u.Location = ${db.escape(result[0].Location)} AND u.PhotoUUID != "00000000000000000000000000000000" AND u.PrimaryEmail != ${db.escape(decoded.email)} AND (${usersNotInMatchingTable} IS NULL OR ${usersThatHaveRequested} = 'Requested');`,
              async (err, result) => {
                if (err) {
                  return res.status(500).send({
                    msg: err,
                  });
                } else {
                  payload = [];
                  pageSize = 20;
                  firstIndex = pageSize * req.body.page;
                  lastIndex = firstIndex + pageSize;
                  if (result.length < 20) {
                    lastIndex = result.length;
                  }
                  for (i = firstIndex; i < lastIndex; i++) {
                    payload.push({
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
                      photo: fs.readFileSync('./uploads/' + result[i].PhotoUUID),
                      interests: await retrieveInterests(result[i].PrimaryEmail).then((data) => {
                        return data;
                      }),
                      matchingId: result[i].MatchingID,
                    });
                  }
                  res.status(200).send(
                      payload,
                  );
                }
              },
          );
        }
      },
  );
});

router.post('/requestMatch', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(
      `SELECT PrimaryEmail FROM User WHERE MatchingID = ${db.escape(req.body.matchingId)};`,
      (err, result) => {
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        } else {
          emailToSelect = result[0].PrimaryEmail; // needed as `result` is overwritten in next statement
          db.query(
              `SELECT RelType FROM Matches WHERE Person1 = ${db.escape(emailToSelect)} AND Person2 = ${db.escape(decoded.email)};`,
              (err, result) => {
                if (err) {
                  return res.status(400).send({
                    msg: err,
                  });
                } else if (result[0] !== undefined) { // there is either a requested match or a rejection in the table
                  if (result[0].RelType == 'Requested') {
                    // other user has already requested, match the users
                    db.query(
                        `UPDATE Matches SET RelType = 'Matched', TimeStamp=NOW() WHERE Person1 = ${db.escape(emailToSelect)} AND Person2 = ${db.escape(decoded.email)};`,
                        (err, result) => {
                          if (err) {
                            return res.status(400).send({
                              msg: err,
                            });
                          } else {
                            res.status(200).send({
                              msg: `Matched with ${req.body.matchingId}`,
                            });
                          }
                        },
                    );
                  } else if (result[0].RelType == 'Rejected') {
                    // not a match
                    res.status(202).send({
                      msg: 'request accepted',
                    });
                  }
                } else {
                  // not yet a match, save the request
                  db.query(
                      `INSERT INTO Matches VALUES( ${db.escape(decoded.email)}, ${db.escape(emailToSelect)}, 'Requested', NOW());`,
                      (err, result) => {
                        if (err) {
                          return res.status(400).send({
                            msg: err,
                          });
                        } else {
                          res.status(202).send({
                            msg: 'request accepted',
                          });
                        }
                      },
                  );
                }
              },
          );
        }
      },
  );
});

router.post('/reject', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(
      `SELECT PrimaryEmail, FirstName FROM User WHERE MatchingID = ${db.escape(req.body.matchingId)};`,
      (err, result) => {
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        } else {
          emailToSelect = result[0].PrimaryEmail; // needed as `result` is overwritten in next statement
          nameToSelect = result[0].firstName;
          db.query(
              `SELECT RelType FROM Matches WHERE (Person1 = ${db.escape(emailToSelect)} AND Person2 = ${db.escape(decoded.email)}) OR (Person2 = ${db.escape(emailToSelect)} AND Person1 = ${db.escape(decoded.email)});`,
              (err, result) => {
                if (err) {
                  return res.status(400).send({
                    msg: err,
                  });
                } else if (result[0] !== undefined) { // there is either a requested match, a successful match or a rejection in the table
                  if (result[0].RelType == 'Rejected') { // they've already rejected you, nothing needs to be done
                    res.status(200).send({
                      msg: `rejected ${nameToSelect}`,
                    });
                  } else {
                    db.query(
                        `UPDATE Matches SET RelType = 'Rejected', TimeStamp=NOW() WHERE (Person1 = ${db.escape(emailToSelect)} AND Person2 = ${db.escape(decoded.email)}) OR (Person2 = ${db.escape(emailToSelect)} AND Person1 = ${db.escape(decoded.email)});`,
                        (err, result) => {
                          if (err) {
                            return res.status(400).send({
                              msg: err,
                            });
                          } else {
                            res.status(200).send({
                              msg: `rejected ${nameToSelect}`,
                            });
                          }
                        },
                    );
                  }
                } else {
                  // not yet an entry, reject them
                  db.query(
                      `INSERT INTO Matches VALUES( ${db.escape(decoded.email)}, ${db.escape(emailToSelect)}, 'Rejected', NOW());`,
                      (err, result) => {
                        if (err) {
                          return res.status(400).send({
                            msg: err,
                          });
                        } else {
                          res.status(200).send({
                            msg: `rejected ${nameToSelect}`,
                          });
                        }
                      },
                  );
                }
              },
          );
        }
      },
  );
});

router.post('/getMatches', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(
      `SELECT u.FirstName, u.DateOfBirth, u.MatchingID, u.PhotoUUID FROM Matches m, User u WHERE ((m.Person1 = ${db.escape(decoded.email)} AND u.PrimaryEmail = m.Person2) OR (m.Person2 = ${db.escape(decoded.email)} AND u.PrimaryEmail = m.Person1)) AND m.RelType = 'Matched';`,
      (err, result) => {
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        } else {
          payload = [];
          result.forEach((element) => {
            payload.push({
              name: element.FirstName,
              age: calculateAge(element.DateOfBirth),
              matchingID: element.MatchingID,
              photo: fs.readFileSync('./uploads/' + element.PhotoUUID),
            });
          });
          res.status(200).send(
              payload,
          );
        }
      },
  );
});

router.post('/postMessage', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  const messageContent = req.body.message;
  const recipient = req.body.recipient;
  const messageUUID = uuid.v4().replace(/-/g, '');
  db.query(
      `INSERT INTO Messages (TrackNum, MessageID, Sender, Recipient, TimeStamp, Content) VALUES(default, '${messageUUID}', ${db.escape(decoded.matchingID)}, ${db.escape(recipient)}, NOW(), ${db.escape(messageContent)});`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        } else {
          res.status(201).send();
        }
      },
  );
});

router.post('/verfication-check', userMiddleware.isVerified, (req, res) => {
  res.status(200).send({
    msg: 'verified',
  });
});

router.post('/getMatchByID', (req, res) => {
  db.query(
      `SELECT FirstName, DateOfBirth, PhotoUUID FROM User WHERE MatchingID = ${db.escape(req.body.matchingID)};`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        } else {
          payload = {
            name: result[0].FirstName,
            age: calculateAge(result[0].DateOfBirth),
            photo: fs.readFileSync('./uploads/' + result[0].PhotoUUID),
          };
          return res.status(200).send(
              payload,
          );
        }
      },
  );
});

router.post('/getChatMostRecent', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(
    `SELECT * FROM Messages WHERE (Sender = ${db.escape(decoded.matchingID)} AND Recipient = ${db.escape(req.body.matchingID)}) OR (Sender = ${db.escape(req.body.matchingID)} AND Recipient = ${db.escape(decoded.matchingID)}) ORDER BY Timestamp DESC LIMIT 30;`,
    (err, result) => {
      if (err) {
        return res.status(500).send({
          msg: err,
        });
      } else {
        payload = [];
        result.forEach((element) => {
          console.log(element);
          if (element.Sender == decoded.matchingID) {
            payload.push({
              message: element.Content,
              id: element.MessageID,
              sent: true,
            });
          } else {
            payload.push({
              message: element.Content,
              id: element.MessageID,
              sent: false,
            });
          }
        });
        return res.status(200).send(
          payload,
        );
      }
    }
  )
});

router.post('/getChatHistory', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(
      `SELECT * FROM (SELECT * FROM Messages WHERE MessageID = ${db.escape(req.body.oldestMessageId)} union all (SELECT * FROM Messages WHERE TrackNum < (SELECT TrackNum FROM Messages where MessageID = ${db.escape(req.body.oldestMessageId)}) AND ((Sender = ${db.escape(decoded.matchingID)} AND Recipient = ${db.escape(req.body.matchingID)}) OR (Sender = ${db.escape(req.body.matchingID)} AND Recipient = ${db.escape(decoded.matchingID)})) ORDER BY TrackNum DESC LIMIT 30) ORDER BY TrackNum DESC) temp WHERE MessageID != ${db.escape(req.body.oldestMessageId)};`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        } else {
          console.log(req.body)
          console.log(result);
          payload = [];
          result.forEach( (element) => {
            if (element.Sender == decoded.matchingID) {
              payload.push({
                message: element.Content,
                id: element.MessageID,
                sent: true,
            });
            } else {
              payload.push({
                message: element.Content,
                id: element.MessageID,
                sent: false,
              });
            }
          });
          return res.status(200).send(
              payload,
          );
        }
      },
  );
});

router.post('/forgotPassword', (req, res) => {
  const code = Math.floor(1000 + Math.random() * 9000);
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  db.query(
      `UPDATE User SET ResetCode=${db.escape(code)} WHERE PrimaryEmail=${db.escape(req.body.username)};`,
      (err, result) => {
        if (err) {
            return res.status(500).send({
            msg: err,
          });
        } else {
          if (regex.test(req.body.username)) {
            sendResetEmail(req.body.username, code);
            return res.status(200).send({
              msg: 'Reset code sent! Check your email.'
            });
          } else {
            return res.status(500).send({
              msg: 'Incorrect details!'
            })}
      }
    }  
  );
});

router.post('/resetPassword', (req, res) => {
  if (req.body.newpass == req.body.confirm && req.body.newpass.length > 6) {
    const salt = uuid.v4().replace(/-/g, '');
    const password = req.body.newpass + salt;
    bcrypt.hash(password, 12, (err, hash) => {
      if (err) {
        return res.status(500).send({
          msg: err,
        });
      } else {
        db.query(
            `SELECT ResetCode FROM User WHERE PrimaryEmail=${db.escape(req.body.username)};`,
            (err, result) => {
              if (err) {
                return res.status(500).send({
                  msg: err,
                });
              } else {
                const resetcode = result[0].ResetCode;
                // fix to prevent users entering empty strings/undefined/null as password
                if (req.body.code.length <= 0 || null || undefined) {
                    return res.status(500).send({
                    msg: 'Please enter valid password.'
                  })};
                if (resetcode == req.body.code) {
                  db.query(
                      `UPDATE User SET HashedPassword=${db.escape(hash)}, Salt=${db.escape(salt)} WHERE PrimaryEmail=${db.escape(req.body.username)};`,
                      (err, result) => {
                        
                        if (err) {
                          return res.status(500).send({
                            msg: err,
                          });
                        } else {
                          return res.status(200).send({
                            msg: 'Password sucessfully reset!',
                          });
                        }
                      },
                  );
                } else {
                  return res.status(400).send({
                    msg: 'Code is incorrect!',
                  });
                }
              }
            },
        );
      }
    });
  } else {
    return res.status(400).send({
      msg: 'passwords do not match or your password was too short',
    });
  }
});

router.post('/changeEmail', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(
      token,
      'SECRETKEY',
  );
  db.query(
    `SELECT HashedPassword, Salt FROM User WHERE PrimaryEmail=${db.escape(decoded.email)};`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          msg: "internal server error"
        })
      } else {
        bcrypt.compare(
          req.body.password + result[0]['Salt'],
          result[0]['HashedPassword'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              // throw bErr;
              return res.status(401).send({
                msg: 'Username or password is incorrect!',
              });
            }
            if(bResult) {
              db.query(
                `UPDATE User SET PrimaryEmail=${db.escape(req.body.newEmail)} WHERE PrimaryEmail=${db.escape(decoded.email)};`,
                (err, result) => {
                  if (err) {
                    return res.status(400).send({
                      msg: err,
                    })
                  } else {
                    return res.status(200).send({
                      msg: 'Email successfully changed!',
                    });
                  }
                }
              )
            }
          })
      }
    }
  )
});

router.get('/secret-route', (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});
module.exports = router;
