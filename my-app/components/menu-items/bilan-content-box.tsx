type BoxValuesTypes = {
    str_1: string;
    str_2: string;
    str_3: string;
    str_4: string;
    value_1: number;
    value_2: number;
    value_3: number;
    value_4: string | number;
};

export default function BilanContentBox(
    { 
        str_1, str_2, str_3, str_4, value_1, value_2, value_3, value_4 
    }: BoxValuesTypes) {
    return (
        <div className='flex flex-col justify-between w-full h-full bg-white p-3 2xl:p-6 rounded shadow-sm-out'>
            
            <div className="flex flex-row items-center justify-center bg-slate-100/70 border border-slate-50 px-2 py-1 rounded">
                <p className='w-[65%] text-sm lg:text-base xl:text-lg'>{str_1}:</p>
                <p className='flex justify-end w-[35%] text-sm lg:text-base xl:text-lg'>&nbsp;{value_1}</p>
            </div>

            <div className="flex flex-row items-center justify-center bg-slate-100/70 border border-slate-50 px-2 py-1 rounded">
                <p className='w-[65%] text-sm lg:text-base xl:text-lg'>{str_2}:</p>
                <p className='flex justify-end w-[35%] text-sm lg:text-base xl:text-lg'>&nbsp;{value_2}</p>
            </div>

            <div className="flex flex-row items-center justify-center bg-slate-100/70 border border-slate-50 px-2 py-1 rounded">
                <p className='w-[65%] text-sm lg:text-base xl:text-lg'>{str_3}:</p>
                <p className='flex justify-end w-[35%] text-sm lg:text-base xl:text-lg'>&nbsp;{value_3}</p>
            </div>

            <div className="flex flex-row items-center justify-center bg-slate-100/70 border border-slate-50 px-2 py-1 rounded">
                <p className='w-[65%] text-sm lg:text-base xl:text-lg'>{str_4}:</p>
                <p className='flex justify-end w-[35%] text-sm lg:text-base xl:text-lg'>&nbsp;{value_4}</p>
            </div>

        </div>
    )
}
