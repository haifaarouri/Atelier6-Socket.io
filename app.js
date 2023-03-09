const express = require("express")
const http = require("http")
var path = require("path")
const chatRouter = require("./routes/chat")

var app = express()
app.set("views", path.join(__dirname,"views"))
app.set("view engine","twig")

app.use("/chat", chatRouter)

const server = http.createServer(app)
const io = require("socket.io")(server)

io.on('connection', (socket) => {
    console.log('User Connected..')
    socket.emit("msg", "A new user is connected")

    socket.on("disconnect", ()=>{
        console.log("user has been disconnected")
        io.emit("msg", "A user has been disconnected")
    })
})
server.listen(3000, () => console.log("server is run"))