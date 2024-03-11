import Comment from "@/types/Comment";
import Image from "next/image";

export const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <div className="my-2">
      <div className="flex items-center gap-x-2 my-1">
        <Image
          src={comment.user.avatar_url}
          alt="avatar"
          width={16}
          height={16}
          className="rounded-full"
        />
        <p>{comment.user.username}</p>
        <p className="text-gray-500 text-sm">{comment.createdAt}</p>
      </div>
      <p className="mx-4">{comment.body}</p>
    </div>
  );
};

export default CommentCard;
