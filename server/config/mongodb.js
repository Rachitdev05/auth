import mongoose from 'mongoose';
import 'dotenv/config';


const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected.....Succesfully")
    } catch (error) {
        console.log('error');
    }
}
export default connectDB;
