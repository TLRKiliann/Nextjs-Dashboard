import React from 'react';
import BilanContentBox from './bilan-content-box';
import prisma from '@/prisma/prisma';

export default async function BilanSales() {
    
    const sales = await prisma.product.findMany({
        select: {
            quantity: true,
            price: true,
            stock: true
        }
    });

    const totalPrice = sales.reduce((acc: number, item: {quantity: number; price: number;}) => acc + (item.quantity * item.price), 0);
    const totalSales = sales.reduce((acc: number, item: {quantity: number;}) => acc + item.quantity, 0);
    const totalStock = sales.reduce((acc: number, item: {stock: number;}) => acc + item.stock, 0);
    
    return (
        <BilanContentBox 
            str_1="Total Sales"
            str_2="Total Quantity"
            str_3="Total Stock"
            str_4="Best Seller"
            value_1={totalPrice}
            value_2={totalSales}
            value_3={totalStock}
            value_4={"product name"}
        />
    )
}
