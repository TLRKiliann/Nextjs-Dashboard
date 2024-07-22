import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createUserSchema } from "@/lib/user-schema";
import { ZodError } from "zod";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { serialize } from 'v8';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { name, email, password } = createUserSchema.parse(await req.json());

    const hashedPassword = await hash(password, 12);
    
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Email already exists",
        },
        { status: 409 }
      );
    }
    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    // Generate JWT token for new user
    const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

    // Setting cookie options
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    };

    // Set COOKIE with TOKEN
    const cookie = cookies();
    cookie.set('Set-Cookie', `auth-token=${token}; ${serialize(cookieOptions)}`, { sameSite: 'strict' });

    return NextResponse.json(
      {
        status: "success",
        message: "User registered successfully",
        user: {
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
};