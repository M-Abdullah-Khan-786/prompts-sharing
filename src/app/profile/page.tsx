"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@/components/Profile";

const page = () => {
  const [prompts, setPrompts] = useState([]);

  const { data: session } = useSession();

  const handleEdit = async () => {
    console.log("Edit");
  };

  const handleDelete = async () => {
    console.log("Delete");
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
