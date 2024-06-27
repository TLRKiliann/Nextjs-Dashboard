import { StaticImageData } from "next/image";

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
    connected: boolean;
}

export type ProductsProps = {
    id: number;
    family: string;
    img: StaticImageData;
    name: string;
    version: string;
    stock: number;
    price: number;
    quantity: number;
    switcher: boolean;
}