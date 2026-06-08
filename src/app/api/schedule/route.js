import { collection, getCollection } from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import axios from "axios";

// POST — Create a new interview
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const employerEmail = session?.user?.email;

    if (!employerEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, dateTime, candidateName, candidateEmail, roomId } = body;

    if (!title || !dateTime || !candidateName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const interviewsCollection = await getCollection(collection.interviewsCollection);

    const autoRoomId =
      roomId ||
      (candidateEmail
        ? [employerEmail, candidateEmail].sort().join("_")
        : undefined);

    const newInterview = {
      title,
      dateTime,
      employerEmail,
      candidateName,
      candidateEmail: candidateEmail || null,
      roomId: autoRoomId || null,
      createdAt: new Date(),
    };

    const result = await interviewsCollection.insertOne(newInterview);
    const savedInterview = { ...newInterview, _id: result.insertedId };

    // Emit socket notifications to employer + candidate via Express backend
    if (process.env.NEXT_PUBLIC_EXPRESS_API_URL && candidateEmail) {
      axios
        .post(`${process.env.NEXT_PUBLIC_EXPRESS_API_URL}/api/emit-schedule`, {
          employerEmail,
          candidateEmail,
          interview: savedInterview,
        })
        .catch((err) => console.error("Schedule socket emit error:", err.message));
    }

    return NextResponse.json(
      { message: "Interview scheduled!", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET — Fetch interviews filtered by employer session or candidateEmail query param
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const candidateEmail = searchParams.get("candidateEmail");

    const interviewsCollection = await getCollection(collection.interviewsCollection);

    let query = {};
    if (candidateEmail) {
      query.candidateEmail = candidateEmail;
    } else if (session?.user?.email) {
      query.employerEmail = session.user.email;
    }

    const interviews = await interviewsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(interviews);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch interviews" }, { status: 500 });
  }
}

// PUT — Update an interview by ID
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required for update" }, { status: 400 });
    }

    const interviewsCollection = await getCollection(collection.interviewsCollection);
    const result = await interviewsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Interview not found or nothing to update" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Interview updated!" });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE — Delete an interview by ID
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required for deletion" }, { status: 400 });
    }

    const interviewsCollection = await getCollection(collection.interviewsCollection);
    const result = await interviewsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Interview deleted!" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
