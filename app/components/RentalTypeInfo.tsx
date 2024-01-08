'use client'

import { useState } from "react";
import { HiInformationCircle } from 'react-icons/hi'

interface RentalInfoProps {
    rentalType: string;
}

const RentalTypeInfo: React.FC<RentalInfoProps> = ({
    rentalType
}) => {

  const [isHovered, setIsHovered] = useState(false);

 /*  description: 'Short-term rentals are temporary accommodations leased for stays typically lasting up to 28 days, catering to individuals seeking brief stays, such as tourists or business travelers. These rentals offer flexibility without the commitment of a long-term lease.'
},
{
    label: 'longTerm',
    name: 'Long Term Rental',
    description: 'Long-term rentals extend beyond 28 days, providing extended housing solutions for individuals seeking more prolonged stays, such as those relocating, on extended work assignments, or in need of stable, extended-term accommodations.'
} */

  return (
    <div
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
    className="font-light"
    >
        <HiInformationCircle size={20} 
        className="text-rose-500 cursor-pointer hover:opacity-90"
        />
        {isHovered && rentalType === 'shortTerm' && (
            <div className="rounded-xl absolute shadow-xl w-[30vw] bg-white overflow-hidden right-0 text-sm z-[15] pr-4 transition ease-in-out duration-200">
                <div className="p-2">
                Short-term rentals are temporary accommodations leased for stays typically lasting up to 28 days, catering to individuals seeking brief stays, such as tourists or business travelers. These rentals offer flexibility without the commitment of a long-term lease.
                </div>
            </div>
        )}

        {isHovered && rentalType === 'longTerm' && (
            <div className="rounded-xl absolute shadow-xl w-[50vw] sm:w-[20vw] bg-white overflow-hidden origin-center sm:right-16 right-9 text-sm z-[15] transition ease-in-out duration-200">
                <div className="p-4">
                Long-term rentals extend beyond 28 days, providing extended housing solutions for individuals seeking more prolonged stays, such as those relocating, on extended work assignments, or in need of stable, extended-term accommodations.
                </div>
            </div>
        )}
       
       
    </div>
  )
}

export default RentalTypeInfo