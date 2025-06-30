const User = require("../models/User.model")
const Connection = require("../models/Connection.model")
const ApiResponse = require("../utils/ApiResponse")

const handleSendRequest = async (req, res) => {
    try {
        const senderId = req.user._id
        const receiverId = req.params.receiverId
        const status = req.params.status
        const allowedStatus = ["interested", "ignored", "saved"]
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid request type")
        }
        const receiver = await User.findById(receiverId)
        if (!receiver) {
            throw new Error("User not found")
        }
        const duplicateRequest = await Connection.findOne({
            $or: [{ senderId, receiverId, status: "interested" }, { senderId, receiverId, status: "ignored" }, { senderId: receiverId, receiverId: senderId, status: "interested" }, { senderId: receiverId, receiverId: senderId, status: "ignored" }]
        })
        if (duplicateRequest) {
            throw new Error("Request already sent")
        }

        const savedRequest = await Connection.findOne({ senderId, receiverId, status: "saved" })

        if (savedRequest) {
            savedRequest.status = status
            await savedRequest.save()
            res.json(new ApiResponse(200, { savedRequest }, "Connection request sent successfully!!"))
        }
        else {
            const newConnection = new Connection({ senderId, receiverId, status })
            await newConnection.save()
            res.json(new ApiResponse(200, { newConnection }, "Connection request sent successfully!!"))
        }
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
}

const handleReviewRequest = async (req, res) => {
    try {
        const { status, requestId } = req.params
        const allowedStatus = ["accepted", "rejected"]
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid Request type")
        }
        const request = await Connection.findById(requestId)
        if (!request) {
            throw new Error("Request not found")
        }
        request.status = status
        await request.save()
        res.json(new ApiResponse(200, { request }, "Connection " + status + " successfully!!"))
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
}

module.exports = { handleSendRequest, handleReviewRequest }