"use server";

import { Octokit } from "@octokit/rest";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData) => {
  const token = formData.get("accessToken") as string;
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const octokit = new Octokit({ auth: token });

  // TODO: add pop-up for error handling
  try {
    const response = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
    });

    if (response.status !== 201) throw new Error("Failed to create post");

    revalidateTag("/");
  } catch (e) {
    console.error(e);
  } finally {
    redirect("/");
  }
};

export default createPost;
