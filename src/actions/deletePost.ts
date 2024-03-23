"use server";

import { Octokit } from "@octokit/rest";
import { revalidatePath } from "next/cache";

export const deletePost = async (token: string, postNumber: number) => {
  const octokit = new Octokit({ auth: token });
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  try {
    const response = await octokit.rest.issues.update({
      owner,
      repo,
      issue_number: postNumber,
      state: "closed",
    });
    if (response.status !== 200)
      throw new Error("Failed to delete post. Please try again later.");

    revalidatePath("/");
    return { status: "success", message: "Post deleted" };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message: e,
    };
  }
};

export default deletePost;
