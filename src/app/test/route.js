// Create a test route to check connection
export async function GET() {
  try {
    const col = await dbConnect(collections.user_collection);
    const count = await col.countDocuments();
    return new Response(`Connection successful! Users count: ${count}`);
  } catch (error) {
    return new Response(`Connection failed: ${error.message}`, { status: 500 });
  }
}
