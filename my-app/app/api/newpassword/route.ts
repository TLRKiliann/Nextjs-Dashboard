import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { newPasswordSchema } from "@/lib/user-schema";
import { ZodError } from "zod";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { password, userId } = newPasswordSchema.parse(await req.json());
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                {
                    status: "fail",
                    message: "User not found",
                },
                { status: 404 }
            );
        }
        const hashedPassword = await hash(password, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        return NextResponse.json({
            status: "success",
            message: "Password updated successfully",
            user: {
                id: user.id,
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
