// reusable component for form-change-product.tsx

type InputModifyProps = {
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string; 
};

export default function InputModify({type, value, onChange, placeholder}: InputModifyProps) {
    return (
        <input type={type} value={value} onChange={onChange} 
            placeholder={placeholder}
            required
            className='w-[15%] bg-slate-50 border border-slate-500/70 outline-none ring-none  
                focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                focus:ring-blue-300 focus:bg-white rounded ml-2 px-2 py-1'
        />
    )
};