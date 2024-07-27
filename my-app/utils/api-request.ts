import type { GeoLocationData } from "@/lib/definitions";
import { Product } from "@prisma/client";


export const ApiPublicIp = async (): Promise<{data: {ip: string;}}> => {
    try {
        const response = await fetch("https://jsonip.com/");
        if (!response.ok) {
            throw new Error('Failed to fetch public ip');
        }
        const data = await response.json();
        return { data: { ip: data.ip } };
    } catch (error: unknown) {
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
            throw new Error('Error: geoRes.ok failed (GeoLocationData API call)!');
        }
        const geoData = await geoRes.json();
        return geoData;
    } catch (error: unknown) {
        console.error('Error fetching geo IP:', error);
        throw error;
    }
};

export const fetchDataFromApi = async () => {
    try {
        const response = await fetch("/api/products");
        if (!response.ok) {
            throw new Error('Error: response.ok failed (products API call)!');
        }
        const products = (await response.json()) as Product[]
        return products;
    } catch (error: unknown) {
        console.log('Failed to fetch products from API!', error);
        throw error;
    }
};