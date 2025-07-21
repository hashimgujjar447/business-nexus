import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URL}`);
    if (connection) {
      console.log("Db connected successfully");
    }
  } catch (error) {
    console.log("Error while connecting db :", error);
  }
};
