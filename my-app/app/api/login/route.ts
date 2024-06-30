import {cookies, headers} from "next/headers";
import jwt from 'jsonwebtoken';
import { serialize } from 'v8';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export async function GET(req: Request): Promise<Response> {
    if (req.method === "GET") {
        console.log(req.method, "get method done");
    } else {
        console.log(req.method, "get method failed");
    }

    //headers defined
    const requestHeaders = new Headers(req.headers);
    const headersList = headers();

    //thunderclient to display result
    console.log(requestHeaders.get("Authozisation"));
    console.log(headersList.get("Authorization"));

    return Response.json("Method GET Displayed", {status: 200, headers: {
        "Content-Type": "application/json"
    }});
};

export async function POST(req: Request): Promise<Response> {
    if (req.method === 'POST') {
        console.log(req.method, "post method done");
    } else {
        console.log(req.method, "post method failed");
    }
    const body = await req.json();
    if (body.username === 'admin' && body.password === 'password') {
        // set TOKEN
        const cookie = cookies();
        const token = jwt.sign({ username: body.username }, SECRET_KEY, { expiresIn: '1h' });

        const cookieOptions = {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite:'strict'
        }; 
        // set COOKIE with TOKEN
        cookie.set('Set-Cookie', `auth-token=${token}; ${serialize(cookieOptions)}`, {sameSite:'strict'});
        return Response.json({message: "response from POST", body}, {status: 200, headers: {
            "Content-Type": "application/json"
        }});
    } else {
        return Response.json("login not done yet !");
    }
}

