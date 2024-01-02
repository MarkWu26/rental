'use client'

import React, { useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi'

interface CleaningInfoProps {
    onClick?: () => void;
    isCleaningFee?: boolean
}

const CleaningInfo: React.FC<CleaningInfoProps> = ({
    onClick,
    isCleaningFee
}) => {

    console.log('two isclean?', isCleaningFee)

    const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='flex flex-row gap-x-2 text-neutral-600'>
    <input type="checkbox" 
    className="text-rose-500 accent-rose-500"
    onClick={onClick}
    checked={isCleaningFee}
    /> 
    Cleaning fee
    <div
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
    >
        <HiInformationCircle size={22} 
        className="text-rose-500 cursor-pointer hover:opacity-90"
        />
        {isHovered && (
            <div className="rounded-xl absolute shadow-xl w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 text-sm z-[15] pr-4 transition ease-in-out duration-200">
                <div className="p-2">
                The cleaning fee is a one-time charge covering the cost of preparing the accommodation for the next guest, ensuring a clean and comfortable environment. It is separate from the nightly rate and contributes to maintaining a high standard of cleanliness.
                </div>
            </div>
        )}
       
       
    </div>
    
    
    
</div>
  )
}

export default CleaningInfo