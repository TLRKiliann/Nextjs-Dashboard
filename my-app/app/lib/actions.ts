"use server";

//import { redirect } from "next/navigation";
import { State } from "./definitions";

export async function onSubmitFunc(prevState: State | null, data: FormData): Promise<State> {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            //redirect('/products');
            return {
                status: "success",
                message: `Welcome, ${data.get("username")} ${data.get("password")}!`,
            };
        } else {
            alert('Invalid credentials');
            throw new Error('Server validation error');
        }
    } catch (error) {
        console.error((error as Error).message);
    }
};