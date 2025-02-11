import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// import some salted hash function
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email: {},
            password: {},    
        },
        authorize: async (credentials) => {
            let user = null
            // salt and hash the password
            // check if user exists via email

            if (!user) {
                //no user found
                // register user?
                throw new Error("Invalid credentials.")
            }
            // return user object
            return user
        },
    }),
  ],
});