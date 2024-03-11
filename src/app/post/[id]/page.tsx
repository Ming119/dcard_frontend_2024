"use client";

import Image from "next/image";
import Post from "@/types/Post";
import useToken from "@/hooks/useToken";
import fetchPost from "@/actions/fetchPost";
import { useEffect, useRef, useState } from "react";
import CommentInfiniteScroll from "@/components/CommentInfiniteScroll";
import addComment from "@/actions/addComment";

export const PostPage = ({ params }: { params: { id: string } }) => {
  const token = useToken();
  const [post, setPost] = useState<Post | null>(null);
  const [hasNewComment, setHasNewComment] = useState<boolean>(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const postInit = async () => {
      const id = parseInt(params.id);
      const post = await fetchPost(token, id);
      setPost(post);
    };
    postInit();
  }, []);

  const addCommentHandler = async () => {
    if (!commentRef.current) return;
    const comment = commentRef.current.value;
    if (comment === "") return;

    const id = parseInt(params.id);
    const commentAdded = await addComment(token, id, comment);
    commentRef.current.value = "";
    setHasNewComment(true);
  };

  return (
    <>
      {post && (
        <div className="mt-5 mb-20 mx-24">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <div className="flex items-center gap-x-2 my-3 text-gray-500 text-sm">
            <Image
              priority={true}
              src={post.user.avatar_url}
              alt={`Profile Picture for ${post.user.username}`}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p>{post.user.username}</p>
            <p>{post.createdAt}</p>
          </div>
          <p className="my-3">{post.body}</p>

          <div className="flex my-3 gap-x-3 text-gray-500 text-sm">
            {post.comments} comments
            {post.labels.map((label) => (
              <span key={label.name}>#{label.name}</span>
            ))}
          </div>

          <hr className="my-3" />

          <div>
            <h2 className="text-2xl font-bold">Comments</h2>
            <CommentInfiniteScroll
              token={token}
              postNumber={post.number}
              hasNewComment={hasNewComment}
              setHasNewComment={setHasNewComment}
            />
          </div>

          <div className="grid grid-cols-12 fixed bottom-0">
            <textarea
              ref={commentRef}
              className="form-textarea rounded-md resize-none col-span-9"
              placeholder="Add a comment"
            />
            <button
              className="bg-blue-500 text-white rounded-md p-3"
              onClick={addCommentHandler}
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
