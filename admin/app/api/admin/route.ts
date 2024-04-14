import Admin from "@/models/admin";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDB();

    const admins = await Admin.find();

    if (!admins) {
      return NextResponse.json({ error: "No admins found", status: 404 });
    }

    return NextResponse.json({ admins, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred", status: 500 });
  }
};
