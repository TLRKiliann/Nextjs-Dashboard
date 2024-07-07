"use server";

import { ProductsProps } from "./definitions";

export const getProductsData = async () => {
    const response = await fetch("http://localhost:3000/api/products", {
        cache: "no-cache"
    });
    const products = (await response.json()) as ProductsProps[];
    return products;
};