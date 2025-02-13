import { cookies } from "next/headers";
import { decrypt } from "./session";

export async function getSession() {
  const cookieStore = await cookies(); // Ensure this is synchronous
  const sessionToken = cookieStore.get("session")?.value; // No await needed

  if (!sessionToken) return null;

  try {
    return await decrypt(sessionToken); // Only decrypt needs await
  } catch (error) {
    console.error("Failed to decrypt session:", error);
    return null;
  }
}
