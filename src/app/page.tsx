'use client';

import { useSession } from 'next-auth/react';
import InfiniteScroll from '@/components/InfiniteScroll';

const Page = () => {
  const { data: session } = useSession();
  const token = session?.access_token || process.env.GITHUB_TOKEN!;

  return (
    <div>
      <InfiniteScroll token={token} />
    </div>
  );
}

export default Page;
