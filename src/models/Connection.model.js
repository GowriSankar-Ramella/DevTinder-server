const mongoose = require("mongoose")

const connectionSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "accepted", "interested", "rejected"]
        },
        required: true
    }
})

connectionSchema.index({ senderId: 1, receiverId: 1 })

connectionSchema.pre("save", function (next) {
    connectionRequest = this
    if (connectionRequest.senderId.equals(connectionRequest.receiverId)) {
        throw new Error("Error : Request cant be send to yourself")
    }
    next()
})


const Connection = new mongoose.model("Connection", connectionSchema)

module.exports = Connection