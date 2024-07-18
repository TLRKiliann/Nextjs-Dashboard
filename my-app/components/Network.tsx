/* import filenameIp from '@/utils/data.json';
import filenameBrowser from '@/utils/browseros-data.json';
 */
export default async function Network() {

    const resIp = await fetch("http://localhost:3000/api/dataip");
    if (!resIp) {
        throw new Error("Error: fetch failed with api end-point (resIp)");
    };
    const dataIp = await resIp.json();

    if (!dataIp) {
        throw new Error("Error: fetch failed with api end-point (dataIp)");
    };

    const resBrowser = await fetch("http://localhost:3000/api/databrowser");
    if (!resBrowser) {
        throw new Error("Error: fetch failed with api end-point (resBrowser)");
    };
    const dataBrowser = await resBrowser.json();

    if (!dataBrowser) {
        throw new Error("Error: fetch failed with api end-point (dataBrowser)");
    };

    return (
        <div className='flex justify-start text-green-500 bg-slate-950 w-full h-full'>

            <div className='relative mt-0 h-[100%] z-10 w-full flex items-start justify-center'>

                <div className='absolute -z-10 flex flex-row items-center justify-center w-full h-full overflow-y-scroll no-scrollbar'>

                    <div className='px-4'>
                        {dataIp.map((dataIp: any, index: number) => (
                            <h3 key={index} className='text-base font-bold py-2'>Public IP: {dataIp.data.ip}</h3>
                        ))}
                    </div>

                    <div className='px-4'>
                        {dataBrowser.map((dataBrowser: any, index: number) => (
                            <h3 key={index} className='text-base font-bold py-2'>Browsers: {dataBrowser.browser}</h3>
                        ))}
                    </div>
  
                </div>

            </div>

        </div>
    )
}
