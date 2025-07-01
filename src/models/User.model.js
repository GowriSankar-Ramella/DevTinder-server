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
        default: "https://th.bing.com/th/id/OIP.RKrPgszyZzEt38bVz8yeTQHaHa?w=166&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid photo url :", value)
            }
        }
    },
    company: {
        type: String,
        default: "N/A"
    },
    experience: {
        type: String,
        default: 0
    },
    location: {
        type: String
    },
    github: {
        type: String,
        default: "N/A"
    },
    linkedin: {
        type: String,
        default: "N/A"
    }
})

userSchema.methods.getJWT = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
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