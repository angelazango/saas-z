import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, location, type, description } = await request.json();

    // validate input
    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const warehouse = { title, location, type, description };
    console.log(warehouse);

    return NextResponse.json(warehouse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a warehouse",
      },
      {
        status: 500,
      }
    );
  }
}
