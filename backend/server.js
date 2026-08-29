const { configDotenv } = require("dotenv");
const mongoose = require("mongoose")
configDotenv({ path: "./config.env" })

const { Server } = require("socket.io")

const app = require("./app");
const DB = process.env.DBURL.replace("<password>", process.env.DBPASSWORD)
mongoose.connect(DB)
    .then((con) => {
        console.log("DB connection successfull")
    }).catch((err) => {
        console.log(err)
    })

process.on("uncaughtException", (err) => {
    console.log(err)
    process.exit(1)
})
const http = require("http");
const User = require("./models/user");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`App is runing on port ${port}`)
})

io.on("connection", async (socket) => {
    console.log(socket)
    const user_id = socket.handshake.query("user_id")

    const socket_id = socket.id
    console.log(`User Connected ${socket_id}`)

    if (user_id) {
        await User.findByIdAndUpdate(user_id, { socket_id })
    }
    // socket event listener here

    socket.on("friend_request", async (data)=>{
        console.log(data.to)

        const to = await User.findById(data.to)
        io.to(to.socket_id).emit("new_friend_request",{
            
        })
    })
})

process.on("unhandledRejection", (err) => {
    console.log(err)
    server.close(() => {
        process.exit(1)
    })
})