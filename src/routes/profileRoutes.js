const express = require("express")
const { getProfile, updateProfile } = require("../controllers/profileControllers")
const authUser = require("../middleware/auth.middleware")

const profileRouter = express.Router()

profileRouter.get("/view", authUser, getProfile)
profileRouter.patch("/update", authUser, updateProfile)

module.exports = profileRouter