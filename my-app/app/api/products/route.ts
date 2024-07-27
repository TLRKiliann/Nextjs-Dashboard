import prisma from "@/prisma/prisma";
import { Product } from "@prisma/client";

export async function GET() {
    const products: Product[] = await prisma.product.findMany({
        orderBy: {
            id: "asc"
        }
    });
    return Response.json(products);
};
