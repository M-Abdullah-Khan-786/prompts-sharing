"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const fetchPromptData = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptID}`);
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPromptData();
  }, [promptID]);

  const handleUpdatePost = async (e: any) => {
    e.preventDefault();
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      setSubmitting={setSubmitting}
      handleSubmit={handleUpdatePost}
    />
  );
};

export default page;
