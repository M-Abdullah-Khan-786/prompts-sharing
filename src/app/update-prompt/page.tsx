"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptID = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const fetchPromptData = async () => {
        try {
            const response = await fetch(`/api/prompt/${promptID}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
              });
              
        } catch (error) {
            console.error(error)
        }
    }
    fetchPromptData();
  }, [promptID])
  

  const handleUpdatePost = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    if(!promptID) return alert("Prompt ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
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
