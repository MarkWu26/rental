'use client'

import {Range} from 'react-date-range'
import Button from '../Button';
import { useMemo } from 'react';
import { isAfter, isBefore, isWithinInterval, parseISO, format } from 'date-fns';
import useReviewModal from '@/app/hooks/useReviewModal';
import RentalTypeInfo from '../RentalTypeInfo';
import Calendar from '../inputs/Calendar';


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
    rentalType: string;
    cleaningFee: number
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
    reason,
    rentalType,
    cleaningFee
}) => {

    const addReviewModal = useReviewModal();

    const calculateEarnings = (totalPrice: number) => {
        const feePercentage = 3;
        const earnings = totalPrice - (totalPrice * feePercentage) / 100;
        return Math.round(earnings * 100) / 100;
    }

    const calculatePlatformFee = (totalPrice: number) => {
        const feePercentage = 3;
        const earnings = (totalPrice * feePercentage) / 100;
        return Math.round(earnings * 100) / 100;
    }

    const totalEarnings = useMemo(()=>{
        if(!totalPrice){
            return null;
        }
        const earnings = calculateEarnings(totalPrice)
        return earnings
    }, [totalPrice]);

    const platformFee = useMemo(()=>{
        if(!totalPrice){
            return null;
        }
        const fee = calculatePlatformFee(totalPrice)
        return fee
    }, [totalPrice]);

    const initialPrice = useMemo(() => {
        if(cleaningFee === 0) {
            return totalPrice
        }
        const initial = (totalPrice - cleaningFee)
        return initial
    }, [totalPrice, cleaningFee])

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

    const reservationStartDate = useMemo(()=>{

        const start = new Date(startDate);

        return `${format(start, 'PP')}`
    }, [startDate]);

    const reservationEndDate = useMemo(()=>{

        const end = new Date(endDate);

        return `${format(end, 'PP')}`
    }, [endDate])

  return (
    <div className='
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden

    '>
        <div className='
            flex flex-row items-center p-4 justify-between
        '>
            <div className='flex flex-row items-center gap-1'>
                <div className='text-2xl font-semibold'>
                   Trip Details
                </div>
            </div>
           <div className="font-semibold text-base  flex flex-row items-center gap-x-2">
            <div className="border-b-[1px] border-rose-500">
            {rentalType === 'longTerm' ? 'Long Term Rental' : 'Short Term Rental'}
            </div>
         
            <RentalTypeInfo
            rentalType={rentalType}
            />
           </div>
        </div>

        <div className='pb-4 px-4 flex flex-row  w-full '>
            <div className="flex w-full border-[1px] rounded-xl pb-2 border-neutral-400" >
            <div className="flex flex-col pt-2 px-4 w-[50%] border-r-[1px] border-neutral-400"> 
                <div className='font-bold text-sm'>
                    CHECK-IN 
                </div>
                <div className='font-light text-neutral-800'>
                    {reservationStartDate}
                </div>
            </div>

            <div className="flex flex-col pt-2 px-4 w-[50%]"> 
                <div className='font-bold text-sm'>
                    CHECK-OUT 
                </div>
                <div className='font-light text-neutral-600'>
                    {reservationEndDate}
                </div>
            </div>
            </div>
           
        </div>

        <hr />

        <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={()=>{}}
        />

        <hr/>
      
        <div className="flex flex-col pt-4 px-4 pb-2 gap-2">
            <div className="flex flex-row justify-between items-center">
                    <div className="font-semibold">
                        Status
                    </div>
                    {status === 1 && (
                    <div className={`text-green-500 bg-green-100 rounded-md font-semibold flex items-center px-2 py-1 justify-center
                    `}>
                    {reservationStatus}
                    </div>
                    )}
                    {status === 2 && (
                        <div className="text-indigo-500 bg-indigo-100 px-2 py-1 items-center flex font-semibold rounded-md justify-center">
                            Pending
                        </div>
                    )}
                    {status === 3 && (
                        <div className="text-red-500">
                            Rejected
                        </div>
                    )}
            </div>
           
            {reason !== '' && status === 3 && (
            <div className='flex flex-col gap-2'>
                <>
                    <hr className="px-5"/>
                    <div className="font-semibold">
                        Reason for rejection:
                    </div>
                    <div className=''>
                        {reason} 
                    </div>
                    <hr className="px-5"/>
                </>
            </div>
            )}
            

            

            <div className="flex flex-row justify-between">
                <div className="font-semibold">
                    Dates
                </div>
                <div className=''>
                    {reservationDate}
                </div>
            </div>
        </div>  

        <div className='px-4 gap-2 flex flex-col'>
        <div className="flex flex-row justify-between font-semibold">
                <div>₱{price} x {dayDiff} nights</div>
                <div className='font-normal'>₱{initialPrice.toFixed(2)}</div>
        </div>

        {cleaningFee !== 0 && (
            <div className="flex flex-row justify-between font-semibold">
                <div>Cleaning Fee</div>
                <div className='font-normal'>+ ₱{cleaningFee.toFixed(2)}</div>
            </div>  
        )}

        <div className="flex flex-row justify-between font-semibold">
            <div>Subtotal</div>
            <div className='font-normal'>₱{totalPrice.toFixed(2)}</div>
        </div>

        {status === 1 && (
        <div className="flex flex-row justify-between font-semibold">
            <div>Platform Fee {`3(%)`}</div>
            <div className='font-normal'>- ₱{platformFee?.toFixed(2)}</div>
        </div>
        )}
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