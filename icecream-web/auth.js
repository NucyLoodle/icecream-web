import NextAuth from "next-auth"
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });


async function getUser(email) { //queries the db for a user with the given email
    try {
      const user = await sql`SELECT * FROM users WHERE email=${email}`;
      return user[0];
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw new Error("Failed to fetch user.");
    }
  }

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig, //NextAuth receives all key-value pairs from authConfig as if they were written directly inside the object.
  providers: [
    Credentials({
        credentials: {
            email: {},
            password: {},    
        },
        authorize: async (credentials) => {
            
            // salt and hash the password
            const hashedPassword = await bcrypt.hash(password, 10)
            
            
        },
    }),
  ],
});