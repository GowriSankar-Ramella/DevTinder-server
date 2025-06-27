const express = require("express")

const connectDb = require("./config/db.js")

const cookieParser = require("cookie-parser")

const authRouter = require("./routes/authRoutes.js")

const profileRouter = require("./routes/profileRoutes.js")

const requestRouter = require("./routes/requestRoutes.js")

const userRouter = require("./routes/userRoutes.js")

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use("/auth", authRouter)

app.use("/profile", profileRouter)

app.use("/request", requestRouter)

app.use("/user", userRouter)

connectDb().then(() => {
    app.listen(3000, () => {
        console.log("server is running in port 3000")
    })
})
