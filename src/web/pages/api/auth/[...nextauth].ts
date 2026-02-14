import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Opciones de configuración de autenticación
export const authOptions: NextAuthOptions = {
  // Activamos los web tokens
  session: {
    strategy: "jwt",
  },

  // Configuración de proveedores de autenticación
  providers: [
    // Proveedor de Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any, req) {
        try {
          // Realizamos una petición POST a una API externa con los datos de teléfono y token
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const { user, jwt } = res.data;

          return {
            id: user.id,
            email: user.email,
            name: user.username,
            jwt,
          };
        } catch (error) {
          console.error(error.response.data);
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user?.jwt;
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token, user }: any) {
      session.token = token.accessToken;
      session.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
    signOut: "/admin/login",
  },
};

export default NextAuth(authOptions);
