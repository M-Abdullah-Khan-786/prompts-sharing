"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";

interface Prompt {
  _id: string;
  prompt: string;
  tag: string;
}

const page = () => {
  const [prompts, setPrompts] = useState([]);

  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = async (prompt: Prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt: Prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });
        const filterPrompts = prompts.filter((p: any) => p._id !== prompt._id);
        setPrompts(filterPrompts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPrompts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(session?.user.id){
        fetchPosts();
    }
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profie page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default page;
