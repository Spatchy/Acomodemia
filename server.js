const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');

// set up port
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// add routes
const router = require('./routes/router.js');
app.use('/api', router);
app.use(serveStatic(__dirname + '/dist'));
app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.join(__dirname + '/dist/index.html'));
    });

// transfer control to http object for socket.io
// eslint-disable-next-line new-cap
const http = require('http').Server(app);

// set up socket.io server and pipe it to chat.js
const io = require('socket.io')(http);
require('./routes/chat.js').start(io);

module.exports = app;

// Start the server
http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
