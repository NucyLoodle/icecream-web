"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

export async function authenticate(prevState, formData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signUp(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const callbackUrl = formData.get("redirectTo") || "/login"; // Default to login page

  // Check if email already exists
  const existingUser = await sql`SELECT * FROM users WHERE email=${email}`;
  if (existingUser.length > 0) {
    return { error: "Email already in use" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (email, password)
    VALUES (${email}, ${hashedPassword})
  `;
  return { success: true, callbackUrl };
}
