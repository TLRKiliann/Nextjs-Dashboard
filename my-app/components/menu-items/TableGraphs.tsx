export default function TableGraphs({children}: {children: React.ReactNode}) {
    return (
        <div className='w-full h-full bg-gradient-to-bl from-slate-900 to-cyan-900 border-none rounded-md shadow-out'>
            <div className='flex items-center justify-between w-full h-full'>
                {children}
            </div>
        </div>
    )
}
