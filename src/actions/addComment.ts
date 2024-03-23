"use server";

import { Octokit } from "@octokit/rest";
import { revalidatePath } from "next/cache";

export const addComment = async (
  token: string,
  postId: number,
  comment: string
) => {
  const octokit = new Octokit({ auth: token });
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;

  try {
    const response = await octokit.issues.createComment({
      owner,
      repo,
      issue_number: postId,
      body: comment,
    });
    if (response.status !== 201)
      throw new Error("Failed to add comment. Please try again.");
    revalidatePath(`/post/${postId}`);
    return { status: "success", message: "Comment added." };
  } catch (error) {
    console.error("Error adding comment", error);
    return { status: "error", message: error };
  }
};

export default addComment;
