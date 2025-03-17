import { db } from "../../../configs/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { STUDY_MATERIAL_TABLE } from "../../../configs/schema";

export async function POST(req) {
  try {
    // Parse the request body
    const { createdBy, id } = await req.json();

    // Validate the request payload
    if (!createdBy) {
      return NextResponse.json(
        { message: "createdBy field is required" },
        { status: 400 }
      );
    }

    // Log input for debugging
    console.log("Fetching study materials for:", createdBy);

    // Query the database
    const result = await db
      //Select worksheetLayout
      .select({
        worksheetLayout: STUDY_MATERIAL_TABLE.worksheetLayout,
      })
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
      .where(eq(STUDY_MATERIAL_TABLE.worksheetId, id));
    // Check if results are empty
    if (!result || result.length === 0) {
      return NextResponse.json(
        { message: "No WorkSheet  found for this user" },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error during query execution:", error);
    return NextResponse.json(
      { message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}
