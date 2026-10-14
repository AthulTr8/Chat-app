const mongoose = require("mongoose")

const oneToOneMessageSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    messages: [{
        to: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        from: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        type: {
            type: String,
            enum: ["msg", "divider"]
        },
        subtype: {
            type: String,
            enum: ["text", "reply", "video", "link", "doc", "img"]
        },

        created_at: {
            type: Date,
            default: Date.now()
        },
        text: {
            type: String
        },
        file: {
            type: String
        }
    }]
})

const OneToOneMessage = new mongoose.model("onetoonemessage", oneToOneMessageSchema)
module.exports = OneToOneMessage