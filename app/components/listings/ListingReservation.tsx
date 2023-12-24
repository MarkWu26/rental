'use client'

import {Range} from 'react-date-range'
import Calendar from '../inputs/Calendar';
import Button from '../Button';
import { SafeUser } from '@/app/types';
import useReservationModal from '@/app/hooks/useReservationModal';


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
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabledDates,
    disabled,
    currentUser,
    user,
    listingId,
}) => {
    const reservationModal = useReservationModal();
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
            flex flex-row items-center gap-1 p-4
        '>
            <div className='text-2xl font-semibold'>
                P {price}
            </div>
            <div className='font-light text-neutral-600'>
                night
            </div>
        </div>
        <hr />
        <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value)=>onChangeDate(value.selection)}
        />
        <hr/>
        {(((currentUser?.isAdmin === false || currentUser?.isAdmin === null) 
        && currentUser?.id !== user.id) || !currentUser) && (
            <div className='p-4'>
            <Button
                disabled={disabled}
                label="Reserve Now"
                onClick={()=> reservationModal.onOpen(totalPrice, dateRange.startDate, 
                    dateRange.endDate, listingId)}
            />
            </div>
        )}
       
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
                P {totalPrice}
            </div>

        </div>
    </div>
  )
}

export default ListingReservation  