import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Db connect"));
    await mongoose.connect(`${process.env.MONGODB_URI}/goals-tracker`);
  } catch (error) {
    console.log(error.message);
  }
};


export default connectDB;
