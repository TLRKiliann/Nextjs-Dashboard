# Nextjs-Dashboard

Handycraft Dashboard

Nextjs 14 - TypeScript - Tailwind

![Dashboard Img](https://github.com/TLRKiliann/Nextjs-Dashboard/blob/master/my-app/public/assets/images/bg/wallpaper.png)

### Goals

> Retrieve the public IP & determine the location by latitude & longitude on the react-leaflet map.

I fetched the public IP from :

[https://jsonip.com/](https://jsonip.com/)

I have a second fetch to retrieve latitude & longitude with ***SECRET_API_KEY*** & ***publicIp*** to customize url, such as:

`https://api.ip2location.io/?key=${SECRET_API_KEY}&ip=${publicIp}`

(You can use the api free of charge with https://www.ip2location.io/).

I had some problems with a **window is undefined** error. To solve this problem in my RSC (React Server Component), I simply added :

`export const dynamic = "force-dynamic";`

---

> Get browser & OS of user 

In FireFox you can get both with `slice()` function:

[window.navigator.userAgent](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent)

(I have to test it on chrome)

---

> Manage products (delete & create) as ADMIN

1. Products.tsx 
2. CreateProduct.tsx
3. Same route for both

---

*under development*

> Login to access to the dashboard by a middleware.

1. Switch User connection Offline to Online
2. Catch public IP with date when User logs in
3. Access dashboard for Admin (only)
4. Access Cart and Products for User.
5. State management with Zustand
6. Asynchronous state management useQuery

---

*under development*

> Use NextAuth without API connection, but with credentials of db.

1. PostgreSQL
2. Prisma
3. NextAuth

---

## Installation

`$ pnpm add sharp`

`$ pnpm add chart.js react-chartjs-2`

`$ pnpm add react-icons`

`$ pnpm add leaflet`

`$ pnpm add react-leaflet`

`$ pnpm add zustand`

`$ pnpm add @tanstack/react-query`

`$ pnpm add jsonwebtoken`

`$ pnpm add @types/jsonwebtoken`

`$ pnpm add react-hook-form`

`$ pnpm add zod @hookform/resolvers`

`$ pnpm add zod-form-data`

`$ pnpm add @hookform/error-message`

//prisma + NextAuth

(not required @types/react-leaflet = deprecated)

---

## Result

*(Video will be here soon)*

<!-- [<img src="https://img.youtube.com/vi/<VIDEO_ID>/hqdefault.jpg" width="600" height="300"
/>](https://www.youtube.com/embed/<VIDEO_ID>)

[![Watch the video](https://img.youtube.com/vi/<VIDEO_ID>/hqdefault.jpg)](https://www.youtube.com/embed/<VIDEO_ID>)

[<img src="https://img.youtube.com/vi/<VIDEO_ID>/hqdefault.jpg" width="600" height="300"
/>](https://www.youtube.com/embed/<VIDEO_ID>) -->


---

Enjoy it ! :koala: