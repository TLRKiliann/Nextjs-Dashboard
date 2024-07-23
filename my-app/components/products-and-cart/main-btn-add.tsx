"use client";

export default function MainBtnAdd({ id, name, quantity }: { 
    id: number, 
    name: string, 
    quantity: number }) {

    return (
        <div key={id} className='flex items-center justify-center mt-4'>
            <input type="number" name="id" value={id} readOnly hidden />
            <button type="submit" 
                className='w-[120px] h-[38px] text-sm font-bold bg-blue-500 hover:bg-blue-600 
                    active:bg-blue-700 rounded disabled:opacity-50 m-auto'
                aria-label={`Add one more ${name}`}
                disabled={quantity > 0 ? true : false}
            >
                Add to Cart
            </button>
        </div>
    )
}
