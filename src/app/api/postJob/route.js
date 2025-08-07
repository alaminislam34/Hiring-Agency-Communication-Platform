// import { collection, getCollection } from "@/lib/mongodb";
// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt"; // Import JWT token utility

// export const POST = async (req) => {
//   try {
//     // 1. JWT token theke role check korbo
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//     // 2. Token na thakle ba role na thakle error response
//     if (!token || token.role !== "employer") {
//       return NextResponse.json(
//         { message: "You must be an employer to post a job" },
//         { status: 403 }
//       );
//     }

//     // 3. Request body check
//     const data = await req.json();
//     if (!data) {
//       return NextResponse.json({ message: "Invalid data" }, { status: 400 });
//     }

//     // 4. Jobs collection a data insert kora
//     const jobsCollection = await getCollection(collection.jobsCollection);
//     const result = await jobsCollection.insertOne(data);

//     // 5. Success response
//     return NextResponse.json(
//       { message: "Job posted successfully", jobId: result.insertedId },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Job post error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// };

import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export const POST = async (req) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== "employer") {
      return NextResponse.json(
        { message: "You must be an employer to post a job" },
        { status: 403 }
      );
    }

    const data = await req.json();
    if (!data) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const jobsCollection = await getCollection(collection.jobsCollection);
    const result = await jobsCollection.insertOne(data);

    await axios.post("http://localhost:3002/api/emit-job-post", {
      title: data.title,
      industry: data.industry,
    });

    return NextResponse.json(
      { message: "Job posted successfully", jobId: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Job post error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
