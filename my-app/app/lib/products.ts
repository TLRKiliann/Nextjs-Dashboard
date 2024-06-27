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
        quantity: 0,
        switcher: false
    },
    {
        id: 2,
        family: "CPU",
        img: imgCpu_2,
        name: "i5",
        version: "2342432",
        stock: 30,
        price: 1244,
        quantity: 0,
        switcher: false
    },
    {
        id: 3,
        family: "CPU",
        img: imgCpu_3,
        name: "i7",
        version: "372473277",
        stock: 25,
        price: 2000,
        quantity: 0,
        switcher: false
    },
    {
        id: 4,
        family: "CPU",
        img: imgCpu_4,
        name: "i9",
        version: "411108997",
        stock: 35,
        price: 2000,
        quantity: 0,
        switcher: false
    },
    {
        id: 5,
        family: "RAM",
        img: imgRam_1,
        name: "MSI",
        version: "34324324324",
        stock: 22,
        price: 2000,
        quantity: 0,
        switcher: false
    },
    {
        id: 6,
        family: "RAM",
        img: imgRam_2,
        name: "Asus",
        version: "647228432",
        stock: 28,
        price: 2000,
        quantity: 0,
        switcher: false
    },
    {
        id: 7,
        family: "RAM",
        img: imgRam_3,
        name: "Patriot",
        version: "98521711",
        stock: 38,
        price: 1230,
        quantity: 0,
        switcher: false
    }
]