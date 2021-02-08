const jwt = require('jsonwebtoken');
const db = require('../db.js');
const uuid = require('uuid');

module.exports = {
  start: function(io) {
    const clients = {}; // maps MatchingID of connected clients to their socket ID

    io.use(function(socket, next) {
      if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, 'SECRETKEY', function(err, decoded) {
          if (err) {
            console.log(err);
            return next(new Error('Authentication error'));
          }
          socket.decoded = decoded;
          next();
        });
      } else {
        console.log('an error occured');
        next(new Error('Authentication error'));
      }
    }).on('connection', (socket) => {
      db.query(
          `SELECT MatchingID FROM User WHERE PrimaryEmail = ${db.escape(socket.decoded.email)};`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              // add their matching id and this socket id to clients
              clients[result[0].MatchingID] = socket.id;

              // remove them on disconnect
              socket.on('disconnect', () => {
                delete clients[result[0].MatchingID];
              });

              socket.on('message', (payload) => {
                sender = result[0].MatchingID; // needed as scope of result changes
                const messageId = uuid.v4().replace(/-/g, ''); // clients should keep message IDs for future implementations (deleting, reporting, read receipts etc)
                db.query(
                    `INSERT INTO Messages VALUES('${messageId}', '${sender}', ${db.escape(payload.recipient)}, NOW(), ${db.escape(payload.body)});`,
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        try {
                          io.to(clients[payload.recipient]).emit('message', {id: messageId, from: sender, timestamp: Date.now(), content: payload.body}); // send the message
                          socket.emit('success', messageId); // send messageId back to the sender for safe keeping
                          console.log('success! Check database to confirm');
                        } catch (err) {
                          console.log('emit failed: ' + err);
                        }
                      }
                    },
                );
              });
            }
          },
      );
    });
  },
};
