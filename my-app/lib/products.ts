import { ProductsProps } from "./definitions";

import imgCpu_1 from "@/public/assets/images/cpu/cpu_i3.jpg";
import imgCpu_2 from "@/public/assets/images/cpu/cpu_i5.jpg";
import imgCpu_3 from "@/public/assets/images/cpu/cpu_i7.jpg";
import imgCpu_4 from "@/public/assets/images/cpu/cpu_i9.jpg";

import imgRam_1 from "@/public/assets/images/ram/msi_ram.png";
import imgRam_2 from "@/public/assets/images/ram/asus_ram.png";
import imgRam_3 from "@/public/assets/images/ram/patriot_ram.png";

export const products: ProductsProps[] = [
    {
        id: 1,
        family: "CPU",
        img: imgCpu_1,
        name: "i3",
        version: "7897432",
        stock: 20,
        price: 1044,
        quantity: 2
    },
    {
        id: 2,
        family: "CPU",
        img: imgCpu_2,
        name: "i5",
        version: "1297432",
        stock: 30,
        price: 1244,
        quantity: 4
    },
    {
        id: 3,
        family: "CPU",
        img: imgCpu_3,
        name: "i7",
        version: "2897433",
        stock: 25,
        price: 2000,
        quantity: 10
    },
    {
        id: 4,
        family: "CPU",
        img: imgCpu_4,
        name: "i9",
        version: "1897111",
        stock: 35,
        price: 2000,
        quantity: 2
    },
    {
        id: 5,
        family: "RAM",
        img: imgRam_1,
        name: "MSI",
        version: "7866432",
        stock: 22,
        price: 2000,
        quantity: 8
    },
    {
        id: 6,
        family: "RAM",
        img: imgRam_2,
        name: "Asus",
        version: "647277732",
        stock: 28,
        price: 2000,
        quantity: 12
    },
    {
        id: 7,
        family: "RAM",
        img: imgRam_3,
        name: "Patriot",
        version: "299277732",
        stock: 38,
        price: 1230,
        quantity: 6
    }
]