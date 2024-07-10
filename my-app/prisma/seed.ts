import { Prisma, PrismaClient } from '@prisma/client';
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
            price: 2000,
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
            price: 2000,
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
            price: 2000,
            quantity: 0,
            switcher: false,
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
    console.log({ alice, bob, admin, productOne, productTwo, productThree, productFour, productFive })
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