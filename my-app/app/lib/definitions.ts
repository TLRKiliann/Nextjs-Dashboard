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
    readonly id: number;
    readonly family: string;
    readonly img: StaticImageData;
    readonly name: string;
    readonly version: string;
    readonly stock: number;
    readonly price: number;
    quantity: number;
    switcher: boolean;
}