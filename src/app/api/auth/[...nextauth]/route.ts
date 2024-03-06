import NextAuth from "next-auth/next";
import { options } from "./options";

const hander = NextAuth(options)

export { hander as GET, hander as POST }
