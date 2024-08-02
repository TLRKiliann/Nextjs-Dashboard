import { GeoLocationData } from "@/lib/definitions";

export async function POST(req: Request) {
    const dataIp = await req.json();
    const secApiKey = process.env.SECRET_API_KEY;
    try {
        const geoRes = await fetch(`https://api.ip2location.io/?key=${secApiKey}&ip=${dataIp}`, {
            cache: "no-store",
        });
        if (!geoRes.ok) {
            throw new Error('Error: geoRes failed (GeoLocationData API call)!');
        }
        const geoData = (await geoRes.json()) as GeoLocationData;
        return Response.json(geoData);
    } catch (error) {
        throw new Error('Error fetching geo IP:');
    }
}