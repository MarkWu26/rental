import React from 'react'

import { IconType } from 'react-icons'

interface CountCardProps{
    value?: number | string;
    title?: string;
    icon: IconType
}

const CountCard: React.FC<CountCardProps> = ({
    value,
    title,
    icon: Icon
}) => {
  return (
    <div className='flex shadow-xl rounded-xl p-8 col-span-1 w-full md:w-full lg:w-full xl:w-full sm:w-full border-[1px] border-neutral-100'>

        <div className="flex flex-row gap-x-2 items-center">
            <div 
            className={`${title === 'Total Earnings' ? 'bg-green-100' : 
            title === 'Upcoming Reservations' ? 'bg-purple-100' : 
            title === 'Check-ins Today' ? 'bg-sky-100' : 'bg-rose-100'} py-2 px-4 rounded-md h-full items-center flex`} >
                <Icon size={22} 
                className={`${title === 'Total Earnings' ? 'text-green-500' :
                title === 'Upcoming Reservations' ? 'text-purple-500' :
                title === 'Check-ins Today' ? 'text-sky-500' : 'text-rose-500 '}
                items-center justify-center flex`}/>
            </div>
        
            <div className="flex flex-col gap-1">
                <div className="text-base font-light text-gray-500">
                    {title}
                </div>
                <div className="font-bold text-xl flex flex-row items-center gap-x-3">
                    <div>
                    {value}
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default CountCard