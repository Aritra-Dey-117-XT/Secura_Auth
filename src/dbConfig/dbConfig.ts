import mongoose, { connection } from "mongoose"

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection
        connection.on("connected", () => {
            console.log("Connected to MongoDB Database Successfully!")
        })
        connection.on("error", (error) => {
            console.log("Problem Connecting to MongoDB Database! Error : ", error)
        })
    } catch (error) {
        console.log("Cannot Connect to the MongoDB Database : ", error)
    }
}