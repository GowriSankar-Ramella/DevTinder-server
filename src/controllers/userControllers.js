const { connection } = require("mongoose")
const Connection = require("../models/Connection.model")
const User = require("../models/User.model")

const ApiResponse = require("../utils/ApiResponse")

const requiredFields = "firstName lastName photoUrl age gender about skills"

const receivedRequests = async (req, res) => {
    try {
        const loggedinUser = req.user
        const connectionRequests = await Connection.find({ receiverId: loggedinUser._id, status: "interested" }).populate("senderId", requiredFields)
        res.json(new ApiResponse(200, { data: connectionRequests }, "Connection Requests fetched successfully"))
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
}

const connections = async (req, res) => {
    try {
        const loggedinUser = req.user
        const friends = await Connection.find({
            $or: [{ senderId: loggedinUser._id, status: "accepted" },
            { receiverId: loggedinUser._id, status: "accepted" }
            ]
        }).populate("senderId", requiredFields).populate("receiverId", requiredFields)
        const data = friends.map((friend) => {
            if (loggedinUser._id.toString() === friend.senderId._id.toString()) {
                return friend.receiverId
            }
            return friend.senderId
        })
        res.json(new ApiResponse(200, { data }, "Connections fetched successfully!!"))
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
}

const feed = async (req, res) => {
    try {
        const loggedinUser = req.user
        const known = await Connection.find({
            $or: [{ senderId: loggedinUser._id }, { receiverId: loggedinUser._id }]
        }).select("senderId receiverId")
        const hideFromFeed = new Set()
        known.forEach(element => {
            hideFromFeed.add(element.senderId.toString())
            hideFromFeed.add(element.receiverId.toString())
        });
        const unknown = await User.find({ $and: [{ _id: { $nin: Array.from(hideFromFeed) } }, { _id: { $ne: loggedinUser._id } }] })
        res.json(new ApiResponse(200, { unknown }, "Feed fetched successfully!!"))
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
}

module.exports = { receivedRequests, connections, feed }