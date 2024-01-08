'use client'

import { SafeReservation, SafeUser } from '@/app/types'
import {useMemo} from 'react';
import { isAfter, isBefore, isWithinInterval, parseISO, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { IoEye } from "react-icons/io5";

interface ReservationItemProps{
    reservation: SafeReservation & {
        user?: SafeUser | null;
        totalEarnings?: number
    };
    isAdmin?: boolean
}

const ReservationItem: React.FC<ReservationItemProps> = ({
    reservation,
    isAdmin = false
}) => {

    const router = useRouter();
    
    const reservationDate = useMemo(()=>{
        if(!reservation){
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])

    const reservationStatus = useMemo(()=>{
        const today = new Date();
        const reservationStartDate = parseISO(reservation.startDate);
        const reservationEndDate = parseISO(reservation.endDate);

        if(isBefore(today, reservationStartDate)){
            return 'Upcoming'
        } else if (isWithinInterval(today, {start: reservationStartDate, end: reservationEndDate})){
            return 'In Progress'
        } else if (isAfter(today, reservationEndDate)){
            return 'Completed'
        }

        return null
    }, [reservation.startDate, reservation.endDate]);

  return (
    <div className="flex flex-row w-full text-neutral-500 text-sm items-center">
        <div className="w-[35%]">
            {reservation.listing.title}
        </div>
        <div className="w-[30%]">
            {reservation.user?.name}
        </div>
        <div className="w-[40%]">
            {reservationDate}
        </div>
        <div className="w-[25%] text-xs flex flex-row items-center">
            <div className="px-2 py-1 rounded-md font-bold bg-indigo-100
            text-indigo-500
            ">
            ₱{reservation.totalEarnings?.toFixed(2)}
            </div>
           
        </div>
        <div className="w-[20%] text-sm flex flex-row items-center">
            <div className={`${reservationStatus === 'In Progress' ? 
            'text-purple-500 bg-purple-200' : 
            reservationStatus === 'Upcoming' ? 'text-rose-500 bg-rose-200' :
            'text-green-500 bg-green-200'} 
            px-2 py-1 rounded-md text-xs font-bold`}>
            {reservationStatus}
            </div>
        </div>
        {!isAdmin && (
            <div className="w-[15%]">
         <button 
         className="
         bg-rose-500 px-2 py-1 text-xs rounded-md
          text-white hover:opacity-90 transition ease-in-out duration-75 flex items-center
          justify-center gap-x-1 font-semibold
         " 
         onClick={()=> router.push(`/reservations/${reservation.listing.id}/${reservation.id}`)}
         >View <IoEye size={12}/> </button>
        </div>
        )}
        

    </div>
  )
}

export default ReservationItem