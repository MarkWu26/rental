'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeListings, SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { MdOutlineModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useCallback } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useApprovePropertyModal from "@/app/hooks/useApprovePropertyModal";
import useDeletePropertyModal from "@/app/hooks/useDeletePropertyModal";
import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import useRejectPropertyModal from "@/app/hooks/useRejectPropertyModal";
import useSuccessModal from "@/app/hooks/useSuccessModal";

interface ListingHeadProps{
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
    status: Number;
    userId?: string;
    category: string;
    latlng: number[];
    bathRoomCount: Number;
    guestCount: Number;
    roomCount: Number;
    listing?: SafeListings | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser,
    status,
    userId,
    latlng,
    listing
}) => {
    const {getByValue} = useCountries();
    const loginModal = useLoginModal();
    const approveModal = useApprovePropertyModal();
    const deleteModal = useDeletePropertyModal()
    const editModal = useEditPropertyModal();
    const rejectModal = useRejectPropertyModal();
    const successModal = useSuccessModal();

    const onApprove= useCallback(()=>{
        if(!currentUser?.isAdmin){
            return loginModal.onOpen();
        }
        approveModal.onOpen(id);
    }, [currentUser?.isAdmin, approveModal, loginModal, id]);

    const onDelete= useCallback(()=>{
        if(currentUser?.isAdmin || (currentUser?.id === userId)){
            deleteModal.onOpen(id);
        } else {
            return loginModal.onOpen();
        }
       
    }, [currentUser?.isAdmin, 
        deleteModal, 
        loginModal, 
        id,
        currentUser?.id,
        userId
    ]);

    const onEdit= useCallback(()=>{
        console.log('hellooooo')
        if(currentUser?.isAdmin || (currentUser?.id === userId)){
            editModal.onOpen(listing, locationValue, latlng);
        } else{
            return loginModal.onOpen();
        }

        
    }, [currentUser?.isAdmin, 
        editModal, 
        loginModal, 
        listing, 
        locationValue, 
        latlng,
        currentUser?.id,
        userId
    ])

    const onReject= useCallback(()=>{
        if(currentUser?.isAdmin || (currentUser?.id === userId)){
            rejectModal.onOpen(id);
        } else{
            return loginModal.onOpen();
        }

        
    }, [currentUser?.isAdmin, 
        rejectModal, 
        loginModal, 
        currentUser?.id,
        userId,
        id
    ])

    const location = getByValue(locationValue)
  return (
   <>
        <div className="flex flex-row justify-between">
        <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
        />
         <div className="items-center flex gap-x-4 flex-row">
        {currentUser?.isAdmin && status === 2 && (
            <>
                <button 
                className="
                flex py-[10px]
                px-6 
              bg-green-500
               text-white
                rounded-[10px]
                text-md hover:opacity-90
                gap-x-2
                flex-row
                "
                onClick={onApprove}
                >
                    Approve 
                    <IoIosCheckmarkCircle 
                        size={24}
                    />
                </button>
                <button 
                className="
                items-center 
                flex py-[10px] 
                rounded-[10px]
                bg-red-500
                text-white
                px-6 
                gap-x-2
                text-md hover:opacity-90"
                onClick={onReject}
                >
                    <div></div>
                    Reject
                    <MdCancel
                        size={22}
                    />
                </button>
            </>
            
        )}
        {(currentUser?.isAdmin || userId === currentUser?.id) && (
            <>
                <button 
                className="
                items-center 
                flex py-[10px] 
                rounded-[10px]
                bg-yellow-500
                text-white
                px-6 
                gap-x-2
                text-md hover:opacity-90"
                onClick={onEdit}
                >
                    <div></div>
                    Edit
                    <MdOutlineModeEditOutline
                        size={22}
                    />
                </button>
            </>
        )}
        {status !== 2 && (userId === currentUser?.id || currentUser?.isAdmin) && (
            <>
             <button 
                className="
                items-center 
                flex py-[10px] 
                rounded-[10px]
                bg-red-500
                text-white
                px-6 
                gap-x-2
                text-md hover:opacity-90"
                onClick={onDelete}
                >
                    <div></div>
                    Delete
                    <MdDeleteOutline
                        size={22}
                    />
                </button>
            </>
        )}
        </div>
           
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
                src={imageSrc}
                fill
                className="object-cover w-full"
            />
            {(!currentUser?.isAdmin || !currentUser) && (
                <div className="absolute top-5 right-5">
                <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                />
                </div>
            )}
           
        </div>
   </>
  )
}

export default ListingHead