import { connect } from "@/dbConfig/dbConfig";

import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        error: "User already exists",
        status: 400,
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
      data: newUser,
    });
  } catch (error: any) {
    console.log("ERROR IN SIGNUP ROUTE: ", error);

    return NextResponse.json({ error: error.message, status: 500 });
  }
}
