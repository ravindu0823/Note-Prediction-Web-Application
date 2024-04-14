import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { username, password } = await req.json();

  try {
    await connectToDB();

    const loggedAdmin = await Admin.findOne({ userName: username });

    if (!loggedAdmin)
      return NextResponse.json({ error: "Admin not found", status: 404 });

    if (!loggedAdmin.validPassword(password, loggedAdmin.password))
      return NextResponse.json({ error: "Incorrect password", status: 401 });

    const token = jwt.sign(
      {
        adminId: loggedAdmin._id,
        adminName: loggedAdmin.fullName,
        adminEmail: loggedAdmin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    cookies().set("token", token, { httpOnly: true });

    console.log("Logged in successfully");

    return NextResponse.json({
      message: "Logged in successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred", status: 500 });
  }
};
