'use client'

import {Range} from 'react-date-range'
import Calendar from '../inputs/Calendar';
import Button from '../Button';
import { SafeUser } from '@/app/types';
import useReservationModal from '@/app/hooks/useReservationModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useMemo } from 'react';
import { format } from 'date-fns';
import RentalTypeInfo from '../RentalTypeInfo';


interface ListingReservationProps{
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    dateRange: Range;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
    currentUser?: SafeUser | null;
    user: SafeUser;
    listingId: string;
    rentalType: string;
    errorMessage?: string | null
    dayDiff?: number | null | undefined;
    cleaningFee?: number | undefined;
    pricePerNight?: number | undefined;
    listingName: string;
    bathroomCount: number;
    roomCount: number;
    category: string;
    listingImage: string;
   
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    disabledDates,
    disabled,
    currentUser,
    user,
    listingId,
    rentalType,
    errorMessage = null,
    dayDiff,
    cleaningFee = 0,
    pricePerNight,
    listingName,
    bathroomCount,
    roomCount,
    category,
    listingImage,
}) => {
    const reservationModal = useReservationModal();
    const loginModal = useLoginModal();

    const checkinDate = useMemo(()=>{
        if(!dateRange?.startDate){
            return null;
        }

        const start = dateRange.startDate;
      
        return `${format(start, 'PP')}`
    }, [dateRange]);

    const checkoutDate = useMemo(()=>{
        if(!dateRange?.endDate){
            return null;
        }

        const end = dateRange.endDate;
      
        return `${format(end, 'PP')}`
    }, [dateRange]);

    const handleOpenModal = () => {
        if(!currentUser){
            return loginModal.onOpen()
        } 
        reservationModal.onOpen(totalPrice, dateRange.startDate, 
            dateRange.endDate, listingId, listingName, bathroomCount, roomCount, category, listingImage, 
            checkoutDate, checkinDate, price, dayDiff, pricePerNight, cleaningFee)
    }

  return (
    <div className='
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
        mb-8
    '>
        <div className='
            flex flex-row items-center p-4 justify-between
        '>
            <div className='flex flex-row items-center gap-1'>
                <div className='text-2xl font-semibold'>
                    ₱{price} 
                </div>
                <div className='font-light text-neutral-600'>
                / night
                </div>
            </div>
           <div className="font-semibold text-lg  flex flex-row items-center gap-x-2">
            <div className="border-b-[1px] border-rose-500">
            {rentalType === 'longTerm' ? 'Long Term Rental' : 'Short Term Rental'}
            </div>
         
           <RentalTypeInfo
           rentalType={rentalType}
           />
           </div>
        </div>

        {(((currentUser?.isAdmin === false || currentUser?.isAdmin === null) 
            && currentUser?.id !== user.id) || !currentUser) && (
        <div className='pb-4 px-4 flex flex-row  w-full '>
            <div className="flex w-full border-[1px] rounded-xl pb-2 border-neutral-400" >
            <div className="flex flex-col pt-2 px-4 w-[50%] border-r-[1px] border-neutral-400"> 
                <div className='font-bold text-sm'>
                    CHECK-IN 
                </div>
                <div className='font-light text-neutral-800'>
                    {checkinDate}
                </div>
            </div>

            <div className="flex flex-col pt-2 px-4 w-[50%]"> 
                <div className='font-bold text-sm'>
                    CHECK-OUT 
                </div>
                <div className='font-light text-neutral-600'>
                    {checkoutDate}
                </div>
            </div>
            </div>
           
        </div>
        )}

        <hr />
        <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value)=>onChangeDate(value.selection)}
        />
        
        {(((currentUser?.isAdmin === false || currentUser?.isAdmin === null) 
        && currentUser?.id !== user.id) || !currentUser) && (
            <>
            <hr/>
            <div className="text-rose-500 text-sm flex flex-row justify-center mt-2">
                {errorMessage}
            </div>
            </>
        )}
           
        {(((currentUser?.isAdmin === false || currentUser?.isAdmin === null) 
        && currentUser?.id !== user.id) || !currentUser) && (
            <div className='p-4'>
                <Button
                    disabled={disabled}
                    label="Reserve Now"
                    onClick={handleOpenModal}
                />
                <div className="font-light  text-neutral-500 flex justify-center pt-2">
                    You won't be charged yet
                </div>
            </div>
        )}

        {/* Break down of price per night */}
        {(((currentUser?.isAdmin === false || currentUser?.isAdmin === null) 
        && currentUser?.id !== user.id) || !currentUser) && (
            <div className="px-4 pb-4 pt-2 flex flex-col gap-1">
                <div className="flex flex-row justify-between">
                    <div>₱{price} x {dayDiff} nights</div>
                    <div>₱{pricePerNight?.toFixed(2)}</div>
                </div>
                {cleaningFee !== 0 && (
                    <div className="flex flex-row justify-between">
                        <div>Cleaning Fee</div>
                        <div>₱{cleaningFee.toFixed(2)}</div>
                    </div>
                )}
               
            </div>
        )}
       
       {(((currentUser?.isAdmin === false || currentUser?.isAdmin === null) 
        && currentUser?.id !== user.id) || !currentUser) && (
            <>
            <hr/>
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
            </>
        )}
     
    </div>
  )
}

export default ListingReservation  