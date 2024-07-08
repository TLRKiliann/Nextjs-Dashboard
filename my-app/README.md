- items of menu - profiles + payments (all)
- forgot password
- heaeder-auth dynamic auto-refresh ???
- requests with postgresl & products (admin + user)

client

                        <button onClick={async () => {
                            await prisma.post.updateMany({
                                data: {
                                    quantity: {
                                        increment: 1,
                                    },
                                }
                            });
                            revalidatePath("/cart");
                        }}>
                        </button>