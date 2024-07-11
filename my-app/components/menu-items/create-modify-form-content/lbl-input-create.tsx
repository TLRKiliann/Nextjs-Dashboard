// reusable component for form-create-content.tsx

type LblInputCreateProps = {
    id: string;
    type: string;
    name: string;
    htmlFor: string; 
    value: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
};

export default function LblInputCreate({id, type, name, htmlFor, value, onChange, children}: LblInputCreateProps) {
    //value={value !== typeof (value as string) ? value : Number(value)} 
    return (
        <div className='flex flex-row items-center justify-between mb-3'>
                    
            <label className="text-lg mr-4" htmlFor={htmlFor}>{children}</label>

            <input
                type={type}
                id={id}
                name={name} 
                value={value} 
                onChange={onChange} 
                className='bg-slate-50 border border-slate-500/70 outline-none ring-none
                focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                focus:ring-blue-300 focus:bg-white rounded px-2 py-1'
            />

        </div>
    )
};
