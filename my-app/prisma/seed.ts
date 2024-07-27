import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const productOne = await prisma.product.upsert({
        where: {id: 1},
        update: {},
        create: { 
            id: 1,
            family: "CPU",
            img: "/assets/images/cpu/cpu_i3.jpg",
            name: "i3",
            version: "7897432",
            stock: 20,
            price: 1044,
            quantity: 0,
            switcher: false,
        }
    })
    const productTwo = await prisma.product.upsert({
        where: {id: 2},
        update: {},
        create: { 
            id: 2,
            family: "CPU",
            img: "/assets/images/cpu/cpu_i5.jpg",
            name: "i5",
            version: "1297432",
            stock: 30,
            price: 1244,
            quantity: 0,
            switcher: false,
        }
    })
    const productThree = await prisma.product.upsert({
        where: {id: 3},
        update: {},
        create: { 
            id: 3,
            family: "CPU",
            img: "/assets/images/cpu/cpu_i7.jpg",
            name: "i7",
            version: "2897433",
            stock: 25,
            price: 1200,
            quantity: 0,
            switcher: false,
        }
    })
    const productFour = await prisma.product.upsert({
        where: {id: 4},
        update: {},
        create: { 
            id: 4,
            family: "CPU",
            img: "/assets/images/cpu/cpu_i9.jpg",
            name: "i9",
            version: "1897111",
            stock: 35,
            price: 1380,
            quantity: 0,
            switcher: false,
        }
    })
    const productFive = await prisma.product.upsert({
        where: {id: 5},
        update: {},
        create: { 
            id: 5,
            family: "RAM",
            img: "/assets/images/ram/msi_ram.png",
            name: "MSI",
            version: "7866432",
            stock: 22,
            price: 1480,
            quantity: 0,
            switcher: false,
        }
    })
    const productSix = await prisma.product.upsert({
        where: {id: 6},
        update: {},
        create: { 
            id: 6,
            family: "RAM",
            img: "/assets/images/ram/asus_ram.png",
            name: "Asus",
            version: "7866432",
            stock: 22,
            price: 2000,
            quantity: 0,
            switcher: false,
        }
    })
    const productSeven = await prisma.product.upsert({
        where: {id: 7},
        update: {},
        create: { 
            id: 7,
            family: "RAM",
            img: "/assets/images/ram/patriot_ram.png",
            name: "Patriot",
            version: "2992777",
            stock: 38,
            price: 1230,
            quantity: 0,
            switcher: false
        }
    })
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            name: 'Alice Prisma',
            password: '$2a$12$Nl1IoswtTJ4tZEMYdiLnn.EYPHVRjxkIRrIRVVMVHUQjt8JPC0.ZS',
            isConnected: false,
        },
    })
    const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            name: 'Bob Prisma',
            password: '$2a$12$KcwHA6oqeNh.EGLsGZj2w.bakpsW/X5r9Y.xz7WmWes8PfAicU2ta',
            isConnected: false,
        },
    })
    const admin = await prisma.user.upsert({
        where: { email: 'admin@prisma.io' },
        update: {},
        create: {
            email: 'admin@prisma.io',
            name: 'Admin User',
            password: '$2a$12$6rlTvfEs4DLiX7GQZUZpWeHy0tOYmS8YRs4uxUKur4UEHZtqxANhe',
            isConnected: false,
        },
    })
    const bruce = await prisma.user.upsert({
        where: { email: 'bruce@prisma.io' },
        update: {},
        create: {
            email: 'bruce@prisma.io',
            name: 'Bruce Willis',
            password: '$2a$12$JmalMaWc8azSJ0bPR0hLg.ccU1mYMpxksdtldwqOsJ2ycPYLEG7sy',
            isConnected: false,
        },
    })
    const celestine = await prisma.user.upsert({
        where: { email: 'celestine@prisma.io' },
        update: {},
        create: {
            email: 'celestine@prisma.io',
            name: 'Celestine Aurora',
            password: '$2a$12$SoUqhz31IemCxavsjuq4SOVOAHE/TXh097NkGAHh/JkphFw3W1rBu',
            isConnected: false,
        },
    })
    const jason = await prisma.user.upsert({
        where: { email: 'jason@prisma.io' },
        update: {},
        create: {
            email: 'jason@prisma.io',
            name: 'Jason Stahtam',
            password: '$2a$12$eoVuV/kf82DVDU9g4.AO3.argnGpvl7LxZC4hYulZC8EBAKKGnYAC',
            isConnected: false,
        },
    })
    const jean = await prisma.user.upsert({
        where: { email: 'jean@prisma.io' },
        update: {},
        create: {
            email: 'jean@prisma.io',
            name: 'Jean Dujardin',
            password: '$2a$12$B98OQWt75ip.nG885dDr0.qwyTLq1Bkp17KvKUaCHwS/fYIo/jcd2',
            isConnected: false,
        },
    })
    const justine = await prisma.user.upsert({
        where: { email: 'justine@prisma.io' },
        update: {},
        create: {
            email: 'justine@prisma.io',
            name: 'Justine Spring',
            password: '$2a$12$.tk3/ltutRCynUPESJco..5dZeQA.WUPgpaBGY6U9POf8lHLet3rS',
            isConnected: false,
        },
    })
    const maria = await prisma.user.upsert({
        where: { email: 'maria@prisma.io' },
        update: {},
        create: {
            email: 'maria@prisma.io',
            name: 'Maria Carrey',
            password: '$2a$12$d0gkvOVJqsB0NwRSKV8qqulp4xn3CmwzjDrXBtKAt7Qs.RVCiRDYy',
            isConnected: false,
        },
    })
    const paula = await prisma.user.upsert({
        where: { email: 'paula@prisma.io' },
        update: {},
        create: {
            email: 'paula@prisma.io',
            name: 'Paula Peigh',
            password: '$2a$12$JFf4gV9woeUEptl/Zy1tzOI1B3luwP.tpnfKJagGVc3EKG/fDX7lS',
            isConnected: false,
        },
    })
    const rebecca = await prisma.user.upsert({
        where: { email: 'rebecca@prisma.io' },
        update: {},
        create: {
            email: 'rebecca@prisma.io',
            name: 'Rebecca VonMistle',
            password: '$2a$12$dMkoKtPKkJiuWQXNMJMDIex2ahUZ/Ed2.PVBc0.U.Am4mjVXMB/ze',
            isConnected: false,
        },
    })
    const connectionOne = await prisma.connection.upsert({
        where: {id: '24b167ce-b9f2-4947-85e5-6e8cbc718c35'},
        update: {},
        create: { 
            userId: 'f675efe7-eaab-48fb-a882-d90aad291e38',
            createdAt: "2024-07-20T20:06:00.392Z"
        },
    })
    const connectionTwo = await prisma.connection.upsert({
        where: {id: '24b167ce-b9f2-4947-85e5-6e8cbc718c35'},
        update: {},
        create: { 
            userId: 'f675efe7-eaab-48fb-a882-d90aad291e38',
            createdAt: "2024-07-22T10:11:00.392Z"
        },
    })
    const connectionThree = await prisma.connection.upsert({
        where: {id: '24b167ce-b9f2-4947-85e5-6e8cbc718c35'},
        update: {},
        create: { 
            userId: 'f675efe7-eaab-48fb-a882-d90aad291e38',
            createdAt: "2024-07-23T12:26:00.392Z"
        },
    })
    const connectionFour = await prisma.connection.upsert({
        where: {id: '24b167ce-b9f2-4947-85e5-6e8cbc718c35'},
        update: {},
        create: { 
            userId: 'f675efe7-eaab-48fb-a882-d90aad291e38',
            createdAt: "2024-07-23T14:22:00.392Z"
        },
    })
    const connectionFive = await prisma.connection.upsert({
        where: {id: '24b167ce-b9f2-4947-85e5-6e8cbc718c35'},
        update: {},
        create: { 
            userId: 'f675efe7-eaab-48fb-a882-d90aad291e38',
            createdAt: "2024-07-23T21:45:00.392Z"
        },
    })
    console.log(
        { 
            productOne, productTwo, productThree, productFour, productFive, productSix, productSeven, 
            alice, bob, admin, bruce, celestine, jason, jean, justine, maria, paula, rebecca,
            connectionOne, connectionTwo, connectionThree, connectionFour, connectionFive
        }
    )
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })