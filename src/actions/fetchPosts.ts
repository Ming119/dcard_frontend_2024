import { Post } from '@/types/Post';
import { Octokit } from '@octokit/rest';

export const fetchPosts = async (
  token: string,
  page: number,
  per_page: number,
) => {
  const octokit = new Octokit({auth: token});

  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;

  const response = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    per_page,
    page,
  });
  return response.data.map((issue: any) => {
    const { number, title, body, comments, labels, created_at, user} = issue;
    let short_body = body.split(' ').filter((word: string) => word !== '')
                            .slice(0, 16).join(' ');
    if (body.length > short_body.length) {
      short_body += '...';
    }
    const createdAt = created_at.replace('T', ' ').replace('Z', '');
    return {
      number,
      title,
      body: short_body,
      comments,
      labels,
      createdAt,
      user: {
        id: user.id,
        username: user.login,
        avatar_url: user.avatar_url,
      }
    } as Post;
  });
};

export default fetchPosts;
