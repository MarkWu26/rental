'use client'

import { SafeListings, SafeReservation, SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import { useCallback, useMemo } from 'react';
import {format} from 'date-fns'
import Image from 'next/image'
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ReservationCardProps{
    data: SafeListings;
    reservation?: SafeReservation;
    onAction?: (id:string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionId = "",
    actionLabel,
    currentUser,

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
        onClick={()=>router.push(`/reservations/${reservation?.listingId}/${reservation?.id}`)}
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
            <div className='font-semibold text-lg justify-between flex-row flex'>
                {location?.region}, {location?.label}
                {reservation?.status === 2 ? (
                    <div className='text-yellow-600'>Pending</div>
                ): reservation?.status === 3? (
                    <div className='text-red-500'>Rejected</div>
                ) : (
                    <div className='text-green-500'>Confirmed</div>
                )}
             
            </div>
            <div className='font-light next-neutral-500 justify-between'>
                {reservationDate || data.category}
       
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className='font-semibold'>
                    $ {price}
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

export default ReservationCard