"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  company: z.string().optional(),
  role: z.string().optional(),
});

export async function register(data: any) {
  console.log("Registering user:", data.email);
  
  const validatedFields = registerSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message };
  }
  
  const { name, email, password, company, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return { error: "User already exists with this email" };
    }
    
    // Create the user and an active FREE subscription
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        company,
        role,
        subscription: {
          create: {
            plan: "FREE",
            status: "ACTIVE",
          },
        },
      },
    });
    
    console.log("User created successfully:", user.id);
    return { success: true };
  } catch (error: any) {
    console.error("Registration error details:", error);
    if (error.message && error.message.includes("Can't reach database server")) {
        return { error: "Database connection failed. Please try again in a few minutes." };
    }
    return { error: "Something went wrong during registration. Please try again." };
  }
}
