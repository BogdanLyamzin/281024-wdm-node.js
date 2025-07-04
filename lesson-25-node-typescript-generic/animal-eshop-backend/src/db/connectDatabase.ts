import mongoose from "mongoose";

const {DATABASE_URI} = process.env;

const connectDatabase = async()=> {
    try {
        if(typeof DATABASE_URI !== "string") throw Error("DATABASE_URI not found");
        // await mongoose.connect(DATABASE_URI as string); 
        await mongoose.connect(DATABASE_URI); 
        console.log("Successfully connect database");
    }
    catch(error) {
        if(error instanceof Error) {
            console.log(`Error connect database ${error.message}`);
            console.log(error);
        }
        throw error;
    }
}

export default connectDatabase;