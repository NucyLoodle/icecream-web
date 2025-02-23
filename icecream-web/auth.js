import NextAuth from "next-auth"
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { createSession } from '@/app/lib/session'

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

  export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
   
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
 
            if (passwordsMatch) {
				await createSession(user.email)
				return user;
			}
          }
		  console.log('Invalid credentials');
          return null;
        },
      }),
    ],
  });

