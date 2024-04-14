import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDB();

    const users = await User.find();

    if (users.length == 0) {
      return NextResponse.json({ error: "No admins found", status: 404 });
    }

    return NextResponse.json(users, { status: 200, statusText: "OK" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred", status: 500 });
  }
};
