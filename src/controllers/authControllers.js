const { validateSignupData } = require("../utils/validateData")
const bcrypt = require("bcrypt")
const User = require("../models/User.model")
const ApiResponse = require("../utils/ApiResponse")

const signup = async (req, res) => {
    try {
        await validateSignupData(req)
        const { firstName, lastName, email, password, location } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({ firstName, lastName, email, password: passwordHash, location })
        const savedUser = await user.save()
        const token = await savedUser.getJWT()
        res.cookie("devTinderToken", token, { maxAge: 1 * 24 * 60 * 60 * 1000 }).json(new ApiResponse(200, { user: savedUser }, "SignedUp successfully!!"))
    } catch (error) {
        res.status(400).send("Error occured :" + error.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("User not found!!")
        }
        const isPassValid = await user.verifyPassword(password)
        if (isPassValid) {
            const token = await user.getJWT()
            res.cookie("devTinderToken", token, { maxAge: 1 * 24 * 60 * 60 * 1000 }).json(new ApiResponse(200, { user: user }, "Logged in Successfully!"))
        }
        else {
            throw new Error("Invalid Password")
        }
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
}

const logout = (req, res) => {
    res.clearCookie("devTinderToken").json(new ApiResponse(200, {}, "Logged out successfullly!!"))
}



module.exports = { signup, login, logout }