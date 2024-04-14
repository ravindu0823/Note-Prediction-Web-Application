import mongoose from "mongoose";


let isConnected: boolean = false;
let MONGODB_URI: string = process.env.MONGODB_URI as string

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "note-recognition-dev",
    });

    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

export const disconnectFromDB = async (): Promise<void> => {
  if (!isConnected) {
    return console.log("MongoDB is already disconnected");
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log("MongoDB Disconnected");
  } catch (error) {
    console.log(error);
  }
};
