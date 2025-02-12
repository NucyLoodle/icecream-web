import NextAuth from "next-auth"
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";


export const { signIn, signOut, auth } = NextAuth({
    ...authConfig, //NextAuth receives all key-value pairs from authConfig as if they were written directly inside the object.
  providers: [
    Credentials({
        credentials: {
            email: {},
            password: {},    
        },
        authorize: async (credentials) => {
            let user = null
            // salt and hash the password
            const hashedPassword = await bcrypt.hash(password, 10)
            // check if user exists via email
            user = await sql`
                SELECT * FROM users WHERE email = ${credentials.email}
            `
            if (!user) {
                //no user found
                // register user?
                console.log("No user found.")
                throw new Error("Invalid credentials.")
            }
            // return user object
            console.log(user)
            return user
        },
    }),
  ],
});