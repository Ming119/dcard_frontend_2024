'use client';

import { useEffect, useState } from 'react';
import useToken from '@/hooks/useToken';
import fetchPost from '@/actions/fetchPost';
import Post from '@/types/Post';

export const PostPage = ({
  params,
}: {
  params: { id: string; };
}) => {
  const token = useToken();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const postInit = async () => {
      const id = parseInt(params.id);
      const post = await fetchPost(token, id);
      setPost(post);
    }
    postInit();
  }, []);

  return (
    <div>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <p>{post.createdAt}</p>
          <p>{post.user.username}</p>
        </div>
      )}
    </div>
  );
};

export default PostPage;
