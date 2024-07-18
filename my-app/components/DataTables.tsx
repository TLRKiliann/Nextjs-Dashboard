import filenameIp from '@/utils/data.json';
import filenameBrowser from '@/utils/browseros-data.json';

export default async function DataTables() {

    return (
        <div className='flex justify-start w-full h-full'>

            <div className='w-full flex items-start justify-center'>

                <div className='flex flex-row items-center justify-center w-full'>

                    <div className='px-4'>
                        {filenameIp.map((data, index) => (
                            <h3 key={index} className='text-base font-bold py-2'>Public IP: {data.data.ip}</h3>
                        ))}
                    </div>

                    <div className='px-4'>
                        {filenameBrowser.map((item, index) => (
                            <h3 key={index} className='text-base font-bold py-2'>Browsers: {item.browser}</h3>
                        ))}
                    </div>
  
                </div>

            </div>

        </div>
    )
}
