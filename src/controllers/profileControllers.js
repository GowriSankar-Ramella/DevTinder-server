const ApiResponse = require("../utils/ApiResponse")
const { validateUpdateProfileData } = require("../utils/validateData")

const getProfile = (req, res) => {
    try {
        res.json(new ApiResponse(200, { user: req.user }, "User fetched successfully!!"))
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
}

const updateProfile = async (req, res) => {
    try {
        if (!validateUpdateProfileData(req)) {
            throw new Error("Invalid update request")
        }
        const loggedinUser = req.user
        Object.keys(req.body).forEach((key) => loggedinUser[key] = req.body[key])
        await loggedinUser.save()
        res.json(new ApiResponse(200, { user: loggedinUser }, "Profile updated successfully"))
    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
}

module.exports = {
    getProfile, updateProfile
}