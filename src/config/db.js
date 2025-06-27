const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://gowrisankarramella:Gowri12052004@devtindercluster.bkrl56h.mongodb.net/devTinder")
        console.log("Connected to db successfully")
    } catch (error) {
        console.log("Failed to connect to db :", error)
    }
}

module.exports = connectDb