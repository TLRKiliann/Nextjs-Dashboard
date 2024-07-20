# Nextjs-Dashboard

Handicraft Dashboard

Nextjs 14 - TypeScript - Tailwind - PostgreSQL

![Dashboard Img](https://github.com/TLRKiliann/Nextjs-Dashboard/blob/master/my-app/public/assets/images/bg/wallpaper.png)

## Goals

> Login as User or Admin with NextAuth V5 without api (GitHub & Google)

- Administrator can access to dashboard.
- User can access to products & payment.

**User:**
- main page
- products
- contact (possibility to send message to admin)

**Admin:**
- main page
- dashboard 

**Dashboard with multiple management system:** 
- message
- statistics
- users
- products (best sellers & stock)

---

**Fetch the public IP from :**

> Retrieve the public IP & determine the location by latitude & longitude with react-leaflet map.

[https://jsonip.com/](https://jsonip.com/)

Fetch to retrieve latitude & longitude with ***SECRET_API_KEY*** & ***publicIp*** to customize url, such as:

`https://api.ip2location.io/?key=${SECRET_API_KEY}&ip=${publicIp}`

(You can use the api free of charge with https://www.ip2location.io/).

I had some problems, many times, with a **window is undefined** error. To solve this problem in my RSC (React Server Component), I simply added :

`export const dynamic = "force-dynamic";`

---

**Retrieve Browser & OS from users**

> Display them to user & write them into a file

*Useful link:* [window.navigator.userAgent](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent)

---

> Manage products from store as ADMIN with server-actions & postgresql (prisma)

1. Upadate/Modify
2. Delete
3. Create

`Products.tsx`

`CreateProduct.tsx`

<sub><sup>(They have the same route)</sup></sub>

---

> User can send maessage to Admin & management system message for Admin

- contact (user)
- dashboard (admin)

> Retrieve data from db & data.json to display values in charts

- dashboard (admin)

#### Configuration in .env

```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=PPPPPPPPP
POSTGRES_USER=UUUU
POSTGRES_PASSWORD=XXXX
POSTGRES_DB=DBDBDBD

DATABASE_URL="postgresql://UUUU:XXXX@localhost:PPPPPPPPP/DBDBDBD?schema=public"

# use: "openssl rand -base64 32"
AUTH_SECRET="result of cmd above"
NEXTAUTH_URL=http://localhost:3000

# build mode require this setting:
AUTH_TRUST_HOST=true
```

---

#### Configuration in .gitignore

add `.env` into .gitignore & save the file.

---

#### Files required

All files in app/(auth)/...

- app/api/auth/[...nextauth]/route.ts

- auth.ts

- middleware.ts

- prisma/prisma.ts

- zod

---

***under development***

1. Switch User connection Offline to Online ✅
2. Allow user & admin to change image of profile (upload, save & display) ✅
3. Catch public IP + OS + browser when User is logged in & write data in data.json file. ✅
4. use next-safe-action 

---

## Installation

`$ pnpm add sharp`

`$ pnpm add chart.js react-chartjs-2`

`$ pnpm add react-icons`

`$ pnpm add leaflet`

`$ pnpm add react-leaflet`

(not required @types/react-leaflet = deprecated)

`$ pnpm add zustand`

`$ pnpm add @tanstack/react-query`

`$ pnpm add jsonwebtoken`

`$ pnpm add @types/jsonwebtoken`

`$ pnpm add react-hook-form`

`$ pnpm add zod @hookform/resolvers`

`$ pnpm add zod-form-data`

`$ pnpm add @hookform/error-message`

`$ pnpm add @prisma/client`

`$ pnpm add -D prisma`

`$ pnpm prisma init --datasource-provider postgresql`

(create db & table with PostgreSQL)

`$ pnpm prisma migrate dev --name init`

`$ pnpm add next-auth@beta @auth/prisma-adapter`

`$ pnpm add bcryptjs`

`$ pnpm add -D @types/bcryptjs`

`$ pnpm add react-hot-toast`

`$ pnpm add next-safe-action`

---

## Result

*(Video will be here soon)*

<!-- [<img src="https://img.youtube.com/vi/<VIDEO_ID>/hqdefault.jpg" width="600" height="300"
/>](https://www.youtube.com/embed/<VIDEO_ID>)

[![Watch the video](https://img.youtube.com/vi/<VIDEO_ID>/hqdefault.jpg)](https://www.youtube.com/embed/<VIDEO_ID>)

[<img src="https://img.youtube.com/vi/<VIDEO_ID>/hqdefault.jpg" width="600" height="300"
/>](https://www.youtube.com/embed/<VIDEO_ID>) -->

---

## Ref:

- NextAuth V5:

[auth.ts](https://authjs.dev/getting-started/migrating-to-v5)

- If you get some trouble with prisma migration schema:

[prisma-migrate](https://www.prisma.io/docs/orm/prisma-migrate/workflows/data-migration)


---

Enjoy it ! :koala: