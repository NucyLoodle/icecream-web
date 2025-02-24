"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { redirect } from "next/navigation";
import { signUpFormSchema } from '@/app/lib/definitions'

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

export async function signUp(_initialState, formData) {
  const form = Object.fromEntries(formData);
  const validatedFields = signUpFormSchema.safeParse(form);

  // If any form fields are invalid, return early
	if (!validatedFields.success) {
	  return {
      formData: form,
		  errors: validatedFields.error.flatten().fieldErrors,

	  }
	}

  // Check if passwords match
	if (validatedFields.data.password !== validatedFields.data.confirmPassword) {
		return { formData: form, error: "Passwords don't match." };
	}

  // Check if email already exists
  const existingUser = await sql`SELECT * FROM users WHERE email=${validatedFields.data.email}`;
  if (existingUser.length > 0) {
    return { 
      formData: form,
      error: "Email already in use" };
  }
  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

	
  await sql`
  INSERT INTO users (email, password)
  VALUES (${validatedFields.data.email}, ${hashedPassword})
		`

  redirect('/login');
}
