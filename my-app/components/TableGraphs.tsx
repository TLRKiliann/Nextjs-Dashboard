export default function TableGraphs({children}: {children: React.ReactNode}) {
    return (
        <div className='w-full h-full bg-slate-800 border border-slate-700/30'>
            <div className='flex items-center justify-center w-full h-full'>
                {children}
            </div>
        </div>
    )
}
