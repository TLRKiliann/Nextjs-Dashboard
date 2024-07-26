export default function TableGraphs({children}: {children: React.ReactNode}) {
    return (
        <div className='w-full h-full bg-white border-none rounded-md shadow-sm-out'>
            <div className='flex items-center justify-center w-full h-full'>
                {children}
            </div>
        </div>
    )
}
