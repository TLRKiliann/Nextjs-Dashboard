"use client";

import type { TodosArrayTypes } from '@/lib/definitions';
import React, { useEffect, useState } from 'react';
import { returnDeletedTodo } from '@/lib/functions';
import { FaTrashCan } from 'react-icons/fa6';

export default function AdminTasks(): JSX.Element | null {

    const [todos, setTodos] = useState<TodosArrayTypes[]>([]);
    const [showTask, setShowTask] = useState<boolean>(false);

    useEffect(() => {
        const callerTasks = () => {
            const getTodos: string | null = localStorage.getItem("todos");
            if (getTodos) {
                try {
                    const paresedTodo: TodosArrayTypes[] = JSON.parse(getTodos);
                    setTodos(paresedTodo);
                } catch (error) {
                    console.error("Error with admin tasks", error);
                }
            };
        };
        callerTasks();
        const timer = setInterval(callerTasks, 30000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const callSetLocal = (): void => {
            if (Array.isArray(todos)) {
                localStorage.setItem('todos', JSON.stringify(todos));
            };
        };
        callSetLocal();
        return () => console.log("clean-up localStorage.setItem");
    }, [todos]);

    const handleShowTask = (): void => {
        setShowTask(!showTask);
    };

    const handleDelete = (id: number) => {
        if (todos.map((todo: TodosArrayTypes) => todo.id === id)) {
            returnDeletedTodo({id, newTodosArray: todos, setNewTodosArray: setTodos});
        };
    };

    if (todos.length === 0) {
        return null;
    };

    return (
        <div className='absolute z-50 top-0 right-0 w-[300px] h-auto'>
            
            <button 
                type="button" 
                onClick={handleShowTask}
                className='flex items-center justify-end w-full text-sm text-orange-300 hover:text-orange-400 active:text-orange-500 p-2'
            >
                Tasks
            </button>

            {showTask === true ? (
                <div className='text-slate-50 bg-orange-500/30 border border-orange-500 px-4 rounded-md'>
                    {todos.map((todo) => (
                        <div key={todo.id} className='flex flex-row items-center justify-between bg-gradient-to-r from-orange-400 to-red-500 border border-orange-600 p-2 my-4 rounded-md'>

                            <p className="text-base">
                                {todo.task}
                            </p>

                            <span 
                                onClick={() => handleDelete(todo.id)}
                                className="cursor-pointer hover:text-orange-200 active:text-orange-400"    
                            >
                                <FaTrashCan size={16} />
                            </span>

                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
};
