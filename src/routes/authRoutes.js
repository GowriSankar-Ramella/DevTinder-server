const express = require("express")

const { signup, login, logout } = require("../controllers/authControllers")

const authUser = require("../middleware/auth.middleware")

const authRouter = express.Router()

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.get("/logout", authUser, logout)


module.exports = authRouter