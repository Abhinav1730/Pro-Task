import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri, { dbName: "pro-task" });
  console.log("MongoDB connected");
};

export default connectDB;