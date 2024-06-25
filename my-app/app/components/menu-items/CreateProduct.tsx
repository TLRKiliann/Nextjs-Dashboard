import React from 'react'

export default function CreateProduct() {
    return (
        <div className='flex flex-col justify-center h-[40%] bg-slate-200'>

            <div className='h-1/5 px-4'>
                <h2 className='text-lg m-auto'>Create</h2>
            </div>

            <div className='h-4/5 flex flex-col items-center justify-center'>

                <form action="" className='w-[400px] h-full rounded-lg p-4'>
                    
                    <div className='w-full flex flex-row items-start justify-between mb-3'>
                        <label htmlFor="name">Name of product</label>
                        <input type="text" id="name" name="name" />
                    </div>

                    <div className='w-full flex flex-row items-start justify-between mb-3'>
                        <label htmlFor="img">Img of product</label>
                        <input type="text" id="img" name="img" />
                    </div>

                    <div className='w-full flex flex-row items-start justify-between mb-3'>
                        <label htmlFor="stock">Stock of product</label>
                        <input type="number" id="stock" name="stock" />
                    </div>

                    <div className='w-full flex flex-row items-start justify-between mb-3'>
                        <label htmlFor="price">Price of product</label>
                        <input type="number" id="price" name="price" />
                    </div>

                    <div className='flex items-center justify-center mt-4'>
                        <button type="button"
                            className='text-slate-100 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded px-4 py-1'
                        >
                            Create Product
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}
