import Prompt from "@/models/prompt.model";
import { connectDB } from "@/utils/database";

export const POST = async (req: any) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectDB();
    const newPrompt = new Prompt({
      prompt,
      tag,
      creator: userId,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create prompt" }), {
      status: 500,
    });
  }
};
