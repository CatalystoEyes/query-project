import { FaCheckCircle } from "react-icons/fa";
import { useState } from 'react';


export default function Check(){
    const [isChecked, setChecked] = useState(false);

    const handleClick = () => {
        setChecked(!isChecked);
    };
    return(
        <div className={`border-2 border-slate-400 rounded-xl w-6  h-6 mr-3 flex hover:border-slate-200 duration-200`}
            onClick={handleClick}>
            {isChecked && (
                <FaCheckCircle size={20} className='text-slate-100  font-bold' />
            )}
        </div>
    )
}