"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";

type ListOfItemsProps = {
    id: number;
    item: string;
}

const listOfItems: ListOfItemsProps[] = [
    {
        id: 1,
        item: "profile"
    },
    {
        id: 2,
        item: "login"
    },
    {
        id: 3,
        item: "register"
    },
    {
        id: 4,
        item: "product"
    }
];

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
                console.log(mapping)
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
        <div className='relative w-full z-10 border border-slate-200'>
    
            <FaSearch className='absolute my-2 ml-2 z-20' size={18} />

            <input type="text" 
                value={searchWord} 
                onChange={(e) => handleChange(e)}
                className='w-[100%] text-base border bg-slate-50 
                    focus:w-[400px] focus:ring-1 focus:ring-blue-500 focus:border-none 
                    focus:outline-none focus:text-slate-600 shadow-inner rounded-full pl-8 py-1'
                placeholder="Search"
            />

            <div className='absolute right-2 left-2 bg-slate-50/60'>
                {searchWord ? dataUrl.map((data) => (
                    <li key={data.id} className="text-slate-500 hover:text-blue-500 
                        hover:bg-blue-200/20 px-4 py-1">
                        <Link href={`/${data.item}`}>{data.item}</Link>
                    </li>
                )): null}
            </div>

        </div>
    )
}
