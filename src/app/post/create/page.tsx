"use client";

import useToken from "@/hooks/useToken";
import { redirect } from "next/navigation";
import { CreatePostForm } from "@/components/CreatePostForm";

const CreatePost = () => {
  const token = useToken();

  if (!token) redirect("/sign-in");

  return (
    <div>
      <p className="text-center text-xl font-bold my-8">Create a new post</p>
      <CreatePostForm accessToken={token} />
    </div>
  );
};

export default CreatePost;
