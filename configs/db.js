import mongoose from 'mongoose';



// mongoDB Connection
export const monogoDBConnection = async (req, res) => {

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`.bgCyan.black);

        
    } catch (error) {
        console.log(`${error.message}`.bgRed.black);
    }

}