import { StaticImageData } from "next/image";

export type CustomersProps = {
    id: number;
    username: string;
    lastname: string;
    img: StaticImageData;
    spend: number;
    country: string;
    city: string;
    connected: boolean;
}