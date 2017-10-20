var io = require('socket.io')();
io.on("connection", function(client){
    client.on('pay', function(data){
        io.emit("ok", 'true');
        console.log(data)
    })
})
io.listen(8818)