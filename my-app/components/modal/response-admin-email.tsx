"use client";

import { adminEmail } from "@/lib/actions";
import { User } from "next-auth";
import { useState } from "react";

export default function ResponseAdminEmail({ id, dst, user, prevMsg }: 
  { id: string; dst: string; user: User; prevMsg: string; }) {

  const [isShow, setIsShow] = useState<boolean>(false);
  const [textMail, setTextMail] = useState<string>("");

  const handleShow = () => {
    setIsShow(!isShow);
  };

  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTextMail(event.target.value);
  };

  return (
    <div key={id}>
      <div>
        <button type="button" onClick={handleShow}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-1 rounded">
          Send email
        </button>
      </div>

      {isShow === true ? (
        <div className='fixed z-40 flex items-center bg-slate-700/50 w-[80%] xl:w-[86%] right-0 top-0 bottom-0 backdrop-blur-sm'>
          <form action={adminEmail} className='z-50 flex flex-col w-[600px] h-auto bg-slate-800 text-slate-100  
            m-auto p-4 rounded shadow-out'>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Send message</h2>
            </div>

            <div className="flex items-center justify-between w-[300px] m-auto">
              <label htmlFor="src">From:</label>
              <input type="text" id="src" name="src" value={user?.email!} 
                className="text-slate-800 px-2 py-1 rounded" />
            </div>

            <div className="flex items-center justify-between w-[300px] m-auto my-4">
              <label htmlFor="dst">To:</label>
              <input type="text" id="dst" name="dst" value={dst} 
                className="text-slate-500 px-2 py-1 rounded" />
            </div>

            <div className="flex justify-center mb-4">
              <textarea name="textMail" id="textMail" cols={34} rows={10}
                value={textMail} onChange={(e) => handleTextArea(e)}
                placeholder={prevMsg}
                className="text-slate-800 m-auto p-2 rounded shadow-in">
              </textarea>
            </div>

            <div className="flex flex-row items-center justify-end w-full">
              <button 
                type="button" 
                onClick={handleShow} 
                className="bg-slate-500 hover:bg-slate-600 active:bg-slate-700 px-4 py-1 rounded">
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-1 rounded ml-4">
                Send
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
};

