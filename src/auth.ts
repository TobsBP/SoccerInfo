import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        const email = credentials.email as string
        const user = await prisma.user.findUnique({
          where: { email },
        })
 
        if (!user || !user.password) {
          return null
        }
 
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )
 
        if (!isPasswordValid) {
          return null
        }
 
        return user
      }
    })
  ],
})