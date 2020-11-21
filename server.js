const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var serveStatic = require('serve-static');
var path = require('path');

// set up port
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// add routes
const router = require('./routes/router.js');
app.use('/api', router);
app.use(serveStatic(__dirname + "/dist"));
app.route('/*')
    .get(function(req, res) {
          res.sendFile(path.join(__dirname + '/dist/index.html'));
});

module.exports = app;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
