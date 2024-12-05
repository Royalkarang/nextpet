// /src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),

    FacebookProvider({
      clientId: "",
      clientSecret: "",
    }),

    AppleProvider({
      clientId: "",
      clientSecret: "",
      teamId: "",
      keyId: "",
      privateKey: ""
    }),
  ],

  secret: "",

  pages: {
    signIn: '/user/sign-in', // Custom sign-in page URL
  },

  callbacks: {
    async redirect({ url, baseUrl }) {

      console.log(url)
      return baseUrl + '/protected'; // You can change '/protected' to any page you want
    },
  },

  session: {
    strategy: "jwt", // Use JWT for session handling
  },

  jwt: {
    secret: "", // You can configure JWT settings if needed
  },
};

// Initialize and export NextAuth with the above configuration
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests (required for Next.js API route handling)
export { handler as GET, handler as POST };
