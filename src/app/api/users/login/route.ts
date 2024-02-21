import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: "User doesn't exist",
        status: 400,
      });
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!user || !validPassword) {
      return NextResponse.json({
        error: "Invalid credentials",
        status: 400,
      });
    }

    // create and assign a token
    const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    if (user && validPassword) {
      const response = NextResponse.json({
        message: "Login successful",
        status: 200,
        data: user,
        token,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return response;
    }
  } catch (error: any) {
    console.log("ERROR IN SIGNIN ROUTE: ", error);

    return NextResponse.json({ error: error.message, status: 500 });
  }
}
