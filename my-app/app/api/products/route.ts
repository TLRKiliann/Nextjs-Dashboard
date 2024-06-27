import { products } from "@/app/lib/products";

export async function GET() {
    return Response.json(products);
}