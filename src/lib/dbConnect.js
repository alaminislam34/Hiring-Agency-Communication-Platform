import { MongoClient, ServerApiVersion } from "mongodb";
export const collection = { user_collection: "users" };
const uri = process.env.MONGODB_URI;

export default function dbConnect(collectionName) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.db(process.env.DB_NAME).collection(collectionName);
}
