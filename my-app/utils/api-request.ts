import type { GeoLocationData } from "@/lib/definitions";

export const ApiPublicIp = async (): Promise<{data: {ip: string;}}> => {
    try {
        const response = await fetch("https://jsonip.com/");
        if (!response.ok) {
            throw new Error('Error: response failed (ApiPublicIp call)!');
        }
        const data = await response.json();
        return { data: { ip: data.ip } };
    } catch (error: unknown) {
        console.error('Error to fetch public IP:', error);
        throw error;
    }
};

export const ApiGeolocation = async ({data}: {data: {ip: string;}}): Promise<GeoLocationData> => {
    const secApiKey = process.env.SECRET_API_KEY;
    try {
        const geoRes = await fetch(`https://api.ip2location.io/?key=${secApiKey}&ip=${data.ip}`, {
            next: {
                revalidate: 10
            }
        });
        if (!geoRes.ok) {
            throw new Error('Error: geoRes failed (GeoLocationData API call)!');
        }
        const geoData = await geoRes.json();
        return geoData;
    } catch (error: unknown) {
        console.error('Error fetching geo IP:', error);
        throw error;
    }
};