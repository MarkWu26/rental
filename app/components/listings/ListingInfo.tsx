'use client'

import Image from 'next/image'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import UserIdDocs from "./UserIdDocs";

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
    status: Number
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
    status
}) => {

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
            Hosted by: {user?.name} 
            <Avatar src={user?.image}/>
          </div>
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
      
     
      {currentUser?.isAdmin && (
        <>
         <hr/>
        <div className="flex flex-col text-xl font-semibold gap-4">
         <div>
         Property Documents
         </div>
        <div className="
        w-full
        h-[60vh]
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
        </>
      )}
     
    </div>
  )
}

export default ListingInfo