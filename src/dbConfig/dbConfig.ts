import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MONGODB connected successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MONGODB connection error. Please make sure Mongodb is running " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("DB CONNECTION FAILED");
    console.log(error);
  }
}
