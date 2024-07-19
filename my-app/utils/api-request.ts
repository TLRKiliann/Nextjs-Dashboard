import type { GeoLocationData } from "@/lib/definitions";
import { Product } from "@prisma/client";

export const ApiPublicIp = async (): Promise<{data: {ip: string;}}> => {
    try {
        const response = await fetch("https://jsonip.com/");
        if (!response.ok) {
            throw new Error('Failed to fetch geolocation');
        }
        const data = await response.json();
        return { data: { ip: data.ip } };
    } catch (error: any) {
        console.error('Error fetching public IP:', error);
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
            throw new Error('Failed to fetch geolocation');
        }
        const geoData = await geoRes.json();
        return geoData;
    } catch (error: any) {
        console.error('Error fetching geo IP:', error);
        throw error;
    }
};

export const getProductsData = async (): Promise<Product[]> => {
    const response = await fetch("http://localhost:3000/api/products", {
        cache: "no-cache"
    });
    const products = (await response.json()) as Product[];
    return products;
};
