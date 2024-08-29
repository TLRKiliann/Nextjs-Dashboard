import type { GeoLocationData } from "@/lib/definitions";
import { readFile, writeFile } from "fs/promises";

type DataProps = {
    browser?: string;
    data?: {
        ip: string;
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
        const geoData = (await geoRes.json()) as GeoLocationData;
        return geoData;
    } catch (error: unknown) {
        console.error('Error fetching geo IP:', error);
        throw error;
    }
};

export async function readData(filename: string): Promise<DataProps[]> {
    const file = await readFile(filename, { encoding: 'utf8' });
    return JSON.parse(file) as DataProps[];
};

export async function writeData(filename: string, data: DataProps[]): Promise<void> {
    await writeFile(filename, JSON.stringify(data, null, 4));
};
