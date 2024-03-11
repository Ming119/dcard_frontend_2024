import { Post } from "@/types/Post";
import Image from "next/image";
import Link from "next/link";

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/post/${post.number}`}>
      <div className="bg-gray-100 p-4 my-4 rounded rounded-lg">
        <div className="flex items-center gap-x-2 mb-1">
          <Image
            priority={true} // LCP optimization
            src={post.user.avatar_url}
            alt={`Profile Picture for ${post.user.username}`}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p>{post.user.username}</p>
          <p className="mx-2 text-gray-500 text-sm">{post.createdAt}</p>
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p>{post.body}</p>
        <div className="flex gap-x-2 text-gray-500 text-sm">
          <p className="mr-2">{post.comments} comments</p>
          {post.labels.map((label, index) => (
            <span key={index}>#{label.name}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
