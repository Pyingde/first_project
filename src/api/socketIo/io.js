var io = require('socket.io')();
io.on("connection", function(client){
    client.on('pay', function(data){
        io.emit("ok", data);
    })
    client.on('money', function(data){
        io.emit("finish", data);
    })
})
io.listen(8818)