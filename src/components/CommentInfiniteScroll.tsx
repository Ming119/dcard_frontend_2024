import Loading from "./Loading";
import Comment from "@/types/Comment";
import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import fetchPostComments from "@/actions/fetchPostComments";

export const CommentInfiniteScroll = ({
  token,
  postNumber,
  hasNewComment,
  setHasNewComment,
}: {
  token: string;
  postNumber: number;
  hasNewComment: boolean;
  setHasNewComment: (hasNewComment: boolean) => void;
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
    // FIXME: sometimes it doesn't load the least comments after adding a new comment
    // Figure out that the GitHub rest API doesn't update the comments immediately
    // Maybe it's a caching issue
    if (hasMore && inView) loadMoreComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    if (hasNewComment) {
      setComments([]);
      setPage(1);
      setHasMore(true);
      setHasNewComment(false);
    }
  }, [hasNewComment]);

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
