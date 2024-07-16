import Link from 'next/link';

export default function TablePage({title, url, link, children}: 
    {title: string; url: string; link: string; children: React.ReactNode;}) {
    return (
        <div className='w-full'>

            <div className='h-[10%]'>
                <h2 className='text-xl'>{title}</h2>
            </div>

            {children}

            <div className='flex items-end justify-end h-[10%]'>
                <li className='list-none text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    <Link href={url}>{link}</Link>
                </li>
            </div>

        </div>
    )
};
