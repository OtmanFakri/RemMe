"use client";
import { useAtom } from 'jotai';
import {EventExports12, getTodoList, updateTodo} from "@/app/pages/actionTodo";
import {useEffect} from "react";
import UpdateCompletedr from "@/app/pages/updateCompleted";


const Page = () => {
    const [todos, setTodos] = useAtom(EventExports12);

    useEffect(() => {
        const fetchTodoList = async () => {
            const todoList = await getTodoList();
            setTodos(todoList);
        };
        fetchTodoList();
    }, []);

    return (
        <div className="app">
            <h1>Todo List</h1>
            <ul>
                {todos.map((item) => (
                    <li key={item.id}>
                        <h3>Name: {item.title}</h3>
                        <p>Type: {item.type}</p>
                        <UpdateCompletedr event={item} />
                        <p>----------------------</p>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default Page;