const express = require("express")
const authUser = require("../middleware/auth.middleware")
const Chat = require("../models/Chat.model")
const ApiResponse = require("../utils/ApiResponse")


const chatRouter = express.Router()

chatRouter.get("/all", authUser, async (req, res) => {
    const user = req.user
    try {
        const chats = await Chat.find({ participants: user._id })
            .populate("participants", "firstName lastName photoUrl")
            .populate("messages.senderId", "firstName lastName photoUrl")
            .sort({ updatedAt: -1 })

        res.json(new ApiResponse(200, { chats }, "all chats fetched successfully!!"))
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

chatRouter.get("/initialize/:targetUserId", authUser, async (req, res) => {
    try {
        const { targetUserId } = req.params
        const user = req.user
        let chat = await Chat.findOne({ participants: { $all: [user._id, targetUserId] } })
        if (!chat) {
            chat = new Chat({ participants: [user._id, targetUserId], messages: [] })
        }
        chat.messages.push({ senderId: user._id, text: "Hi❤️" })
        await chat.save()
        res.json(new ApiResponse(200, { chat }, "Hi sent Successfully"))
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

chatRouter.get("/:targetUserId", authUser, async (req, res) => {
    const user = req.user
    const { targetUserId } = req.params
    try {
        const chat = await Chat.findOne({ participants: { $all: [user._id, targetUserId] } }).populate("participants", "firstName lastName photoUrl").populate("messages.senderId", "firstName lastName photoUrl")
        if (!chat) {
            res.json(new ApiResponse(200, { messages: [] }, "Previous messages fetched successfully!!"))
        }
        else {
            res.json(new ApiResponse(200, { messages: chat.messages }, "Previous messages fetched successfully!!"))
        }
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
})



module.exports = chatRouter
