const express = require("express")
const authUser = require("../middleware/auth.middleware")
const { receivedRequests, connections, feed } = require("../controllers/userControllers")

const userRouter = express.Router()

userRouter.get("/requests/received", authUser, receivedRequests)
userRouter.get("/connections", authUser, connections)
userRouter.get("/feed", authUser, feed)

module.exports = userRouter