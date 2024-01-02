'use client'

import Image from 'next/image'
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import ReviewInput from '../inputs/ReviewInput';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { FiClock } from "react-icons/fi";

interface ListingInfoProps{
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathRoomCount: number;
    category:{
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    locationValue: Number[];
    docImageSrc: string;
    currentUser?: SafeUser | null;
    status: Number;
    averageRating?: string;
    checkinTime: string;
    checkoutTime: string;
}

const Map = dynamic(()=> import('../Map'), {
  ssr:false
})

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathRoomCount,
    category,
    locationValue,
    docImageSrc,
    currentUser,
    status,
   averageRating,
   checkinTime,
   checkoutTime
}) => {

  //check if there are no comments yet on the property
  // do not display the rating if no comments
  const noComments = useMemo(()=>{
    if(averageRating?.includes('NaN')){
      return true
    }

    return false
  }, [averageRating]);

  const formattedCheckin = useMemo(()=>{
    const checkinDate = new Date (checkinTime);
    const formattedTime = format(checkinDate, 'hh:mm a') 

    return formattedTime
  }, [checkinTime])

  const formattedCheckout = useMemo(()=>{
    const checkoutDate = new Date (checkoutTime);
    const formattedTime = format(checkoutDate, 'hh:mm a') 

    return formattedTime
  }, [checkoutTime])

  

  return (
    <div className="col-span-4 flex flex-col gap-8 pb-8">
      <div className="flex flex-col gap-2">
      <div className="
          text-xl
          font-semibold
          flex
          flex-row
          items-center
          gap-2
          justify-between
        ">
        
          <div className="flex flex-row gap-2">
            Hosted by: {user?.name} 
            <Avatar src={user?.image}/>
          </div>
          {status === 1 && !noComments && (
            <div className="flex flex-row gap-3 text-base items-center font-light">
              <div className="flex items-center">
              <ReviewInput
                isReview
                maxValue={1}
                isInfo
                />
              </div>
                <div className="flex items-center mt-1">
                {averageRating}
                </div>
            </div>
          )}
          {(currentUser?.id === user.id || currentUser?.isAdmin )&& (
          <div className="flex flex-row gap-3">{status === 1 ? (
            <div className="text-green-500">Active</div>
          ): status === 2 ? (
            <div className="text-yellow-500">Pending</div>
          ): (
            <div className="text-red-500">Rejected</div>
          )}
          </div>

          )}
        
       
        </div>
        <div className="
          flex
          flex-row
          items-center
          gap-4
          font-light
          text-neutral-500
        ">
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathRoomCount} bathrooms
          </div>

        </div>
       
      </div>
      <hr/>
      <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between ">
            <div className='font-semibold flex flex-row gap-x-2'>
              <FiClock size={22} className="text-neutral-600"/> Check-in Time
            </div>
            <div className=''>
               {formattedCheckin}
            </div>
          </div> 
          <div className="flex flex-row justify-between ">
          <div className='font-semibold flex flex-row gap-x-2'>
              <FiClock size={22} className="text-neutral-600"/> Check-out Time
            </div>
            <div className=''>
               {formattedCheckout}
            </div>
          </div>   
      </div>
      <hr/>
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr/>
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr/>
      <Map center={locationValue}
      isDraggable={false}
      />
      <hr/>
      
     
      {currentUser?.isAdmin && (
        <>
        <div className="flex flex-col text-xl font-semibold gap-4">
         <div>
         Property Documents
         </div>
        <div className="
        w-full
        h-[70vh]
        overflow-hidden
        rounded-xl
        relative
        ">
         
          <Image
          alt="Image"
          src={docImageSrc}
          fill
          className="object-fit w-full"
          />
        </div>
        </div>
        <hr/>
        </>
      )}
     
    </div>
  )
}

export default ListingInfo