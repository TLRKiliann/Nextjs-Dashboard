# Nextjs-Dashboard

Handycraft Dashboard

Nextjs 14 - TypeScript - Tailwind

**Goals:**

- Retrieve the public IP & determine the location by latitude & longitude on the react-leaflet map.

I did a fetch to retrive public IP from `https://jsonip.com/`.

My second fetch to retrieve latitude & longitude with `SECRET_API_KEY` & `publicIp` to customize url, such as:

`https://api.ip2location.io/?key=${SECRET_API_KEY}&ip=${publicIp}`

I had some problems with a "window is undefined" error. To solve this problem in my RSC (React Server Component), I simply added :

`export const dynamic = "force-dynamic";`

---

- Get browser & OS of user 

In FireFox you can get both with `slice()` function:

`window.navigator.userAgent`

(I have to test it on chrome)

---

- Login to access to the dashboard by a middleware.
- Use NextAuth without API connection, but with credentials of db.
- Switch user connection Offline to Online.

## Installation

$ pnpm add sharp

$ pnpm add chart.js react-chartjs-2

$ pnpm add leaflet

$ pnpm add react-leaflet

(not required @types/react-leaflet = deprecated)

$ pnpm add react-icons

$ pnpm add @nextui-org/react

$ pnpm add @nextui-org/modal
