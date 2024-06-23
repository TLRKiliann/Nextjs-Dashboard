//api requests to establish ip & geolocation

type GeoLocationData = {
    ip:	string;
    country_code: string;
    country_name: string;
    region_name: string;
    city_name: string;
    latitude: number;
    longitude: number;
    zip_code: string; 
    time_zone: string; 
    asn: string; 
    as: string; 
    is_proxy: boolean;	
};

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
}

export const ApiGeolocation = async ({data}:{data: {ip: string;}}): Promise<GeoLocationData> => {
    try {
        const geoRes = await fetch(`https://api.ip2location.io/?key=095506452DD936AF43038260E3A7A728&ip=${data.ip}`);
        if (!geoRes.ok) {
            throw new Error('Failed to fetch geolocation');
        }
        const geoData = await geoRes.json();
        return geoData;
    } catch (error: any) {
        console.error('Error fetching geo IP:', error);
        throw error;
    }
}