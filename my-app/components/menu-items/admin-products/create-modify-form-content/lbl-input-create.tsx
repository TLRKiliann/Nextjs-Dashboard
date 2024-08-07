type LblInputCreateProps = {
    id: string;
    type: string;
    name: string;
    htmlFor: string; 
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholdervalue: string;
    children: React.ReactNode;
};

export default function LblInputCreate({id, type, name, htmlFor, value, onChange, placeholdervalue, children}: LblInputCreateProps) {
    return (
        <div className='flex flex-row items-center justify-between mb-3'>
                    
            <label className="text-lg mr-4" htmlFor={htmlFor}>{children}</label>

            <input
                type={type}
                id={id}
                name={name} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholdervalue}
                className='text-slate-800 bg-slate-50 border border-slate-500/70 outline-none ring-none
                placeholder:text-slate-500/80
                focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                focus:ring-blue-300 focus:bg-white rounded px-2 py-0 xl:py-1'
                required
            />

        </div>
    )
};
