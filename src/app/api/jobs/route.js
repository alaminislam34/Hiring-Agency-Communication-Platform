// /app/api/jobs/route.js (or wherever your API endpoint is defined)

import dbConnect, { collection } from "@/lib/dbConnect";

export const GET = async (req) => {
  const { search, location, experienceLevel, page = 1, limit = 10 } = req.query;
  const jobsCollection = dbConnect(collection.jobsCollection);

  // Define search filters
  const searchFilter = search
    ? {
        $or: [
          { jobTitle: { $regex: search, $options: "i" } },
          { companyName: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const locationFilter = location
    ? { location: { $regex: location, $options: "i" } }
    : {};
  const experienceLevelFilter = experienceLevel
    ? { experienceLevel: { $regex: experienceLevel, $options: "i" } }
    : {};

  const filters = {
    ...searchFilter,
    ...locationFilter,
    ...experienceLevelFilter,
  };

  try {
    const jobs = await jobsCollection
      .find(filters)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .toArray();

    const totalJobs = await jobsCollection.countDocuments(filters);

    return new Response(JSON.stringify({ jobs, totalJobs }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
