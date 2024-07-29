export async function GET() {
    try {
        const response = await fetch("https://jsonip.com/");
        if (!response.ok) {
            throw new Error('Error: response failed (ApiPublicIp call)!');
        }
        const data = await response.json();
        return Response.json({ data: { ip: data.ip } });
    } catch (error) {
        throw new Error('Error to fetch public IP:');
    }
}
