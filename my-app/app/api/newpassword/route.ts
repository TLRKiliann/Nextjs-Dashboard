import { hash, compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { newPasswordSchema } from "@/lib/user-schema";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { email, password, newPassword } = newPasswordSchema.parse(await req.json());

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                {
                    status: "fail",
                    message: "User not found or user has no password set",
                },
                { status: 404 }
            );
        }

        const isPasswordValid = await compare(password, user.password as string);
        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    status: "fail",
                    message: "Current password is incorrect",
                },
                { status: 401 } // HTTP 401 Unauthorized
            );
        }

        const hashedNewPassword = await hash(newPassword, 12);

        const userEmail = user.email as string;

        await prisma.user.update({
            where: { email: userEmail },
            data: {
                password: hashedNewPassword,
            },
        });

        return NextResponse.json(
            {
                status: "success",
                message: "Password updated successfully",
            },
            { status: 200 }
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
}
