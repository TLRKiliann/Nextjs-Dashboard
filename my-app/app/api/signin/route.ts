import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { loginUserSchema } from "@/lib/user-schema";
import { ZodError } from "zod";

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

    return NextResponse.json({
      status: "success",
      message: "Logged in successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
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
