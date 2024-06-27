import { customers } from "@/app/lib/datadb";

export async function GET() {
    return Response.json(customers);
}