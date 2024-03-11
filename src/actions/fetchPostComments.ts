import { Octokit } from "@octokit/rest";

export const fetchPostComments = async (
  token: string,
  issue_number: number,
  page: number,
  per_page: number
) => {
  const octokit = new Octokit({ auth: token });

  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;

  const respone = await octokit.rest.issues.listComments({
    owner,
    repo,
    issue_number,
    page,
    per_page,
  });

  return respone.data.map((comment: any) => {
    const { id, body, created_at, user } = comment;
    const createdAt = new Date(created_at).toLocaleString();
    return {
      id,
      body,
      createdAt,
      user: {
        id: user?.id,
        username: user?.login,
        avatar_url: user?.avatar_url,
      },
    };
  });
};

export default fetchPostComments;
