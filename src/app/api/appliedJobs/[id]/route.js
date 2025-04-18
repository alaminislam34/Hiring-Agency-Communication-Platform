import dbConnect, { collection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  const { id } = context.params;

  console.log("🛑 ID from params:", id);

  try {
    const appliedCollection = dbConnect(collection.appliedCollection);
    const result = await appliedCollection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
