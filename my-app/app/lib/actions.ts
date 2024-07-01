"use server";

import { State } from "./definitions";
import { formSchema, formSchemaRegister } from "./validation";
import { ZodError } from "zod";

export async function onLoginFunc(prevState: State | null, data: FormData): Promise<State> {
    try {
        //artificial promise to delete with server
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Validate our data
        const { username, password } = formSchema.parse(data);
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            //const responseData = (await response.json()) as State;
            //console.log(responseData);
            return {
                status: "success",
                message: `Welcome, ${username} ${password}!`,
            };
        } else {
            alert('Invalid credentials');
            throw new Error('Server validation error');
        }
    } catch (e) {
        // In case of a ZodError (caused by our validation) we're adding issues to our response
        if (e instanceof ZodError) {
            return {
                status: "error",
                message: "Invalid form data",
                errors: e.issues.map((issue) => ({
                path: issue.path.join("."),
                message: `Server validation: ${issue.message}`,
            })),
          };
        }
        return {
            status: "error",
            message: "Something went wrong. Please try again.",
        };
    }
};

export async function onRegisterFunc(prevState: State | null, data: FormData): Promise<State> {
    try {
        //artificial promise to delete with server
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { username, email, password } = formSchemaRegister.parse(data);
        return {
            status: "success",
            message: `Welcome, ${username} ${email} ${password}!`,
        };
    } catch (error) {
        console.error((error as Error).message);
    }
};