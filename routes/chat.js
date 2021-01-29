const jwt = require('jsonwebtoken');
const db = require('../db.js');

module.exports = {
  start: function(io) {

    var clients = {} // maps MatchingID of connected clients to their socket ID

    io.use(function(socket, next) {
        if (socket.handshake.query && socket.handshake.query.token) {
          jwt.verify(socket.handshake.query.token, 'SECRETKEY', function (err, decoded) {
            if (err) {
              console.log(err)
              return next(new Error('Authentication error'))
            }
            socket.decoded = decoded
            next()
          });
        }
        else {
          console.log("an error occured")
          next(new Error('Authentication error'))
        }    
      }).on("connection", (socket) => {
        db.query(
          `SELECT MatchingID FROM User WHERE PrimaryEmail = ${db.escape(socket.decoded.email)};`,
          (err, result) => {
            if(err) {
              console.log(err)
            }
            else{
              // add their matching id and this socket id to clients
              clients[result[0].MatchingID] = socket.id
              console.log(clients)

              // remove them on disconnect
              socket.on('disconnect', () => {
                delete clients[result[0].MatchingID]
                console.log(clients)
              })
            }
          }
        )
        
    })
  }
}