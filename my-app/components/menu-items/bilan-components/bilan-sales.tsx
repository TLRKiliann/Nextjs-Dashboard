import React from 'react'
import { subDays, startOfDay, format, endOfMonth, startOfMonth, startOfYear, endOfYear } from 'date-fns';
import BilanContentBox from './bilan-content-box';

export default async function BilanSales() {

    
    return (
        <BilanContentBox 
            str_1="Total Sales"
            str_2="Total Quantity"
            str_3="Total Stock"
            str_4="Best Seller"
            value_1={0}
            value_2={0}
            value_3={0}
            value_4={"product name"}
        />
    )
}
