'use client'

import { SafeListings, SafeReservation, SafeUser } from '@/app/types'
import {useMemo} from 'react';
import { isAfter, isBefore, isWithinInterval, parseISO, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { IoEye } from "react-icons/io5";

interface ListingItemProps {
    listing: SafeListings & {
      user?: SafeUser | null;
      totalReservations?: number;
      totalEarnings?: number;
    };
  }
  

const ListingItem: React.FC<ListingItemProps> = ({
    listing
}) => {

    const router = useRouter();

    const {id, title, status, totalReservations, price, totalEarnings, user} = listing;

    const listingStatus = useMemo(()=> {
        if(!status){
            return null;
        }

        if(status === 1){
            return 'Active'
        } else if (status === 2){
            return 'Pending'
        } else if (status === 3){
            return 'Rejected'
        } else {
            return null;
        }
    }, [status])


  return (
    <div className="flex flex-row w-full text-neutral-500 text-sm items-center">
        <div className="w-[35%]">
            {title}
        </div>
        <div className="w-[30%]">
            {user?.name}
        </div>
        <div className="w-[25%]">
        ₱{price}
        </div>
        <div className="w-[30%] text-sm flex flex-row items-center">
            <div className="bg-indigo-100 text-indigo-500 font-semibold rounded-md px-2 py-1">
                ₱{totalEarnings}
            </div>
        </div>
        <div className="w-[25%]">
        {totalReservations}
        </div>
        <div className="w-[20%] text-sm flex flex-row items-center">
            <div className={`${status === 2 ? 
            'text-purple-500 bg-purple-200' : 
            status === 3 ? 'text-rose-500 bg-rose-200' :
            'text-green-500 bg-green-200'} 
            px-2 py-1 rounded-md text-xs font-bold`}>
           {listingStatus}
            </div>
        </div>
        <div className="w-[15%]">
         <button 
         className="
         bg-rose-500 px-2 py-1 text-xs rounded-md
          text-white hover:opacity-90 transition ease-in-out duration-75 flex items-center
          justify-center gap-x-1 font-semibold
         " 
         onClick={()=> router.push(`/listings/${id}`)}
         >View <IoEye size={12}/> </button>
        </div>

    </div>
  )
}

export default ListingItem