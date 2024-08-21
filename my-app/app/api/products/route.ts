import { Product } from "@prisma/client";
import prisma from "@/prisma/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        const user = session?.user;
        
        if (!user) {
            return Response.json({error: "Unauthorized"}, {status: 401});
        };

        const products: Product[] = await prisma.product.findMany({
            orderBy: {
                id: "asc",
            }
        });
        return Response.json(products);
    } catch (error) {
        console.log(error);
        return Response.json({error: "internal server error (products)"}, {status: 500});
    }
};