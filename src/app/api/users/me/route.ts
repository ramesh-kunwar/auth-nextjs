// import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    console.log("hello");
    // const userId = await getDataFromToken(request);
    // const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User Find",
      //   data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
