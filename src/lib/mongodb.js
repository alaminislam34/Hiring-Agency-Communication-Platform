import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // For dev: Use global to prevent hot-reload causing multiple clients
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // For prod: Just create once
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const getCollection = async (collectionName) => {
  const client = await clientPromise;
  return client.db(process.env.DB_NAME).collection(collectionName);
};

export const collection = {
  user_collection: "users",
  jobsCollection: "jobs",
  appliedCollection: "applied-jobs",
  interviewsCollection: "interviews",
  applyForEmployerCollection: "employerApply",
};
