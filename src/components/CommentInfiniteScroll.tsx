import Loading from "./Loading";
import Comment from "@/types/Comment";
import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import fetchPostComments from "@/actions/fetchPostComments";

export const CommentInfiniteScroll = ({
  token,
  postNumber,
}: {
  token: string;
  postNumber: number;
}) => {
  const per_page: number = 10;
  const [page, setPage] = useState<number>(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreComments = async () => {
    const newComments = await fetchPostComments(
      token,
      postNumber,
      page,
      per_page
    );
    setComments((prev) => [...prev, ...newComments]);
    setPage((prev) => prev + 1);
    if (newComments.length < per_page) setHasMore(false);
  };

  useEffect(() => {
    if (hasMore && inView) loadMoreComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="m-4">
      {comments.map((comment: Comment) => (
        <div key={comment.id}>
          <CommentCard comment={comment} />
          <hr />
        </div>
      ))}

      {hasMore ? (
        <div ref={ref} className="text-center my-3">
          <Loading />
        </div>
      ) : (
        <p className="text-center text-gray-500 font-bold my-3">
          No more comments
        </p>
      )}
    </div>
  );
};

export default CommentInfiniteScroll;
