import { StaticImageData } from "next/image";

export type CustomersProps = {
    id: number;
    username: string;
    lastname: string;
    img: StaticImageData;
    spend: number;
    artQuantity: number;
    address: string;
    country: string;
    city: string;
    connected: boolean;
}