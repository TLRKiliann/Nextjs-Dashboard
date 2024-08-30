import { readFile } from "fs/promises";

type DataIpProps = {
    dataIpUser: {
        data: {
            ip: string;
        };
    };
    username: string;
};

export default async function Network() {
    
    const filenameBrowser = './utils/browseros-data.json';
    const file = await readFile(filenameBrowser, { encoding: 'utf8' });
    if (!file) {
        throw new Error("Something went wrong with browser data.");
    };
    const dataBrowser = JSON.parse(file);

    const filenameIp = './utils/ip-data.json';
    const fileIp = await readFile(filenameIp, { encoding: 'utf8' });
    if (!fileIp) {
        throw new Error("Something went wrong with public ip");
    };
    const dataIp: DataIpProps[] = JSON.parse(fileIp);

    return (
        <div className='flex justify-start text-green-500 bg-slate-950 w-full h-full rounded-lg'>
            <div className='relative mt-0 h-[100%] z-10 w-full flex items-start justify-center'>
                <div className='absolute -z-10 flex flex-row items-start justify-center w-full h-full overflow-y-scroll no-scrollbar py-4'>

                    <div className='px-4'>
                        {dataIp.map((dataIp: DataIpProps, index: number) => (
                            <h3 key={index} className='text-sm font-bold py-2'>✅ Public IP: {dataIp.dataIpUser.data.ip} - {dataIp.username}</h3>
                        ))}
                    </div>

                    <div className='px-4'>
                        {dataBrowser.map((dataBrowser: {browser: string, username: string}, index: number) => (
                            <h3 key={index} className='text-sm font-bold py-2'>Browsers: {dataBrowser.browser}</h3>
                        ))}
                    </div>
  
                </div>
            </div>
        </div>
    )
};