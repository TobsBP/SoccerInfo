import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const authConfig = {
  pages: {
    signIn: '/sign-in',
    newUser: '/register',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthRoute = nextUrl.pathname.startsWith('/sign-in') || nextUrl.pathname.startsWith('/register')
      const isPublicRoute = isAuthRoute || nextUrl.pathname.startsWith('/api/auth') || nextUrl.pathname.startsWith('/_next') || nextUrl.pathname.includes('favicon.ico')

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl))
        }
        return true
      }

      if (!isLoggedIn && !isPublicRoute) {
        return false // Redirect to login for all other routes
      }
      
      return true
    },
  },
  providers: [
    Google, 
    Credentials({
        async authorize(credentials) {
            return null; // Logic in auth.ts to avoid Edge issues
        }
    })
  ], 
} satisfies NextAuthConfig