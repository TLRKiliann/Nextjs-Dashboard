"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { actionClient, authActionClient, ActionError } from "./safe-action";
import { z } from "zod";
import { zfd } from "zod-form-data";

// Resusable zod schema
const schemaId = z.object({
    id: z.number(),
});

//add product
export const addProductToDb = authActionClient
    .schema(schemaId)
    .action(async ({ parsedInput, ctx: { userId }}) => {

        const user = await prisma.user.findUnique({
            where: { 
                id: String(userId)
            },
        });
        
        if (!user) {
            throw new ActionError("User not found!");
        };

        try {
            await prisma.cart.update({
                data: {
                    quantity: {
                        increment: 1,
                    },
                    stock: {
                        increment: -1,
                    },
                    user: {
                        connect: {
                            id: String(userId),
                        }
                    },
                },
                where: {
                    id: parsedInput.id,
                }
            });
        } catch (error) {
            console.log("Error: ", error)
            throw new ActionError("Error to add product (main)!");
        }
    revalidatePath("/products");
    console.log("Add product successfully!");
});

// increment quantity in cartItems
export const addToCart = authActionClient
    .schema(schemaId)
    .action(async ({ parsedInput, ctx: { userId }}) => {

        const user = await prisma.user.findUnique({
            where: { 
                id: String(userId)
            },
        });
        
        if (!user) {
            throw new ActionError("User not found!");
        };

        try {
            await prisma.cart.update({
                data: {
                    quantity: {
                        increment: 1,
                    },
                    stock: {
                        increment: -1,
                    },
                    user: {
                        connect: {
                            id: String(userId),
                        }
                    }
                },
                where: {
                    id: parsedInput.id,
                },
            });
        } catch (error) {
            throw new ActionError("Error to add product to cart");
        }
    revalidatePath("/products/cart");
    console.log("Add product to cart done!");
});


// decrement quantity in cartItems
export const deleteFromCart = authActionClient
    .schema(schemaId)
    .action(async ({ parsedInput, ctx: { userId }}) => {

        const user = await prisma.user.findUnique({
            where: { 
                id: String(userId)
            },
        });
        
        if (!user) {
            throw new ActionError("User not found!");
        };

        try {
            await prisma.cart.update({
                data: {
                    quantity: {
                        increment: -1,
                    },
                    stock: {
                        increment: 1,
                    },
                    user: {
                        connect: {
                            id: String(userId),
                        }
                    }
                },
                where: {
                    id: parsedInput.id,
                },
            });
        } catch (error) {
            console.log("Error: ", error)
            throw new ActionError("Error to delete product!");
        }
    revalidatePath("/products/cart");
    console.log("Delete from cart done!")
});

// reinitialize quantity to 0 in cartItems
export const removeFromCart = authActionClient
    .schema(schemaId)
    .action(async ({ parsedInput, ctx: { userId }}) => {

        const user = await prisma.user.findUnique({
            where: { 
                id: String(userId)
            },
        });
        
        if (!user) {
            throw new ActionError("User not found!");
        };

        let resetStock: number = 0;
        switch (parsedInput.id) {
            case 1:
                resetStock = 19;
                break;
            case 2:
                resetStock = 28;
                break;
            case 3:
                resetStock = 23;
                break;
            case 4:
                resetStock = 34;
                break;
            case 5:
                resetStock = 21;
                break;
            case 6:
                resetStock = 19;
                break;
            case 7:
                resetStock = 17;
                break;
        }
        try {
            await prisma.cart.update({
                data: {
                    quantity: 0,
                    stock: resetStock,
                    user: {
                        connect: {
                            id: String(userId),
                        }
                    },
                },
                where: {
                    id: parsedInput.id,
                },
            });
        } catch (error) {
            throw new ActionError("Remove product failed");
        }
    revalidatePath("/products/cart");
    console.log("Remove product done!");
});

// /dashboard/products-admin (ProductToModify)
export const handleModify = actionClient
    .schema(
        z.object({
            id: z.number(),
            switcher: z.boolean()
        }
    ))
    .action(async ({ parsedInput }) => {
    try {
        await prisma.product.update({
            data: {
                id: parsedInput.id,
                switcher: !parsedInput.switcher,
            },
            where: {
                id: parsedInput.id,
            }
        })
    } catch (error) {
        console.log("Error: ", error)
        throw new ActionError("Error: handleModify fn()");
    }
    revalidatePath("/dashboard/products-admin");
});

const schemaSaveProd = zfd.formData({
    id: zfd.numeric(z.number()), 
    family: zfd.text(z.string()),
    name: zfd.text(z.string()),
    stock: zfd.numeric(z.number()),
    price: zfd.numeric(z.number())
});

// /dashboard/products-admin (ProductToModify)
export const handleSaveProduct = actionClient
    .schema(schemaSaveProd)
    .action(async ({ parsedInput }) => {
        try {
            const productModified = await prisma.product.update({
                data: {
                    id: parsedInput.id,
                    family: parsedInput.family,
                    name: parsedInput.name,
                    stock: parsedInput.stock,
                    price: parsedInput.price,
                    switcher: false,
                },
                where: {
                    id: parsedInput.id,
                }
            });

            if (!productModified) {
                throw new ActionError("Error: handleSaveProduct fn(1)");
            };
            await prisma.cart.update({
                data: {
                    id: parsedInput.id,
                    family: parsedInput.family,
                    name: parsedInput.name,
                    stock: parsedInput.stock,
                    price: parsedInput.price,
                    switcher: false,
                },
                where: {
                    id: parsedInput.id,
                }
            });
        } catch (error) {
            console.log("Error: ", error)
            throw new ActionError("Error: handleSaveProduct fn(2)");
        }
    revalidatePath("/dashboard/products-admin");
});

// /dashboard/products-admin (ProductToModify)
export const handleRemove = actionClient
    .schema(schemaId)
    .action(async ({ parsedInput }) => {
        try {
            const productRm = await prisma.cart.delete({
                where: {
                    id: parsedInput.id,
                }
            })

            if (!productRm) {
                throw new ActionError("Error: handleRemove fn(1)");
            };

            await prisma.product.delete({
                where: {
                    id: productRm.id,
                }
            });
        } catch (error) {
            console.log("Error: ", error)
            throw new ActionError("Error: handleRemove fn(2)");
        }
    revalidatePath("/dashboard/products-admin");
});

// /dashboard/products-admin (CreateProduct)
const schemaProduct = zfd.formData({
    id: zfd.numeric(z.number()),
    family: zfd.text(z.string()),
    name: zfd.text(z.string()),
    version: zfd.text(z.string()),
    stock: zfd.numeric(z.number()),
    price: zfd.numeric(z.number())
});

export const createProduct = actionClient
    .schema(schemaProduct)
    .action(async({ parsedInput }) => {
        try {
            const newProduct = await prisma.product.create({
                data: {
                    id: parsedInput.id,
                    family: parsedInput.family,
                    name: parsedInput.name,
                    img: "/assets/images/cpu/cpu_i3.jpg",
                    version: parsedInput.version,
                    quantity: 0,
                    stock: parsedInput.stock,
                    price: parsedInput.price,
                } 
            });

            if (!newProduct) {
                throw new ActionError("Error during creation of product!");
            };
            
            await prisma.cart.create({
                data: {
                    id: newProduct.id,
                    family: parsedInput.family,
                    name: parsedInput.name,
                    img: "/assets/images/cpu/cpu_i3.jpg",
                    version: parsedInput.version,
                    quantity: 0,
                    stock: parsedInput.stock,
                    price: parsedInput.price,
                    productId: newProduct.id
                }
            })
        } catch (error) {
            throw new ActionError("Error during creation of product!");
        }
    revalidatePath("/dashboard/products-admin");
    console.log("Product created!");
});

// email from /contact
const schemaEmail = zfd.formData({
    src: zfd.text(z.string()),
    message: zfd.text(z.string())
});

export const messageSender = actionClient
    .schema(schemaEmail)
    .action(
        async ({ parsedInput }) => {
        try {
            await prisma.message.create({
                data: {
                    src: parsedInput.src,
                    message: parsedInput.message,
                }
            })
        } catch (error) {
            throw new ActionError("Error with message!");
        }
    revalidatePath("/contact");
    console.log("Message sent!");
});

// EMAIL actions
export const openEmail = actionClient
    .schema(z.object({id: z.string()}))
    .action(async({ parsedInput }) => {
        try {
            await prisma.message.update({
                data: {
                    id: parsedInput.id,
                    isOpen: true,
                },
                where: {
                    id: parsedInput.id,
                }   
            })
        } catch (error) {
            throw new ActionError("Open message failed!");
        }
    revalidatePath("/dashboard/emails-admin");
    console.log("Open message done!");
});

export const closeEmail = actionClient
    .schema(z.object({id: z.string()}))
    .action(async ({ parsedInput }) => {
        try {
            await prisma.message.update({
                data: {
                    id: parsedInput.id,
                    isOpen: false,
                },
                where: {
                    id: parsedInput.id,
                }   
            })
        } catch (error) {
            throw new ActionError("Close message failed!");
        }
    revalidatePath("/dashboard/emails-admin");
    console.log("Close message done!");
});

export const removeEmail = actionClient
    .schema(z.object({id: z.string()}))
    .action(async ({ parsedInput }) => {
        try {
            await prisma.message.delete({
                where: {
                    id: parsedInput.id,
                }
            })
        } catch (error) {
            throw new ActionError("removeEmail failed!");
        }
    revalidatePath("/dashboard/emails-admin");
    console.log("removeEmail done!");
});

// deleteMany()

// admin response
const schemaAdminEmail = zfd.formData({
    src: zfd.text(z.string()),
    textMail: zfd.text(z.string()),
    dst: zfd.text(z.string())
});

export const adminEmail = actionClient
    .schema(schemaAdminEmail)
    .action(async ({ parsedInput }) => {
        try {
            await prisma.message.create({
                data: {
                    src: parsedInput.src,
                    message: parsedInput.textMail,
                    dst: parsedInput.dst,
                    isOpen: true,
                }
            })
        } catch (error) {
            throw new ActionError("Error message!");
        }
    revalidatePath("/dashboard/emails-admin");
    console.log("Message sent");
});

const schemaSaveAddress = zfd.formData({
    address: zfd.text(z.string()),
    city: zfd.text(z.string()),
    npa: zfd.text(z.string()),
    country: zfd.text(z.string())
});

// address recoder
export const saveAddress = authActionClient
    .schema(schemaSaveAddress)
    .action(async ({ parsedInput, ctx: { userId }}) => {

        const user = await prisma.user.findUnique({
            where: { 
                id: String(userId)
            },
        });
        
        if (!user) {
            throw new ActionError("User not found!");
        };

        try {
            await prisma.payment.create({
                data: {
                    usernameId: String(userId),
                    address: parsedInput.address,
                    city: parsedInput.city,
                    npa: parsedInput.npa,
                    country: parsedInput.country,
                }
            })
            
        } catch (error) {
            throw new ActionError("Error with address register!");
        }
    revalidatePath("/order/address");
    redirect("/order/payment-method");
});

//payment method
export const recordMethod = authActionClient 
    .schema(z.object({pathMethod: z.string()}))
    .action(async ({ parsedInput, ctx: { userId }}) => {

        const user = await prisma.user.findUnique({
            where: { 
                id: String(userId)
            },
        });
        
        if (!user) {
            throw new ActionError("User not found!");
        };

        try {
            const lastPayment = await prisma.payment.findFirst({
                where: {
                    usernameId: String(userId),
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!lastPayment) {
                return {
                    message: "No payment found for this user!"
                };
            }
            await prisma.payment.update({
                data: {
                    method: parsedInput.pathMethod,
                },
                where: {
                    id: lastPayment.id,
                }
            });
        } catch (error) {
            throw new ActionError("Error with payment method!");
        }
    revalidatePath("/order/payment-method");
    redirect("/order/payment-method/payment");
});