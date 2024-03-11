import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import { fetchPosts } from "@/actions/fetchPosts";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard";
import Loading from "./Loading";

export const InfiniteScroll = ({ token }: { token: string }) => {
  const per_page: number = 10;
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMorePosts = async () => {
    const newPosts = await fetchPosts(token, page, per_page);
    setPosts((prev) => [...prev, ...newPosts]);
    setPage((prev) => prev + 1);
    if (newPosts.length < per_page) setHasMore(false);
  };

  useEffect(() => {
    if (hasMore && inView) loadMorePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div>
      {posts.map((post: Post) => (
        <PostCard key={post.number} post={post} />
      ))}

      {hasMore ? (
        <div ref={ref} className="text-center my-3">
          <Loading />
        </div>
      ) : (
        <p className="text-center text-gray-500 font-bold my-3">
          No more posts
        </p>
      )}
    </div>
  );
};

export default InfiniteScroll;
