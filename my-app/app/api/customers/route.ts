import { customers } from "@/lib/datadb";

export async function GET() {
    return Response.json(customers);
}