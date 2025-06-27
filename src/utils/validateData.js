const validator = require("validator")

const validateSignupData = (req) => {
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
}

const validateUpdateProfileData = (req) => {
    const allowedFields = ["firstName", "lastName", "skills", "about", "photoUrl", "age"]

    const isAllowed = Object.keys(req.body).every((field) => allowedFields.includes(field))

    return isAllowed
}
module.exports = { validateSignupData, validateUpdateProfileData }