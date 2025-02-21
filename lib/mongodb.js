import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not initiated..");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
    console.log("db connected...");
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
