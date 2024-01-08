'use client'

import { SafeListings, SafeReservation, SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import { useCallback, useMemo } from 'react';
import {format} from 'date-fns'
import Image from 'next/image'
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps{
    data: SafeListings;
    reservation?: SafeReservation;
    onAction?: (id:string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    isHomepage?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionId = "",
    actionLabel,
    currentUser,
    isHomepage
}) => {
    const router = useRouter()
    const {getByValue} = useCountries();
   
    const location = getByValue(data.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>)=> {
        e.stopPropagation()

        if(disabled){
            return;
        }

        onAction?.(actionId)
    }, [onAction, actionId, disabled])

    const price = useMemo(()=>{
        if(reservation){
            return reservation.totalPrice;
        }

        return data.price
    }, [reservation, data.price])

    const reservationDate = useMemo(()=>{
        if(!reservation){
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])

  return (
    <div
        onClick={()=>router.push(`/listings/${data.id}`)}
        className='col-span-1 cursor-pointer group'
    >   
        <div className='flex flex-col gap-2 w-full'>
            <div
                className='aspect-square w-full relative overflow-hidden rounded-xl'
            >
                <Image
                    className='
                        object-cover
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                    '
                    alt="listing"
                    src={data.imageSrc}
                    fill
                />
                {(!currentUser?.isAdmin || !currentUser) && (
                       <div className="absolute top-3 right-3">
                       <HeartButton
                           listingId={data.id}
                           currentUser={currentUser}
                       />
                   </div>
                )}
             
            </div>
            <div className='font-semibold text-lg justify-between flex-row flex items-center'>
                {location?.region}, {location?.label}
                {!isHomepage && (
                <>
                {data.status === 2 ? (
                    <div className='text-indigo-500 bg-indigo-100 rounded-md 
                    px-2 py-[2px] font-bold text-sm flex items-center'>Pending</div>
                ) : data.status === 3 ? (
                    <div className='text-red-500 bg-red-100 rounded-md 
                    px-2 py-[2px] font-bold text-sm flex items-center'>Rejected</div>
                ) : null}
                {data.status === 1 && (currentUser?.isAdmin || currentUser?.id === data.userId) && (
                    <div className='text-green-500 bg-green-100 rounded-md 
                    px-2 py-[2px] font-bold text-sm flex items-center'>Active</div>
                )}
                </>
                )}
              
             
            </div>
            <div className='font-light next-neutral-500 justify-between'>
                {reservationDate || data.category}
       
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className='font-semibold'>
                    ₱ {price}
                </div>
                {!reservation && (
                    <div className="font-light">night</div>
                )}
            </div>
            {onAction && actionLabel && (
                <Button
                    disabled={disabled}
                    small
                    label={actionLabel}
                    onClick={handleCancel}
                />
            )}
        </div>

    </div>
  )
}

export default ListingCard