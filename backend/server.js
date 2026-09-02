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
const FriendRequest = require("./models/friendRequest");

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

    if (Boolean(user_id)) {
        await User.findByIdAndUpdate(user_id, { socket_id })
    }
    // socket event listener here

    socket.on("friend_request", async (data) => {
        console.log(data.to)
        //  data=>{to, from}
        const to_User = await User.findById(data.to).select("soket_id")
        const from_User = await User.findById(data.from).select("soket_id")

        //  create a friend request

        await FriendRequest.create({
            sender: data.from,
            recipient: data.to
        })

        // emit event => new_friend_request
        io.to(to_User.socket_id).emit("new_friend_request", {
            message: "New Friend Request Recieved"
        })

        // emit event => request_send
        io.to(from_User.socket_id).emit("request_sent", {
            message: "Request sent successfully"
        })

        socket.on("accept_requests", async (data) => {
            console.log(data)
            const request_doc = await FriendRequest.findById(data.request_id)
            console.log(request_doc)

            // request_id
            const sender = await User.findById(request_doc.sender)
            const receiver = await User.findById(request_doc.recipient)

            sender.friends.push(request_doc.recipient)
            receiver.friends.push(request_doc.sender)

            await receiver.save({ new: true, validateModifiedOnly: true })
            await sender.save({ new: true, validateModifiedOnly: true })

            await FriendRequest.findByIdAndDelete(data.request_id)

            io.to(sender.socket_id).emit("request_acceepted", {
                message: "Friend request accepted"
            })
            io.to(receiver.socket_id).emit("request_acceepted", {
                message: "Friend request accepted"
            })
        })
        socket.on("end", function () {
            console.log("Closing Connection")
            socket.disconnect(0)
        })
    })
})

process.on("unhandledRejection", (err) => {
    console.log(err)
    server.close(() => {
        process.exit(1)
    })
})