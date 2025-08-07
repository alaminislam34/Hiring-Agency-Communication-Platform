export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { message: "Username query parameter is required" },
        { status: 400 }
      );
    }

    const usersCollection = await getCollection(collection.user_collection);
    const user = await usersCollection.findOne({ username });

    return NextResponse.json({ available: !user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
