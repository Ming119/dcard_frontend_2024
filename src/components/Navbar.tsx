'use client';

import Link from 'next/link';
import Image from 'next/image';

import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  
  return (
    <nav className="bg-indigo-600 p-4">
      <ul className="flex gap-x-4">
        <li>
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
        </li>
        {!session ? (
          <li>
            <button
              className = 'text-white hover:underline'
              onClick   = {() => signIn('github')}
              type      = 'button'
            >
              {/* add github icon here */}
              Login With GitHub
            </button>
          </li>
        ) : (
          <>
          <li>
            <Link href="/post/create" className="text-white hover:underline">
              Create Post
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-white hover:underline">
              <Image
                src       = {session?.user?.image!}
                alt       = {`Profile Picture for ${session?.user?.name!}`}
                width     = {24}
                height    = {24}
                className = "rounded-full"
              />
            </Link>
          </li>
          <li>
            <button
              className = 'text-white hover:underline'
              onClick   = {() => signOut({ callbackUrl: '/' })}
              type      = 'button'
            >
              Logout
            </button>
          </li>
          </>
        ) }
      </ul>
    </nav>
  )
};

export default Navbar;
