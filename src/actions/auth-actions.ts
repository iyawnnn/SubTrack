"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// --- REGISTER (Sign Up) ---
// 👇 FIX: Accept a plain object instead of FormData
export async function register(data: { name: string; email: string; password: string }) {
  const { name, email, password } = data;

  if (!email || !password || !name) {
    return { success: false, message: "Missing required fields" };
  }

  try {
    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, message: "Email already in use" };
    }

    // 2. Hash Password (Securely)
    const hashedPassword = await hash(password, 10);

    // 3. Create User
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 👇 FIX: Return 'success' boolean and 'message' string to match client
    return { success: true, message: "Account created! Please log in." };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Something went wrong during registration." };
  }
}

// --- LOGIN (Sign In) ---
// Kept as FormData if used by a standard HTML form, otherwise signIn is usually called directly from client
export async function loginWithCredentials(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}