const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Connected to db successfully")
    } catch (error) {
        console.log("Failed to connect to db :", error)
    }
}

module.exports = connectDb