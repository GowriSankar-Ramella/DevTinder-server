const validator = require("validator")
const User = require("../models/User.model")

const validateSignupData = async (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName) {
        throw new Error("First name is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is too weak")
    }
    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid")
    }
    const exist = await User.find({ email })
    if (exist.length > 0) {
        throw new Error("Email already exist")
    }
}

const validateUpdateProfileData = (req) => {
    const allowedFields = ["firstName", "lastName", "skills", "about", "photoUrl", "age", "location", "company", "experience", "github", "linkedin", "gender"]

    const isAllowed = Object.keys(req.body).every((field) => allowedFields.includes(field))

    return isAllowed
}
module.exports = { validateSignupData, validateUpdateProfileData }