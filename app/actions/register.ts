"use client"; // Note: This will actually be a server action, but I'll use "use server" inside or at top.
// Wait, actions should have "use server" at the top.

"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function register(data: any) {
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists with this email" };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        subscription: {
          create: {
            plan: "FREE",
          },
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong during registration" };
  }
}
