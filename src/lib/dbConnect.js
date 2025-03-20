import { MongoClient, ServerApiVersion } from "mongodb";
export const collection = { user_collection: "users", jobsCollection: "jobs" };
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

// chat-app/
// │── backend/                # সার্ভার (Express + Socket.io)
// │   ├── server.js           # মেইন সার্ভার ফাইল
// │   ├── socket.js           # Socket.io লজিক
// │── frontend/               # Next.js অ্যাপ
// │   ├── pages/
// │   │   ├── index.js        # হোমপেজ
// │   │   ├── chat.js         # চ্যাট পেজ
// │   ├── components/
// │   │   ├── ChatBox.js      # চ্যাট ইন্টারফেস
// │   │   ├── Message.js      # আলাদা মেসেজ কম্পোনেন্ট
// │   ├── context/
// │   │   ├── SocketContext.js # Context API দিয়ে সোকেট ম্যানেজমেন্ট
// │── package.json            # ডিপেন্ডেন্সি ফাইল
// │── README.md               # ডকুমেন্টেশন
