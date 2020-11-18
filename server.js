const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var serveStatic = require('serve-static');

// set up port
const port = process.env.PORT || 3072;

app.use(bodyParser.json());
app.use(cors());

// add routes
const router = require('./routes/router.js');
app.use('/api', router);
app.use(serveStatic(__dirname + "/dist"));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
