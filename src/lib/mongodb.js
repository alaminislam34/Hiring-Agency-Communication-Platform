import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error(
    "❌ Please define the MONGODB_URI environment variable in .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "❌ Please define the DB_NAME environment variable in .env.local"
  );
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const getCollection = async (collectionName) => {
  const client = await clientPromise;
  return client.db(dbName).collection(collectionName);
};

export const collection = {
  user_collection: "users",
  jobsCollection: "jobs",
  appliedCollection: "applied-jobs",
  interviewsCollection: "interviews",
  messagesCollection: "messages",
  reviewsCollection: "reviews",
  forumPostCollection: "forum-post",
  forumCommentsCollection: "forum-comments", // ✅ casing fixed
};
