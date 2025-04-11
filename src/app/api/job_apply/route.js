import dbConnect, { collection } from "@/lib/dbConnect";

export const POST = async (req) => {
  try {
    // Connect to the database collection
    const apply_jobCollection = dbConnect(collection.appliedCollection);

    // Get data from request body
    const data = await req.json();

    if (!data) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    // Insert data into the collection
    const result = await apply_jobCollection.insertOne(data);

    return new Response(
      JSON.stringify({
        message: "Job applied successfully",
        insertedId: result.insertedId,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error applying for job:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
};
