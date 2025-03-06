import {connect} from "mongoose"


export async function connectDB(uri) {
    try {
        return await connect(uri).then(() => console.log("Connected to MongoDB"));
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}