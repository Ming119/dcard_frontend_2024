import Post from "@/types/Post";
import { Octokit } from "@octokit/rest";

export const fetchPost = async (token: string, issue_number: number) => {
  const octokit = new Octokit({ auth: token });

  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const response = await octokit.rest.issues.get({
    owner,
    repo,
    issue_number,
  });

  const { number, title, body, comments, labels, created_at, user } =
    response.data;
  const createdAt = new Date(created_at).toLocaleString();
  return {
    number,
    title,
    body,
    comments,
    labels,
    createdAt,
    user: {
      id: user?.id,
      username: user?.login,
      avatar_url: user?.avatar_url,
    },
  } as Post;
};

export default fetchPost;
