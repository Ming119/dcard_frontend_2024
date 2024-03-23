"use server";

import { Octokit } from "@octokit/rest";
import { revalidatePath } from "next/cache";

export const editPost = async (formData: FormData) => {
  const token = formData.get("accessToken") as string;
  const issue_number = parseInt(formData.get("id") as string);
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  const octokit = new Octokit({ auth: token });
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;

  try {
    const response = await octokit.rest.issues.update({
      owner,
      repo,
      issue_number,
      title,
      body,
    });
    if (response.status !== 200)
      throw new Error("Failed to edit post. Please try again later.");

    revalidatePath("/");
    return { status: "success", message: "Post edited" };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message: e,
    };
  }
};

export default editPost;
