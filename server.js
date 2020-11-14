var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var mysql = require('mysql');
var fs = require('fs');

app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 8080;
var hostname = '127.0.0.1';

// Start the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


var credentials = JSON.parse(fs.readFileSync(__dirname + "/credentials.json"));

// Socket.io integration
var http = require('http').createServer(app);
var io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user connected');

    // --- SQL integration ---
    var con = mysql.createConnection({
        host: credentials["host"],
        user: credentials["user"],
        password: credentials["password"]
    });

    // connect to the MySQL database 
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
        // All queries and statements go here
        /* con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
        }); */
    });

});

