const express = require("express")
const http = require("http")
var path = require("path")
const chatRouter = require("./routes/chat")
const dbConfig = require('./mongoConfig/mongoDB.json')
const mongoose = require('mongoose')

var app = express()
app.set("views", path.join(__dirname,"views"))
app.set("view engine","twig")

app.use("/chat", chatRouter)

const server = http.createServer(app)
const io = require("socket.io")(server)

//si l'event connection aura lieu, alors on va appeler cette fct callback
io.on('connection', (socket) => {
    console.log('User Connected..')
    socket.emit("msg", "A new user is connected") // le serveur va envoyer une notification au client 

    socket.on("disconnect", ()=>{
        console.log("user has been disconnected")
        io.emit("msg", "A user has been disconnected")
    })

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    })

    socket.on('IsTyping', () => {
        socket.broadcast.emit('IsTyping');
    })
})

mongoose.connect(dbConfig.mongo.uri)

server.listen(3000, () => console.log("server is run"))