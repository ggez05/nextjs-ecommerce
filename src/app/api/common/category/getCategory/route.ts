import connectDB from "@/DB/connectDB";
import Category from "@/model/Category";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectDB();
  try {
    const getData = await Category.find({});
    if (getData) {
      return NextResponse.json({ success: true, data: getData });
    } else {
      return NextResponse.json({
        status: 204,
        success: false,
        message: "No categories found.",
      });
    }
  } catch (error) {
    console.log("Error in getting all categories:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
