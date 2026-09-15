import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));
  mongoose.connection.on("error", (err) =>
    console.error("MongoDB Connection Error:", err.message)
  );

  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes("<") || uri.includes("your_")) {
    console.warn(
      "\n[WARNING] MONGODB_URI is not properly configured in backend/.env.\n" +
      "Please set a valid MongoDB Atlas connection string in backend/.env.\n" +
      "Example: MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority\n"
    );
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: "prescripto",
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;
