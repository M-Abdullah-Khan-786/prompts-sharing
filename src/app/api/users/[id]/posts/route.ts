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
    const prompt = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get prompt" }), {
      status: 500,
    });
  }
};
