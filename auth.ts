import NextAuth from "next-auth"
import Twitter from "next-auth/providers/twitter"

declare module "next-auth" {
  interface Session {
    username?: string
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      id: "twitter",
      name: "Twitter",
      
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.username = profile.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.username = token.username as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/"
  }
})