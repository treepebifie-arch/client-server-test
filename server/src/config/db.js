import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()



const db = async () => {
    try {
            await mongoose.connect (process.env.MONGO_URI) || 'mongodb://localhost:27017/AuthClass'
            console.log ('Database connected successfully')
    } catch (err) {
        console.error ('Failed to connect database', err);
        process.exit(1);
    }
};


export default db;
