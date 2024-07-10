- items of menu - profiles + payments (all)
- forgot password
- heaeder-auth dynamic auto-refresh ???
- requests with postgresl & products (admin + user)


//react 19
//import React, { useActionState } from 'react'
    //const [error, action, isPending] = useActionState(removeFromCart, null);

// Don't use useQuery in NextJS
// Don't use auth in layout.tsx


$ pnpm prisma db push

$ pnpm prisma studio

$ pnpm prisma db seed



/*                             <>
                                <div className='w-[25%] flex flex-row items-center justify-between font-bold'>
                                    
                                    <input type="text" value={allState.family} onChange={(e)=> handleFamily(e)} 
                                        placeholder={product.family} 
                                        className='w-2/5 bg-slate-50 border border-slate-500/70 outline-none ring-none  
                                            focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                                            focus:ring-blue-300 focus:bg-white rounded ml-2 px-2 py-1'
                                    />
                                    <input type="text" value={allState.name} onChange={(e)=> handleName(e)} 
                                        placeholder={product.name} 
                                        className='w-2/5 bg-slate-50 border border-slate-500/70 outline-none ring-none
                                            focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                                            focus:ring-blue-300 focus:bg-white rounded px-2 py-1'
                                    />
                                </div>
                    
                                <div className='w-[40%] flex flex-row items-center justify-around'>
                                    <input type="text" value={allState.stock} onChange={(e) => handleStock(e)} 
                                        placeholder={String(product.stock)}
                                        className='w-[100px] bg-slate-50 border border-slate-500/70 outline-none ring-none  
                                            focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                                            focus:ring-blue-300 focus:bg-white rounded ml-2 px-2 py-1'
                                    />
                                    <input type="text" value={allState.price} onChange={(e) => handlePrice(e)} 
                                        placeholder={String(product.price)} 
                                        className='w-[100px] bg-slate-50 border border-slate-500/70 outline-none ring-none  
                                            focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                                            focus:ring-blue-300 focus:bg-white rounded px-2 py-1'
                                    />
                                </div>
                            </> */