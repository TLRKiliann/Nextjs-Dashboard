"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { returnDeletedTodo } from '@/lib/functions';
import { FaTrashCan } from 'react-icons/fa6';
import { FaPenToSquare } from "react-icons/fa6";
import { RiSave3Fill } from "react-icons/ri";
import imgTask from '@/public/assets/images/bg/task.png';

type TodosArrayTypes = {
    id: number; 
    task: string; 
    display: boolean;
};

export default function TasksContent(): JSX.Element {

    const [todo, setTodo] = useState<string>("");
    const [newTodosArray, setNewTodosArray] = useState<TodosArrayTypes[]>([]);

    useEffect(() => {
        const callLocal = (): void => {
            const storedTodos: string | null = localStorage.getItem('todos');
            if (storedTodos) {
                try {
                    const parsedTodo: TodosArrayTypes[] = JSON.parse(storedTodos);
                    setNewTodosArray(parsedTodo);
                } catch (error) {
                    console.error("Error with task-content");
                }
            };
        };
        callLocal();
        return () => console.log("clean-up task-content 1");
    }, []);

    useEffect(() => {
        const callSetLocal = (): void => {
            if (Array.isArray(newTodosArray)) {
                localStorage.setItem('todos', JSON.stringify(newTodosArray));
            };
        };
        callSetLocal();
        return () => console.log("clean-up task-content 2");
    }, [newTodosArray]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value }: HTMLInputElement = event.currentTarget;
        setTodo(value);
    };

    const handleClick = (): void | null => {
        if (todo !== "") {
            setNewTodosArray((prev: TodosArrayTypes[]) => ([...prev, {id: Date.now(), task: todo, display: false}]));
            setTodo("");
        };
        return null;
    };

    const handleNewTodo = (event: React.ChangeEvent<HTMLInputElement>, id: number): void => {
        const { value }: HTMLInputElement = event.currentTarget;
        const findId: TodosArrayTypes[] = newTodosArray.map((item: TodosArrayTypes) => item.id === id 
            ? {...item, id: item.id, task: value} 
            : item);
        setNewTodosArray(findId);
    };

    const handleModify = (id: number): void => {
        const findIdModify: TodosArrayTypes[] = newTodosArray.map((totask: TodosArrayTypes) => totask.id === id 
            ? {...totask, id: totask.id, display: true} 
            : totask);
        setNewTodosArray(findIdModify);
    };

    const handleSave = (id: number): void => {
        const findIdSave: TodosArrayTypes[] = newTodosArray.map((totask: TodosArrayTypes) => totask.id === id 
            ? {...totask, id: totask.id, display: false} 
            : totask);
        setNewTodosArray(findIdSave);
    };

    const handleDelete = (id: number) => {
        if (newTodosArray.map((todo: TodosArrayTypes) => todo.id === id)) {
            returnDeletedTodo({id, newTodosArray, setNewTodosArray});
        };
    };

    return (
        <div className='relative z-10 w-full h-[100%] border border-dashed border-slate-500 p-4 rounded'>
            <div className='absolute -z-20 w-[95%] h-[95%] flex items-center justify-center'>
                <Image
                    src={imgTask}
                    priority={true}
                    width={500}
                    height={500}
                    alt="no-img-bg"
                    className='opacity-70 object-cover'
                />
            </div>

            <h1 className='text-3xl font-bold text-blue-500/80'>
                Tasks
            </h1>
            <div className='flex flex-row items-center justify-center w-4/5 bg-gradient-to-l from-orange-400 to-yellow-100 border border-orange-100 m-auto my-4 py-2 rounded-full'>
                <input
                    type="text"
                    value={todo}
                    onChange={(e) => handleChange(e)}
                    placeholder='Enter a todo task here...'
                    className="block w-[300px] xl:w-[400px] text-sm font-normal text-gray-700 bg-white 
                        border border-solid border-gray-300 transition ease-in-out m-0 
                        focus:text-gray-700 focus:bg-white focus:border-orange-400 focus:outline-none 
                        mr-4 px-3 py-2 rounded-full"
                />
                <button
                    type="button"
                    onClick={handleClick}
                    className='absolute flex items-center justify-center w-[30px] h-[30px] ml-[250px] xl:ml-[350px] text-xl font-bold text-slate-50 bg-blue-500 
                    transition ease-in-out duration-100 hover:text-slate-200 hover:bg-blue-600 hover:scale-105 active:text-sky-300 active:bg-blue-700 active:scale-95 rounded-full'
                >
                    +
                </button>
            </div>

            {newTodosArray.map((item) => (
                <div 
                    key={item.id} 
                    className='flex flex-row items-center justify-between w-4/5 bg-gradient-to-l from-orange-400 to-yellow-100 border border-orange-100 m-auto mb-2 p-2 rounded'>
                    
                    {item.display === false ? (
                        <div 
                            key={item.id} 
                            className='flex flex-row items-center justify-between w-full'>
                            <p>{item.task}</p>
                            <span
                                onClick={() => handleModify(item.id)} 
                                className='text-slate-50 bg-blue-500 cursor-pointer transition ease-in-out duration-100 hover:bg-blue-600 hover:text-slate-200 hover:scale-105
                                active:text-sky-500 active:bg-blue-700 active:scale-95 mr-4 p-2 rounded'
                            >
                                <FaPenToSquare size={18} />
                            </span>
                        </div>
                    ) : (
                        <div 
                            key={item.id} 
                            className='flex flex-row items-center justify-between w-full'>
                            <input
                                type="text"
                                value={item.task}
                                onChange={(e) => handleNewTodo(e, item.id)} 
                                className='mr-4 px-2 py-1 rounded'
                            />
                            <span
                                onClick={() => handleSave(item.id)} 
                                className='text-slate-50 bg-blue-500 cursor-pointer transition ease-in-out duration-100 
                                hover:text-slate-200 hover:bg-blue-600 hover:scale-105 active:text-sky-500 active:bg-blue-700 active:scale-95 mr-4 p-[6px] rounded'
                            >
                                <RiSave3Fill size={22} />
                            </span>
                        </div>
                    )}

                    <span
                        onClick={() => handleDelete(item.id)} 
                        className='text-slate-50 bg-red-500 cursor-pointer transition ease-in-out duration-100 hover:text-slate-200 hover:bg-red-600 
                        hover:scale-105 active:text-orange-500 active:bg-red-700 active:scale-95 p-2 rounded'
                    >
                        <FaTrashCan size={18} />
                    </span>

                </div>
            )).reverse()}

        </div>
    )
};
