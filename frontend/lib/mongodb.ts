/*import mongoose, { Connection } from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

interface MongooseCache {
  conn: Connection | null;
}

declare global {
  var mongooseCache: MongooseCache;
}

global.mongooseCache = global.mongooseCache || { conn: null };

async function connectToDatabase(): Promise<Connection> {
  if (!global.mongooseCache.conn) {
    global.mongooseCache.conn = await mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((m) => m.connection);
  }
  return global.mongooseCache.conn;
}

export default connectToDatabase;*/
