import { collection, getCollection } from "@/lib/mongodb";

export const POST = async (req) => {
  try {
    const apply_jobCollection = await getCollection(
      collection.appliedCollection
    );
    const data = await req.json();

    const {
      name,
      email,
      resume,
      coverLetter,
      jobId,
      jobTitle,
      companyName,
      location,
      jobType,
      posted,
      deadline,
      description,
      skills,
      requirements,
    } = data;

    // const appliedJobs = await apply_jobCollection.find({ jobId: jobId });
    // const isApplied = appliedJobs.some((job) => job)
    if (!name || !email || !resume || !jobId || !jobTitle) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const result = await apply_jobCollection.insertOne({
      name,
      email,
      resume,
      coverLetter,
      jobId,
      jobTitle,
      companyName,
      location,
      jobType,

      // salary,
      posted,
      deadline,
      description,
      skills,
      requirements,
      // contactInformation,
      appliedAt: new Date(),
      status: "Pending",
    });

    return new Response(
      JSON.stringify({
        message: "Job applied successfully",
        insertedId: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error applying for job:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
};
