"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
//import { auth } from "@/auth";

//update card
export const addProductToDb = async (formData: FormData) => {
    try {
        await prisma.product.update({
            data: {
                id: Number(formData.get("id")),
                quantity: {
                    increment: 1,
                },
            },
            where: {
                id: Number(formData.get("id")),
            },
            select: {
                id: true,
                name: true
            }
        });
    } catch (error) {
        console.log("Error: ", error)
        return "Error: prisma.product.create";
    }
    revalidatePath("/products");
};

// increment quantity in cartItems
export async function addToCart(formData: FormData) {
    try {
        await prisma.product.update({
            data: {
                id: Number(formData.get("id")),
                quantity: {
                    increment: 1,
                },
            },
            where: {
                id: Number(formData.get("id")),
            },
        });
    } catch (error) {
        return {message: "There is an error!", error};
    }
    revalidatePath("/products/cart");
    return {message: "Success!"};
};

// decrement quantity in cartItems
export async function deleteFromCart(formData: FormData) {
    try {
        await prisma.product.update({
            data: {
                id: Number(formData.get("id")),
                quantity: {
                    increment: -1,
                },
            },
            where: {
                id: Number(formData.get("id")),
            },
        });
    } catch (error) {
        console.log("Error: ", error)
        return {message: "There is an error!"};
    }
    revalidatePath("/products/cart");
    return {message: "Success!"}
};

// reinitialize quantity to 0 in cartItems
export async function removeFromCart(id: number) {
    try {
        await prisma.product.update({
            data: {
                id: id,
                quantity: 0,
            },
            where: {
                id: id,
            },
        });
    } catch (error) {
        return {message: "There is an error!"};
    }
    revalidatePath("/products/cart");
    return {message: "Success!"};
};

// /dashboard/products-admin (ProductToModify)
export async function handleModify(id: number, switcher: boolean) {
    try {
        await prisma.product.update({
            data: {
                id: id,
                switcher: !switcher,
            },
            where: {
                id: id,
            }
        })
    } catch (error) {
        console.log("Error: ", error)
        return "Error: handleModify fn()";
    }
    revalidatePath("/dashboard/products-admin");
};

// /dashboard/products-admin (ProductToModify)
export async function handleSaveProduct(
    id: number, family: string, name: string, stock: number, price: number
) {
    try {
        await prisma.product.update({
            data: {
                id: id,
                family: family,
                name: name,
                stock: stock,
                price: price,
                switcher: false,
            },
            where: {
                id: id,
            }
        })
    } catch (error) {
        console.log("Error: ", error)
        return "Error: handleSaveProduct fn()";
    }
    revalidatePath("/dashboard/products-admin");
};

// /dashboard/products-admin (ProductToModify)
export async function handleRemove(id: number) {
    try {
        await prisma.product.delete({
            where: {
                id: id,
            }
        })
    } catch (error) {
        console.log("Error: ", error)
        return "Error: handleRemove fn()";
    }
    revalidatePath("/dashboard/products-admin");
};

// /dashboard/products-admin (CreateProduct)
export async function createProduct(formData: FormData) {
    try {
        await prisma.product.create({
            data: {
                id: Number(formData.get("id")),
                family: (formData.get("family") as string),
                name: (formData.get("name") as string),
                img: "/assets/images/cpu/cpu_i3.jpg",
                version: (formData.get("version") as string),
                quantity: 0,
                stock: Number(formData.get("stock")),
                price: Number(formData.get("price")),
            } 
        })
    } catch (error) {
        return {message: "There is an error"};
    }
    revalidatePath("/dashboard/products-admin");
    return {message: "Success!"}
};

// email from /contact
export async function emailSending(formData: FormData) {
    try {
        await prisma.email.create({
            data: {
                email: (formData.get("email") as string),
                message: (formData.get("message") as string),
            }
        })
    } catch (error) {
        return {message: "There is an error!"}
    }
    revalidatePath("/contact");
    return {
        message: "Success!"
    }
};

// EMAIL actions
export async function openEmail(id: string) {
    try {
        await prisma.email.update({
            data: {
                id: id,
                isOpen: true,
            },
            where: {
                id: id,
            }   
        })
    } catch (error) {
        return {message: "There is an error!"};
    }
    revalidatePath("/dashboard/emails-admin");
    return {message: "Success!"};
};

export async function closeEmail(id: string) {
    try {
        await prisma.email.update({
            data: {
                id: id,
                isOpen: false,
            },
            where: {
                id: id,
            }   
        })
    } catch (error) {
        return {message: "There is an error!"}
    }
    revalidatePath("/dashboard/emails-admin");
    return {message: "Success!"}
};

export async function removeEmail(id: string) {
    try {
        await prisma.email.delete({
            where: {
                id: id,
            }
        })
    } catch (error) {
        return {message: "There is an error!"};
    }
    revalidatePath("/dashboard/emails-admin");
    return {message: "Success!"}
};

// deleteMany()

// admin response
export async function adminEmail(formData: FormData) {
    try {
        await prisma.email.create({
            data: {
                email: (formData.get("src") as string),
                message: (formData.get("textMail") as string),
                dst: (formData.get("email") as string),  
            }
        })
    } catch (error) {
        return {
            message: "There is an error"
        };
    }
    revalidatePath("/dashboard/emails-admin");
    return {
        message: "Success!"
    };
};

/* export async function getAvailableProducts()  {
    try {
        await prisma.product.findMany();
    } catch (error) {
        console.log("Error: ", error)
        return "Error: getAvailableProducts fn()";
    }
    revalidatePath("/products/cart");
}
 */