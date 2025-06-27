const User = require("../models/User.model")
const jwt = require("jsonwebtoken")
const authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            throw new Error("Please login")
        }
        const decodedToken = jwt.verify(token, "DevTinder")
        const { _id } = decodedToken
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User not found!!")
        }
        req.user = user
        next()

    } catch (error) {
        res.status(400).send("Error :" + error.message)
    }
}

module.exports = authUser