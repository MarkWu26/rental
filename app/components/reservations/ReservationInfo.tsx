'use client'

import Image from 'next/image'
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ReservationCategory";
import dynamic from "next/dynamic";

interface ReservationInfoProps{
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
    status: Number;
    guestIdPic: string;
    rejectionReason: string;
}

const Map = dynamic(()=> import('../Map'), {
  ssr:false
})

const ReservationInfo
: React.FC<ReservationInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathRoomCount,
    category,
    locationValue,
    status,
    guestIdPic,
    rejectionReason
}) => {
 /*  const {getByValue} = useCountries();
  const coordinates = getByValue(locationValue)?.latlng; */
  return (
    <div className="col-span-4 flex flex-col gap-8">
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
            Renter: {user?.name} 
            <Avatar src={user?.image}/>
          </div>
          <div className="flex flex-row gap-3">{status === 1 ? (
            <div className="text-green-500">Confirmed</div>
          ): status === 2 ? (
            <div className="text-yellow-500">Pending</div>
          ): (
            <div className="text-red-500">Rejected</div>
          )}
          </div>
  
       
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

        <div className='flex flex-col gap-2'>
        <div>
        Reason for rejection:
        </div>
        <div>
            {rejectionReason}
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
      <div className="gap-4 flex flex-col text-xl font-semibold">
        <div>
          Guest ID
        </div>
        <div className="w-full rounded-xl h-[40vh] overflow-hidden relative">
            <Image
            alt="Guest ID Picture"
            src={guestIdPic}
            fill
            className="object-fit w-full"
            />
        </div>
      </div>
    </div>
  )
}

export default ReservationInfo
