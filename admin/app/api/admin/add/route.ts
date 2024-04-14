import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { fullName, email, userName, password, confirmPassword } =
    await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json({ error: "Passwords do not match", status: 400 });
  }

  try {
    await connectToDB();

    const savedAdmin = new Admin({
      fullName,
      userName,
      email,
      password,
    });

    savedAdmin.password = savedAdmin.generateHash(password);

    await savedAdmin.save();

    if (!savedAdmin) NextResponse.json({ error: "Not found", status: 404 });

    return NextResponse.json({ message: "Admin created", status: 201, savedAdmin });

    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred", status: 500 });
  }
};
