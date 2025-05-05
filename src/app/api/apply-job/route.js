// import { NextResponse } from "next/server";
// import { collection, getCollection } from "@/lib/mongodb";
// import { ObjectId } from "mongodb";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("apply button clicked");
//     const { candidateId, jobId, candidateName, postedBy, title } = body;

//     const appliedCollection = await getCollection(collection.appliedCollection);
//     const jobsCollection = await getCollection(collection.jobsCollection);
//     const findJob = await jobsCollection.findOne({ _id: new ObjectId(jobId) });
//     const exist = await appliedCollection.findOne({ jobId: jobId });
//     if (exist?.candidateId === candidateId) {
//       return NextResponse.json(
//         { message: "You have already applied for this job" },
//         { status: 400 }
//       );
//     } else {
//       const result = await appliedCollection.insertOne(body);
//       await jobsCollection.updateOne(
//         { _id: new ObjectId(jobId) },
//         {
//           $set: {
//             "meta.appliedCount": parseInt(findJob.meta.appliedCount) + 1,
//           },
//         },
//         {
//           upsert: true,
//         }
//       );
//       console.log(" job post result", result);

//       return NextResponse.json(
//         { message: "Application submitted successfully" },
//         { status: 200 },
//         { insertedId: result.insertedId }
//       );
//     }
//   } catch (err) {
//     console.error("❌ Apply error:", err);
//     return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import { collection, getCollection } from "@/lib/mongodb";
// import { ObjectId } from "mongodb";
// import axios from "axios"; // Make sure you import axios

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("apply button clicked");

//     const { candidateId, jobId, candidateName, postedBy, title } = body;

//     const appliedCollection = await getCollection(collection.appliedCollection);
//     const jobsCollection = await getCollection(collection.jobsCollection);

//     const findJob = await jobsCollection.findOne({ _id: new ObjectId(jobId) });

//     const exist = await appliedCollection.findOne({ jobId: jobId });

//     if (exist?.candidateId === candidateId) {
//       return NextResponse.json(
//         { message: "You have already applied for this job" },
//         { status: 400 }
//       );
//     } else {
//       const result = await appliedCollection.insertOne(body);

//       await jobsCollection.updateOne(
//         { _id: new ObjectId(jobId) },
//         {
//           $set: {
//             "meta.appliedCount": parseInt(findJob.meta.appliedCount) + 1,
//           },
//         },
//         {
//           upsert: true,
//         }
//       );

//       console.log("job post result", result);

//       // ✅ Await the axios call properly
//       await axios.post("http://localhost:3002/api/emit-employer", {
//         jobId,
//         title,
//         applicantName: candidateName,
//         employer: postedBy,
//       });

//       // ✅ Return success response
//       return NextResponse.json(
//         {
//           message: "Application submitted successfully",
//           insertedId: result.insertedId,
//         },
//         { status: 200 }
//       );
//     }
//   } catch (err) {
//     console.error("❌ Apply error:", err);
//     return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { collection, getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("🟡 apply button clicked with body:", body);

    const { candidateId, jobId, candidateName, postedBy, title } = body;

    const appliedCollection = await getCollection(collection.appliedCollection);
    const jobsCollection = await getCollection(collection.jobsCollection);

    // Insert the application directly (without checking again)
    const result = await appliedCollection.insertOne(body);
    console.log("✅ Application inserted:", result);

    // Safely update appliedCount
    const findJob = await jobsCollection.findOne({ _id: new ObjectId(jobId) });
    const currentCount = parseInt(findJob?.meta?.appliedCount || 0);

    await jobsCollection.updateOne(
      { _id: new ObjectId(jobId) },
      {
        $set: {
          "meta.appliedCount": currentCount + 1,
        },
      },
      { upsert: true }
    );
    console.log(`🟢 Updated appliedCount to: ${currentCount + 1}`);

    // Emit notification via Express backend
    console.log("📡 Sending application notification to Express server...");

    console.log("📤 Sending to Express backend:", {
      jobId,
      title,
      applicantName: candidateName,
      employer: postedBy,
    });

    const response = await axios.post("http://localhost:3002/api/emit-apply", {
      jobId,
      title,
      applicantName: candidateName,
      employer: postedBy,
    });

    console.log("✅ Notification sent successfully:", response.data);

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        insertedId: result.insertedId,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Apply error:", err);
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}
