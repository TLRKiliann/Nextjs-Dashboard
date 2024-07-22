1) 
- seed user + corresponding products
- seed data for charts
- all-user-profiles
- searchbar (more args)
- charts (graphs) with data from db

2) 
- next-safe-action to add with server action
- retrieve data from file.json to display it in Data Table (graph)

3) 
- order + payments (user + auth)
- forgot password

//react 19
//import React, { useActionState } from 'react'
    //const [error, action, isPending] = useActionState(removeFromCart, null);

// Don't use useQuery in NextJS
// Don't use auth in layout.tsx

$ pnpm prisma db push

$ pnpm prisma db seed

$ pnpm prisma studio

Image
layout="fill"

"/settings" => "/profile" = BUG avec navigateur + os