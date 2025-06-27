const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "others"],
            message: `{value} is not valid for gender`
        }
    },
    age: {
        type: Number,
        min: 18
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address :", value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password is too weak")
            }
        }
    },
    about: {
        type: String,
        default: "This is the default Bio of the user"
    },
    skills: {
        type: [String]
    },
    photoUrl: {
        type: String,
        default: "https://www.bing.com/images/search?view=detailV2&ccid=nMLvSM1x&id=2C20F05A62EA53F1F1532B056346DFE7FC8685A1&thid=OIP.nMLvSM1x4RxpyhMwkgDVxQHaE8&mediaurl=https%3a%2f%2fimg.freepik.com%2fpremium-photo%2fportrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai_117038-5477.jpg%3fw%3d900&exph=600&expw=900&q=random+cool+images+for+developers&simid=608000016811301380&FORM=IRPRST&ck=BECC40A891EA2E169567850D141E8CEB&selectedIndex=0&itb=0",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid photo url :", value)
            }
        }
    }
})

userSchema.methods.getJWT = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, "DevTinder", { expiresIn: "7d" })
    return token
}

userSchema.methods.verifyPassword = async function (inputpass) {
    const user = this
    const passwordHash = user.password
    const isPassValid = await bcrypt.compare(inputpass, passwordHash)
    return isPassValid
}

const User = mongoose.model("User", userSchema)

module.exports = User