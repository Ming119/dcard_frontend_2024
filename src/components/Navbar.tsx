'use client';

import Link from 'next/link';
import Image from 'next/image';

import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  
  return (
    <nav className="container mx-auto py-4">
      <div className="flex justify-between">
        <div>
          <Link href="/" className="text-white">
            Daniel&apos;s Blog
          </Link>
        </div>
        
        {!session ? (
          <div>
            <button
              className = 'text-white hover:underline'
              onClick   = {() => signIn('github')}
              type      = 'button'
            >
              {/* add github icon here */}
              Login With GitHub
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-x-4'>
            <Link href="/post/create" className="text-white hover:underline">
              Create Post
            </Link>
            <Link href="/profile">
              <Image
                priority  = {true} // LCP optimization
                src       = {session?.user.image!}
                alt       = {`Profile Picture for ${session?.user.name!}`}
                width     = {24}
                height    = {24}
                className = "rounded-full"
              />
            </Link>
            <button
              className = 'text-white hover:underline'
              onClick   = {() => signOut({ callbackUrl: '/' })}
              type      = 'button'
            >
              Logout
            </button>
          </div>
        ) }
      </div>
    </nav>
  )
};

export default Navbar;
