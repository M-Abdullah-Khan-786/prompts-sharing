import Prompt from "@/models/prompt.model";
import { connectDB } from "@/utils/database";
import { NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    await connectDB();
    const { id } = await params;
    const prompt = await Prompt.findById(id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
