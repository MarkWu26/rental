import React from 'react'

import { IconType } from 'react-icons'

interface ListingsCountCardProps{
    value?: number | string;
    title?: string;
    icon: IconType
}

const ListingsCountCard: React.FC<ListingsCountCardProps> = ({
    value,
    title,
    icon: Icon
}) => {
  return (
    <div className='flex shadow-xl rounded-xl p-8 col-span-1 w-full md:w-full lg:w-full xl:w-full sm:w-full border-[1px] border-neutral-100'>

        <div className="flex flex-row gap-x-2 items-center">
            <div 
            className={`${title === 'Active Listings' ? 'bg-green-100' : 
            title === 'Pending Listings' ? 'bg-purple-100' : 
             'bg-rose-100'} py-2 px-4 rounded-md h-full items-center flex`} >
                <Icon size={22} 
                className={`${title === 'Active Listings' ? 'text-green-500' :
                title === 'Pending Listings' ? 'text-purple-500' :
                 'text-rose-500 '}
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

export default ListingsCountCard