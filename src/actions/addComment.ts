"use server";

import { Octokit } from "@octokit/rest";
import { revalidateTag } from "next/cache";

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
    if (response.status !== 201) throw new Error("Failed to add comment");
  } catch (error) {
    console.error("Error adding comment", error);
  } finally {
    revalidateTag(`/post/${postId}`);
  }
};

export default addComment;
