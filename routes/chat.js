module.exports = {
    start: function(io) {
        io.on("connection", function () {
            //do something
            console.log("connection established")
        })
    }
}