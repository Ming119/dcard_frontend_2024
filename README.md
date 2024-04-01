# DCard 2024 Frontend Intern Homework

This project is built with Next.js, TypeScript, and Tailwind CSS.
You can view the live demo [here](http://danielblog.ddns.net).

## Development Environment

- OS: Ubuntu 20.04.6 LTS
- Programming Language: TypeScript
- Package Manager: npm 10.4.0
- Node.js: 21.0.0
  Note that there is no guarantee that the project will work on other operating systems or compilers.

## Project Structure

All of the source code is located in the `src` directory. The `src` directory contains the following subdirectories and files:

- `actions`: Redux actions
  - `addComment.ts`: Add a new comment to a post
  - `createPost.ts`: Create a new post
  - `deletePost.ts`: Delete a post by issue number
  - `editPost.ts`: Edit a post by issue number
  - `fetchPost.ts`: Fetch a post by issue number
  - `fetchPostComments.ts`: Fetch all comments of a post by issue number, limited to 10 comments per page
  - `fetchPosts.ts`: Fetch all posts, limited to 10 posts per page
- `app`: Next.js app
  - `api/auth/[...nextauth]`: next-auth API routes
  - `layouts.tsx`: Root layout
  - `page.tsx`: Main page
  - `providers.tsx`: next-auth session provider
  - `styles.css`: Global styles
- `components`: React components
  - `CommentCard.tsx`: Comment
  - `CommentInfiniteScroll.tsx`: Infinite scroll for all comments
  - `CreatePostForm.tsx`: Create a new post form
  - `Loading.tsx`: Loading spinner for fetching data
  - `Navbar.tsx`: The navigation bar of the app
  - `PostCard.tsx`: Post
  - `PostInfiniteScroll.tsx`: Infinite scroll for all posts
- `hooks`: Custom hooks
  - `useToken.ts`: Get the access token from the session
- `types`: TypeScript types
  - `Comment.ts`: Define the type of a comment
  - `next-auth.ts`: Override the default next-auth `Session` types
  - `Post.ts`: Define the type of a post
  - `User.ts`: Define the type of a user

## Packages / Dependencies

- `@octokit/rest`: GitHub REST API client
- `next-auth`: Authentication for Next.js
- `react-intersection-observer`: Intersection Observer API for React
- `react-toastify`: Toast notifications for React
- `remark`: Markdown processor

## Local Environment Setup

Before you start the project, you have to [create a OAuth App on GitHub](https://github.com/settings/applications/new) with the following settings:

- Homepage URL: `http://localhost:3000` (or your deployment URL)
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github` (or your deployment URL)

and get the `Client ID` and `Client secrets`. Then, create a `.env.local` file in the root directory and fill in the following information:

```bash
# ./.env.local

GITHUB_CLIENT_ID=`your_client_id`
GITHUB_CLIENT_SECRET=`your_client_secret`
```

Also, you have to create a secret key for NextAuth.js. You can generate a secret key by running the following command:

```bash
$ openssl rand -base64 32
```

Then fill in the secret key in the `.env.local` file like this

```bash
# ./.env.local

NEXTAUTH_URL="http://localhost:3000" # or your deployment URL
NEXTAUTH_SECRET=`your_secret_key`
```

Moreover, you need to indicate which GitHub repository you want to fetch issues from. You can fill in the repository owner and repository name in the `.env.local` file as follows:

```bash
# ./.env.local

GITHUB_OWNER=`your_repository_owner`
GITHUB_REPO=`your_repository_name`

# or you are feel free to use mine :)
# GITHUB_OWNER="Ming119"
# GITHUB_REPO="dcard_frontend_2024"
```

Now your `.env.local` file should look like this:

```bash
# ./.env.local

GITHUB_CLIENT_ID=`your_client_id`
GITHUB_CLIENT_SECRET=`your_client_secret`

NEXTAUTH_URL="http://localhost:3000" # or your deployment URL
NEXTAUTH_SECRET=`your_secret_key`

GITHUB_OWNER=`your_repository_owner`
GITHUB_REPO=`your_repository_name`

# or you are feel free to use mine :)
# GITHUB_OWNER="Ming119"
# GITHUB_REPO="dcard_frontend_2024"
```

Your local environment is ready to go now!

## Installation

First, you need to install the dependencies by running the following command:

```bash
npm install
```

## Running the Project

You can run the project by running the following command:

```bash
npm run dev
```

Now you can view the app by opening [http://localhost:3000](http://localhost:3000) in your browser.

## Known Issues

- Posts or comments may not up to date due after actions (e.g., create, edit, delete) due to the GitHub API cache.
- The `next-auth` requires a server runtime, so it cannot be deployed to static hosting like Google Firebase Hosting.
