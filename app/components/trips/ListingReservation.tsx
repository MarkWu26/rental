'use client'

import {Range} from 'react-date-range'
import Button from '../Button';
import { SafeReservation, SafeReview, SafeUser } from '@/app/types';
import { useMemo } from 'react';
import { isAfter, isBefore, isWithinInterval, parseISO } from 'date-fns';
import useReviewModal from '@/app/hooks/useReviewModal';


interface ListingReservationProps{
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    dateRange: Range;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
    reservationDate?: string | null;
    startDate: string;
    endDate: string;
    dayDiff: number;
    canReview: boolean;
    status: Number;
    reason: string;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabledDates,
    disabled,
    reservationDate,
    startDate,
    endDate,
    dayDiff,
    canReview,
    status,
    reason

}) => {

    const addReviewModal = useReviewModal();

    const reservationStatus = useMemo(()=>{
        const today = new Date();
        const reservationStartDate = parseISO(startDate);
        const reservationEndDate = parseISO(endDate);

        if(isBefore(today, reservationStartDate)){
            return 'Upcoming'
        } else if (isWithinInterval(today, {start: reservationStartDate, end: reservationEndDate})){
            return 'Ongoing'
        } else if (isAfter(today, reservationEndDate)){
            return 'Completed'
        }

        return null
    }, [startDate, endDate]);



  return (
    <div className='
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden

    '>
        <div className='
            flex flex-row items-center gap-1 p-4
        '>
            <div className='text-2xl font-semibold'>
                Trip Details
            </div>
        </div>
        <hr />
      
        <div className="flex flex-col p-4 gap-2">
            <div className="flex flex-row justify-between">
                    <div className="font-semibold">
                        Status
                    </div>
                    {status === 1 && (
                    <div className={`${reservationStatus === 'Completed' || 'Ongoing' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {reservationStatus}
                    </div>
                    )}
                    {status === 2 && (
                        <div className="text-yellow-500">
                            Pending
                        </div>
                    )}
                    {status === 3 && (
                        <div className="text-red-500">
                            Rejected
                        </div>
                    )}
            </div>
            <hr className="px-5"/>

            <div className='flex flex-col gap-2'>
                <div className="font-semibold">
                        Reason for rejection:
                </div>
                <div className=''>
                     {reason}
                </div>
                
            </div>

            <hr className="px-5"/>

            <div className="flex flex-row justify-between">
                <div className="font-semibold">
                    Dates
                </div>
                <div className=''>
                    {reservationDate}
                </div>
            </div>
        </div>
        <hr/>
        <div className='p-4'>
        <div className="flex flex-row justify-between">
                <div>₱{price} x {dayDiff} nights</div>
                <div>₱{totalPrice.toFixed(2)}</div>
            </div>
        </div>
        <div className="
            p-4
            flex
            flex-row
            items-center
            justify-between
            font-semibold
            text-lg
        ">
            <div>
                Total
            </div>
            <div>
                ₱{totalPrice.toFixed(2)}
            </div>

        </div>
            {canReview && reservationStatus === 'Completed' && (
            <div className='p-4'>
                <Button
                    disabled={disabled}
                    label="Add a review"
                    onClick={()=>addReviewModal.onOpen()}
                />
            </div>
            )}
           
      
    </div>
  )
}

export default ListingReservation