import React from 'react';
import BilanContentBox from './bilan-content-box';
import prisma from '@/prisma/prisma';

type CartTypes = {
    name: string;
    quantity: number;
    stock: number;
    price: number;
}

export default async function BilanSales() {
    
    const sales: CartTypes[] | null = await prisma.cart.findMany({
        select: {
            name: true,
            quantity: true,
            price: true,
            stock: true
        }
    });

    if (sales.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <h3>No products in cart!</h3>
            </div>
        )
    };

    const totalPrice = sales.reduce((acc: number, item: {quantity: number; price: number;}) => acc + (item.quantity * item.price), 0);
    const totalSales = sales.reduce((acc: number, item: {quantity: number;}) => acc + item.quantity, 0);
    const totalStock = sales.reduce((acc: number, item: {stock: number;}) => acc + item.stock, 0);
    
    const sortedProducts = sales.sort((a, b) => b.quantity - a.quantity);

    // Extract labels and dataset values from sorted products
    const findBestSellerProduct = sortedProducts.map((product: CartTypes) => product.name);
    const bestSellerName = findBestSellerProduct[0];

    return (
        <BilanContentBox 
            str_1="Total Sales"
            str_2="Total Quantity"
            str_3="Total Stock"
            str_4="Best Seller"
            value_1={`${totalPrice}.-`}
            value_2={`${totalSales} units`}
            value_3={`${totalStock} pc`}
            value_4={bestSellerName}
        />
    )
}
