import dbConnect, { collection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// POST — Create a new interview
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, dateTime, interviewer, candidateName, roomId } = body;

    if (!title || !dateTime || !candidateName || !roomId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const interviewsCollection = dbConnect(collection.interviewsCollection);

    const newInterview = {
      title,
      dateTime,
      interviewer: interviewer || "Not specified",
      candidateName,
      roomId,
      createdAt: new Date(),
    };

    const result = await interviewsCollection.insertOne(newInterview);

    return new Response(
      JSON.stringify({
        message: "Interview scheduled!",
        id: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

// GET — Fetch all interviews
export async function GET() {
  try {
    const interviewsCollection = dbConnect(collection.interviewsCollection);
    const interviews = await interviewsCollection.find().toArray();

    return new Response(JSON.stringify(interviews), { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch interviews" }),
      {
        status: 500,
      }
    );
  }
}

// PUT — Update an interview by ID
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID is required for update" }),
        {
          status: 400,
        }
      );
    }

    const interviewsCollection = dbConnect(collection.interviewsCollection);

    const result = await interviewsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Interview not found or nothing to update" }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify({ message: "Interview updated!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

// DELETE — Delete an interview by ID
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID is required for deletion" }),
        {
          status: 400,
        }
      );
    }

    const interviewsCollection = dbConnect(collection.interviewsCollection);
    const result = await interviewsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Interview not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Interview deleted!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
