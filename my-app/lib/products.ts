import { Product } from '@prisma/client';

export const products: Product[] = [
    {
        id: 1,
        family: "CPU",
        img: "/assets/images/cpu/cpu_i3.jpg",
        name: "i3",
        version: "7897432",
        stock: 20,
        price: 1044,
        quantity: 0,
        switcher: false,
        updatedAt: new Date,
        createdAt: new Date
    },
    {
        id: 2,
        family: "CPU",
        img: "/assets/images/cpu/cpu_i5.jpg",
        name: "i5",
        version: "1297432",
        stock: 30,
        price: 1244,
        quantity: 0,
        switcher: false,
        updatedAt: new Date,
        createdAt: new Date
    },
    {
        id: 3,
        family: "CPU",
        img: "/assets/images/cpu/cpu_i7.jpg",
        name: "i7",
        version: "2897433",
        stock: 25,
        price: 2000,
        quantity: 0,
        switcher: false,
        updatedAt: new Date,
        createdAt: new Date
    },
    {
        id: 4,
        family: "CPU",
        img: "/assets/images/cpu/cpu_i9.jpg",
        name: "i9",
        version: "1897111",
        stock: 35,
        price: 2000,
        quantity: 0,
        switcher: false,
        updatedAt: new Date,
        createdAt: new Date
    },
    {
        id: 5,
        family: "RAM",
        img: "/assets/images/ram/msi_ram.png",
        name: "MSI",
        version: "7866432",
        stock: 22,
        price: 2000,
        quantity: 0,
        switcher: false,
        updatedAt: new Date,
        createdAt: new Date
    },
    {
        id: 6,
        family: "RAM",
        img: "/assets/images/ram/asus_ram.png",
        name: "Asus",
        version: "647277732",
        stock: 28,
        price: 2000,
        quantity: 0,
        switcher: false,
        updatedAt: new Date,
        createdAt: new Date
    },
    {
        id: 7,
        family: "RAM",
        img: "/assets/images/ram/patriot_ram.png",
        name: "Patriot",
        version: "299277732",
        stock: 38,
        price: 1230,
        quantity: 0,
        switcher: false,
        updatedAt: new Date,
        createdAt: new Date
    }
];