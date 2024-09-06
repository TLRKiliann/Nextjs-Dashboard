import type { GeoLocationData } from "@/lib/definitions";
import { readFile, writeFile } from "fs/promises";

type DataProps = {
    browser?: string;
    username?: string;
    dataIp?: string;
};

export const ApiGeolocation = async (dataIp: string): Promise<GeoLocationData> => {
    const secApiKey = process.env.SECRET_API_KEY;
    try {
        const geoRes = await fetch(`https://api.ip2location.io/?key=${secApiKey}&ip=${dataIp}`, {
            cache: 'no-store'
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

export const readData = async (filename: string): Promise<DataProps[]> => {
    const file = await readFile(filename, { encoding: 'utf8' });
    return JSON.parse(file) as DataProps[];
};

export const writeData = async (filename: string, data: DataProps[]): Promise<void> => {
    await writeFile(filename, JSON.stringify(data, null, 4));
};

// public ip of users
export const writeIp = async (filename: string, data: {ip: string}): Promise<void> => {
    await writeFile(filename, JSON.stringify(data, null, 4));
};