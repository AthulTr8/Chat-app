const { configDotenv } = require("dotenv");
const mongoose = require("mongoose")
configDotenv({ path: "./config.env" })
const path = require("path")
const { Server } = require("socket.io")
const oneToOneMessage = require("./models/oneToOneMessage")
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
    // console.log(socket)
    // const user_id = socket.handshake.query("user_id")
    // Correct syntax reading it as an object property
    const user_id = socket.handshake.query.user_id;


    const socket_id = socket.id
    console.log(`User Connected ${socket_id}`)
    if (user_id === "null") {
        return
    }
    if (Boolean(user_id)) {
        await User.findByIdAndUpdate(user_id, { socket_id, status: "Online" })
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
    })
    socket.on("accept_requests", async (data) => {
        console.log(`inside socket accept request`)
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

    socket.on("cancel_request", async ({ user_id, to }) => {
        await FriendRequest.findOneAndDelete({
            sender: user_id,
            recipient: to
        })
    })

    socket.on("get_direct_conversations", async ({ user_id }, callback) => {
        const existing_conversation = await oneToOneMessage.find({
            participants: { $all: [user_id] }
        }).populate("participants", "firstName lastName _id email status")
        console.log(existing_conversation)

        callback(existing_conversation)
    })

    socket.on("start_conversation", async (data) => {
        // data:{to, from}
        const { to, from } = data
        // check is there any existing conversation between these users
        const existing_conversation = await oneToOneMessage.find({
            participants: {
                $size: 2, $all: [to, from]
            }
        }).populate("participants", "firstName lastName _id email status")
        console.log(existing_conversation[0], "Existing Conversation")

        if (existing_conversation.length === 0) {
            let new_chat = await oneToOneMessage.create({
                participants: [to, from]
            })

            new_chat = await oneToOneMessage.findById(new_chat._id).populate("participants", "firstName lastName _id email status")
            console.log(new_chat)
            socket.emit("start_chat", new_chat)
        }
        // if there is existing customer
        else {
            socket.emit("start_chat", existing_conversation[0])
        }
    })
    socket.on("get_messages", async (data, callback) => {
        const { messages } = await oneToOneMessage.findById(data.conversation_id).select("messages")
        callback(messages)
    })
    // Handle text/link messages
    socket.on("text_message", async (data) => {
        console.log("Recevied Message: ", data)
        // data : {to, from, text, conversation_id, type}
        const { to, from, message, conversation_id, type } = data

        const to_user = await User.findById(to)
        const from_user = await User.findById(from)

        const new_message = {
            to,
            from,
            type,
            text: message,
            createdAt: Date.now()
        }
        // create a new conversation if it doesn't exist yet or add new
        const chat = await oneToOneMessage.findById(conversation_id)
        chat.messages.push({ new_message })
        // save to DB
        await chat.save({})

        // emit new_message -> to user
        io.to(to_User.socket_id).emit("new_message", {
            conversation_id,
            message: new_message
        })
        // emit new_message -> from user
        io.to(from_User.socket_id).emit("new_message", {
            conversation_id,
            message: new_message
        })
    })

    socket.on("file_message", (data) => {
        console.log("received Message:", data)
        // data : {to, from, text, files}
        // get the file extension

        const fileExtention = path.extname(data.file.name)
        // generate a unique file name
        const fileName = `${Date.now()}_${Math.floor(Math.random() * 10000)}${fileExtention}`
        // upload files to aws s3
        // create a new conversation if it doesn't exist yet or add new
        // save to DB
        // emit incoming_message -> to user
        // emit outgoing_messages -> from user
    })

    // -------------- HANDLE AUDIO CALL SOCKET EVENTS ----------------- //

    // handle start_audio_call event
    socket.on("start_audio_call", async (data) => {
        const { from, to, roomID } = data;

        const to_user = await User.findById(to);
        const from_user = await User.findById(from);

        console.log("to_user", to_user);

        // send notification to receiver of call
        io.to(to_user?.socket_id).emit("audio_call_notification", {
            from: from_user,
            roomID,
            streamID: from,
            userID: to,
            userName: to,
        });
    });

    // handle audio_call_not_picked
    socket.on("audio_call_not_picked", async (data) => {
        console.log(data);
        // find and update call record
        const { to, from } = data;

        const to_user = await User.findById(to);

        await AudioCall.findOneAndUpdate(
            {
                participants: { $size: 2, $all: [to, from] },
            },
            { verdict: "Missed", status: "Ended", endedAt: Date.now() }
        );

        // TODO => emit call_missed to receiver of call
        io.to(to_user?.socket_id).emit("audio_call_missed", {
            from,
            to,
        });
    });

    // handle audio_call_accepted
    socket.on("audio_call_accepted", async (data) => {
        const { to, from } = data;

        const from_user = await User.findById(from);

        // find and update call record
        await AudioCall.findOneAndUpdate(
            {
                participants: { $size: 2, $all: [to, from] },
            },
            { verdict: "Accepted" }
        );

        // TODO => emit call_accepted to sender of call
        io.to(from_user?.socket_id).emit("audio_call_accepted", {
            from,
            to,
        });
    });

    // handle audio_call_denied
    socket.on("audio_call_denied", async (data) => {
        // find and update call record
        const { to, from } = data;

        await AudioCall.findOneAndUpdate(
            {
                participants: { $size: 2, $all: [to, from] },
            },
            { verdict: "Denied", status: "Ended", endedAt: Date.now() }
        );

        const from_user = await User.findById(from);
        // TODO => emit call_denied to sender of call

        io.to(from_user?.socket_id).emit("audio_call_denied", {
            from,
            to,
        });
    });

    // handle user_is_busy_audio_call
    socket.on("user_is_busy_audio_call", async (data) => {
        const { to, from } = data;
        // find and update call record
        await AudioCall.findOneAndUpdate(
            {
                participants: { $size: 2, $all: [to, from] },
            },
            { verdict: "Busy", status: "Ended", endedAt: Date.now() }
        );

        const from_user = await User.findById(from);
        // TODO => emit on_another_audio_call to sender of call
        io.to(from_user?.socket_id).emit("on_another_audio_call", {
            from,
            to,
        });
    });


    socket.on("end", async (data) => {
        // find user by _id and update status to Offline
        if (data.user_id) {

        }
        console.log("Closing Connection")
        socket.disconnect(0)
    })

})

process.on("unhandledRejection", (err) => {
    console.log(err)
    server.close(() => {
        process.exit(1)
    })
})