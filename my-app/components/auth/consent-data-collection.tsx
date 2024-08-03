"use client";

import Link from 'next/link';
import { useState } from 'react';

const ConsentDataCollection = (): JSX.Element => {

    const [inputValidate, setInputValidate] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleInputValidation = () => {
        setInputValidate(!inputValidate);
    };

    const handleConsent = () => {
        inputValidate === true ? setIsOpen(false) : null;
    };

    return (
        <>
            {isOpen === true ? (
                <div className="absolute z-20 w-full h-screen flex items-center justify-center bg-slate-50/10 backdrop-blur-sm">

                    <div className="relative z-30 flex items-center justify-center w-[80%] h-[80%] bg-white text-base font-sans text-neutral-700 rounded-md">

                        <div className="absolute z-20 w-full h-full overflow-y-scroll no-scrollbar p-10 rounded-md">

                            <h1 className="text-3xl font-bold mb-10">Consent to Data Collection</h1>

                            <div className='px-8'>

                                <h3 className="text-xl font-bold mb-3">Introduction:</h3>

                                <p className='indent-4 text-justify'>
                                    We respect your privacy and are committed to protecting your personal data. This 
                                    form informs you about the data we collect and how we use it.
                                </p>

                                <hr className='border-solid border-neutral-400 my-10'/>

                                <h3 className="text-xl font-bold mb-3">Data Collected:</h3>

                                <ul className="ml-10">
                                    <li className='list-disc'>
                                        IP Address
                                    </li>
                                    <li className='list-disc'>
                                        Browser Information (type, version, etc.)
                                    </li>
                                    <li className='list-disc'>
                                        Other relevant data (please specify)
                                    </li>
                                </ul>

                                <hr className='border-solid border-neutral-400 my-10'/>

                                <h3 className="text-xl font-bold mb-3">We collect this data to:</h3>
                                <ul className="ml-10">
                                    <li className='list-disc'>
                                        Improve our site and services
                                    </li>
                                    <li className='list-disc'>
                                        Analyze site usage (UX user experience)
                                    </li>
                                    <li className='list-disc'>
                                        Ensure the security of our site
                                    </li>
                                </ul>

                                <hr className='border-solid border-neutral-400 my-10'/>

                                <h3 className="text-xl font-bold mb-3">Consent:</h3>

                                <p className='indent-4 text-justify'>
                                    By checking the box below, you consent to the collection and use of your data as described above.
                                </p>

                                <div className="flex flex-col items-start justify-between w-full bg-slate-200/70 mt-4 px-10 py-4 rounded-md">
                                    
                                    <label htmlFor="consent" className='text-sm mb-4'>
                                        <input 
                                            type="radio" 
                                            id="consent" 
                                            checked={inputValidate} 
                                            onChange={handleInputValidation}
                                            className="mr-2"
                                        />
                                        I agree that my data may be collected and used in accordance with the privacy policy.
                                    </label>

                                    <button 
                                        type="button" 
                                        onClick={handleConsent} 
                                        className="text-slate-50 bg-blue-500 border border-slate-400 px-4 py-1 
                                            disabled:text-slate-500/70 disabled:bg-slate-300 rounded-md"
                                        disabled={inputValidate === false ? true : false}    
                                    >
                                        Submit
                                    </button>

                                </div>
                            

                                <hr className='border-solid border-neutral-400 my-10'/>

                                <h3 className="text-xl font-bold mb-3">Privacy Policy:</h3>

                                <p className='indent-4 text-justify'>
                                    For more information on how we handle your data, please refer to our 
                                    <Link href="/" className="text-blue-500 underline">
                                        [privacy policy](link to your privacy policy)
                                    </Link>
                                </p>

                                <hr className='border-solid border-neutral-400 my-10'/>

                                <h3 className="text-xl font-bold mb-3">Contact:</h3>

                                <p className='indent-4 text-justify'>If you have any questions regarding this form or our privacy policy, please contact us at 
                                    <span className="text-sky-500">&nbsp;admin@prisma.io</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
};
export default ConsentDataCollection;