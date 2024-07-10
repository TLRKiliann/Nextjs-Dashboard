import { StaticImageData } from "next/image";

export type State = {
    status: "success";
    message: string;} | {
        status: "error";
        message: string;
        errors?: Array<{
            path: string;
            message: string;
        }>;
} | null | undefined;

export type GeoLocationData = {
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

export type CustomersProps = {
    readonly id: number;
    username: string;
    lastname: string;
    readonly img: StaticImageData;
    readonly spend: number;
    readonly artQuantity?: number;
    readonly address?: string;
    readonly country: string;
    readonly city: string;
    isConnected: boolean;
}

export type ProductsProps = {
    id: number;
    family: string;
    img: StaticImageData | string;
    name: string;
    version: string;
    stock: number;
    price: number;
    quantity: number;
    switcher?: boolean;
    updateAt?: Date;
    createdAt?: Date;
}

export type ListOfItemsProps = {
    readonly id: number;
    readonly item: string;
}