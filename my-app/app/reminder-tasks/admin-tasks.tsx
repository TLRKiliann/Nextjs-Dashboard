"use client";

import React, { useEffect, useState } from 'react';
import { returnDeletedTodo } from '@/lib/functions';

type TodosArrayTypes = {
    id: number; 
    task: string; 
    display: boolean;
};

export default function AdminTasks(): JSX.Element {

    const [todos, setTodos] = useState<TodosArrayTypes[]>([]);
    const [showTask, setShowTask] = useState<boolean>(false);

    useEffect(() => {
        const callerTasks = () => {
            const getTodos = localStorage.getItem("todos");
            if (getTodos) {
                const paresedTodo: TodosArrayTypes[] = JSON.parse(getTodos);
                setTodos(paresedTodo);
            };
        };
        callerTasks();
        return () => console.log("clean-up tasks modal");
    }, [])

    useEffect(() => {
        const callSetLocal = (): void => {
            localStorage.setItem('todos', JSON.stringify(todos));
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

    return (
        <div className='absolute z-50 top-0 right-0 w-[300px] h-auto'>
            
            <button 
                type="button" 
                onClick={handleShowTask}
                className='flex items-center justify-end w-full text-sm text-orange-300 hover:text-orange-400 active:text-orange-500 p-2'
            >
                Tasks
            </button>

            {showTask === true && todos.length !== 0 ? (
                <div className='text-slate-50 bg-orange-500/30 border border-orange-500 px-4 rounded-md'>
                    {todos.map((todo) => (
                        <div key={todo.id} className='flex flex-row items-center justify-between bg-orange-400 border border-orange-600 p-2 my-4 rounded-md'>

                            <p className="">
                                {todo.task}
                            </p>

                            <button type="button" onClick={() => handleDelete(todo.id)}>Delete</button>

                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
};
