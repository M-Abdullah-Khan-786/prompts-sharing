import Prompt from "@/models/prompt.model";
import { connectDB } from "@/utils/database";

export const GET = async (req: any) => {
  try {
    await connectDB();
    const prompt = await Prompt.find({}).populate('creator')
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get prompt" }), {
      status: 500,
    });
  }
};
