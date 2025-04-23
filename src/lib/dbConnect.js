// import { MongoClient, ServerApiVersion } from "mongodb";
// export const collection = {
//   user_collection: "users",
//   jobsCollection: "jobs",
//   appliedCollection: "applied-jobs",
//   interviewsCollection: "interviews",
//   applyForEmployerCollection: "employerApply",
// };

// const uri = process.env.MONGODB_URI;

// export default function dbConnect(collectionName) {
//   try {
//     const client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//     });

//     client.connect();

//     return client.db(process.env.DB_NAME).collection(collectionName);
//   } catch (err) {
//     console.error("MongoDB connection failed:", err);
//   }
// }
