"use client";

import { ListOfItemsProps } from '@/lib/definitions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { listOfItems } from '@/lib/search-items';
import { FaSearch } from "react-icons/fa";

export default function Searchbar() {

    const [searchWord, setSearchWord] = useState<string>("");
    const [dataUrl, setDataUrl] = useState<ListOfItemsProps[]>([]);

    const derivatedSearchWord: string = searchWord;

    useEffect(() => {
        const caller = () => {
            if (derivatedSearchWord !== undefined) {
                const mapping = listOfItems.filter((list: ListOfItemsProps) => (
                    list.item.toLowerCase().includes(derivatedSearchWord.toLowerCase()))
                );
                setDataUrl(mapping);
            }
        }
        caller();
        return () => console.log("clean-up");
    }, [derivatedSearchWord]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(event?.target.value);
    };

    return (
        <div className='relative w-full z-10'>
    
            <FaSearch className='absolute my-2 ml-2 z-20' size={18} />

            <input type="text" 
                value={searchWord} 
                onChange={(e) => handleChange(e)}
                className='w-[100%] text-base border bg-slate-50 focus:ring-1 
                    focus:ring-blue-500 focus:border-none focus:outline-none focus:text-slate-600 
                    shadow-inner rounded-full pl-8 py-1'
                placeholder="Search"
            />

            <div className='absolute right-2 left-2 bg-slate-50/60'>
                {searchWord ? dataUrl.map((data: ListOfItemsProps) => (
                    <li key={data.id} className="w-full text-slate-500 hover:text-blue-500 
                        hover:bg-blue-200/20 px-6 py-1">
                        <Link href={`/${data.item}`}>{data.item}</Link>
                    </li>
                )): null}
            </div>

        </div>
    )
}
