import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { loginUserSchema } from "@/lib/user-schema";
import { ZodError } from "zod";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { serialize } from 'v8';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password } = loginUserSchema.parse(await req.json());

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }
    if (!user.password) {
        return NextResponse.json(
          {
            status: "fail",
            message: "Invalid password for this user",
          },
          { status: 500 }
        );
    }
    const isPasswordValid = await compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }
    if (user.email && user.password) {
      // set TOKEN
      const cookie = cookies();
      const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

      const cookieOptions = {
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite:'strict'
      }; 
      // set COOKIE with TOKEN
      cookie.set('Set-Cookie', `auth-token=${token}; ${serialize(cookieOptions)}`, {sameSite:'strict'});
      return NextResponse.json({message: "response from POST", 
        user: {
          name: user.name,
          email: user.email,
        }}, 
        {status: 200, headers: {
          "Content-Type": "application/json"
      }});

    } else {
      return NextResponse.json("Login failed");
    }
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
}
