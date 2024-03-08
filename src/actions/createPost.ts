import { Octokit } from "@octokit/rest";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData) => {
  const token = formData.get('accessToken') as string;
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const octokit = new Octokit({ auth: token });

  try {
    // TODO: create issue on GitHub
    const response = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
    });
    if (response.status === 201) {
      redirect('/');
    } else {
      return { message: 'Post not created' };
    }
  } catch (e) {
    console.error(e);
    return { message: e };
  }
};

export default createPost;
