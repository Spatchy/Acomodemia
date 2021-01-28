module.exports = {
    start: function(io) {
        io.on("connection", (socket) => {
            //do something
            console.log(socket.id)
        })
    }
}