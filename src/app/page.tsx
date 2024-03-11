"use client";

import useToken from "@/hooks/useToken";
import PostInfiniteScroll from "@/components/PostInfiniteScroll";

const Page = () => {
  const token = useToken();

  return (
    <div className="mx-20">
      <PostInfiniteScroll token={token} />
    </div>
  );
};

export default Page;
