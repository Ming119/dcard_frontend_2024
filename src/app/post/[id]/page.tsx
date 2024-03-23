"use client";

import Link from "next/link";
import Image from "next/image";
import Post from "@/types/Post";
import { toast } from "react-toastify";
import useToken from "@/hooks/useToken";
import fetchPost from "@/actions/fetchPost";
import { useSession } from "next-auth/react";
import addComment from "@/actions/addComment";
import deletePost from "@/actions/deletePost";
import { useEffect, useRef, useState } from "react";
import CommentInfiniteScroll from "@/components/CommentInfiniteScroll";
import { remark } from "remark";
import html from "remark-html";

export const PostPage = ({ params }: { params: { id: string } }) => {
  const session = useSession();
  const token = useToken();
  const [post, setPost] = useState<Post | null>(null);
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [hasNewComment, setHasNewComment] = useState<boolean>(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const postInit = async () => {
      const id = parseInt(params.id);
      const post = await fetchPost(token, id);
      const content = (await remark().use(html).process(post.body)).toString();
      post.body = content;
      setPost(post);
      setCommentsCount(post.comments);
    };
    postInit();
  }, []);

  const deletePostHandler = async () => {
    const id = parseInt(params.id);
    const response = await deletePost(token, id);
    if (response.status === "success") {
      toast.success(response.message as string);
      window.location.href = "/";
      return;
    }
    toast.error(response.message as string);
  };

  const addCommentHandler = async () => {
    if (!commentRef.current) return;
    const comment = commentRef.current.value;
    if (comment === "") return;

    const id = parseInt(params.id);
    const response = await addComment(token, id, comment);
    if (response.status === "error") {
      toast.error(response.message as string);
      return;
    }
    toast.success(response.message as string);
    commentRef.current.value = "";
    setHasNewComment(true);
    setCommentsCount((prev) => prev + 1);
  };

  return (
    <>
      {post && (
        <div className="mt-5 mb-24 mx-24">
          <div className="flex items-center justify-between">
            <p className="text-4xl font-bold">{post.title}</p>
            {post.user.id === parseInt(session.data?.user?.id!) && (
              <div>
                <Link href={`/post/${params.id}/edit`}>
                  <button className="bg-blue-500 text-white rounded-l-md p-3">
                    Edit Post
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white rounded-r-md p-3"
                  onClick={deletePostHandler}
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
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
          <p
            className="my-3"
            dangerouslySetInnerHTML={{ __html: post.body }}
          ></p>

          <div className="flex my-3 gap-x-3 text-gray-500 text-sm">
            {commentsCount} comments
            {post.labels.map((label) => (
              <span key={label.name}>#{label.name}</span>
            ))}
          </div>

          <hr className="my-3" />

          <div>
            <p className="text-2xl font-bold">Comments</p>
            <CommentInfiniteScroll
              token={token}
              postNumber={post.number}
              hasNewComment={hasNewComment}
              setHasNewComment={setHasNewComment}
            />
          </div>
          {token && (
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
          )}
        </div>
      )}
    </>
  );
};

export default PostPage;
