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

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const { prompt, tag } = await req.json();
  try {
    await connectDB();
    const { id } = await params;
    const findPrompt = await Prompt.findById(id);
    if (!findPrompt) {
      return new Response("Prompt not Found", { status: 404 });
    }

    findPrompt.prompt = prompt;
    findPrompt.tag = tag;

    await findPrompt.save();

    return new Response(JSON.stringify(findPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update prompt" }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    await connectDB();
    const { id } = await params;
    const findPrompt = await Prompt.findById(id);
    if (!findPrompt) {
      return new Response("Prompt not Found", { status: 404 });
    }

    await Prompt.findByIdAndDelete(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update prompt" }), {
      status: 500,
    });
  }
};
