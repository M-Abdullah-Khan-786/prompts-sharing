import mongoose from "mongoose";

let isConnected = false

export const connectDB = async ()=>{
    mongoose.set('strictQuery', true)
    if(isConnected){
        console.log('MongoDB is already connected')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "prompts-sharing",
        })
        isConnected = true
    } catch (error) {
        console.log('Error connecting to MongoDB:', error)
    }
}