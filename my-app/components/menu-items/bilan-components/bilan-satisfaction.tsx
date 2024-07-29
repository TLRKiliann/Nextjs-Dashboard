import React from 'react'
import { subDays, startOfDay, format, endOfMonth, startOfMonth, startOfYear, endOfYear } from 'date-fns';
import BilanContentBox from './bilan-content-box';

export default async function BilanSatisfaction() {

    return (
        <BilanContentBox 
            str_1="Very satisfied"
            str_2="Good"
            str_3="Neutral"
            str_4="Unsatisfied"
            value_1={0}
            value_2={0}
            value_3={0}
            value_4={0}
        />
    )
}
