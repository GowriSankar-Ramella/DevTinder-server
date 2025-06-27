const express = require("express")
const authUser = require("../middleware/auth.middleware")
const { handleSendRequest, handleReviewRequest } = require("../controllers/requestControllers")

const connectionRouter = express.Router()

connectionRouter.post("/send/:status/:receiverId", authUser, handleSendRequest)
connectionRouter.post("/review/:status/:requestId", authUser, handleReviewRequest)

module.exports = connectionRouter