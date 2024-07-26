import { readFile } from "fs/promises";

export default async function Network() {
    
    const filenameBrowser = './utils/browseros-data.json';
    const file = await readFile(filenameBrowser, { encoding: 'utf8' });
    const dataBrowser = JSON.parse(file);

    const filenameIp = './utils/ip-data.json';
    const fileIp = await readFile(filenameIp, { encoding: 'utf8' });
    const dataIp = JSON.parse(fileIp);

    return (
        <div className='flex justify-start text-green-500 bg-slate-950 w-full h-full rounded-lg'>
            <div className='relative mt-0 h-[100%] z-10 w-full flex items-start justify-center'>
                <div className='absolute -z-10 flex flex-row items-start justify-center w-full h-full overflow-y-scroll no-scrollbar py-4'>

                    <div className='px-4'>
                        {dataIp.map((dataIp: {data: {ip: string}}, index: number) => (
                            <h3 key={index} className='text-base font-bold py-2'>✅ Public IP: {dataIp.data.ip}</h3>
                        ))}
                    </div>

                    <div className='px-4'>
                        {dataBrowser.map((dataBrowser: {browser: string}, index: number) => (
                            <h3 key={index} className='text-base font-bold py-2'>Browsers: {dataBrowser.browser}</h3>
                        ))}
                    </div>
  
                </div>
            </div>
        </div>
    )
};