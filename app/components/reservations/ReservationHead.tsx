'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeListings, SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useCallback } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useApproveReservation from "@/app/hooks/useApproveReservation";
import useRejectReservation from "@/app/hooks/useRejectReservation";
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import axios from "axios";
import { useRouter } from "next/navigation";
import useDeleteReservationModal from "@/app/hooks/useDeleteReservationModal";

interface ReservationHeadProps{
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
    reservationId: string;
    renteeId: string;
}

const ReservationHead: React.FC<ReservationHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser,
    status,
    userId,
    reservationId,
    renteeId
}) => {
    const {getByValue} = useCountries();
    const loginModal = useLoginModal();
    const approveModal = useApproveReservation();
    const deleteModal = useDeleteReservationModal()
    const rejectModal = useRejectReservation();

    const router = useRouter()

    const onApprove= useCallback(()=>{
        if(currentUser?.id !== userId){
            return loginModal.onOpen();
        }
        approveModal.onOpen(reservationId);
    }, [currentUser?.id, approveModal, loginModal, reservationId, userId]);

    const onCancel= useCallback(()=>{
        if(currentUser?.isAdmin || (currentUser?.id === userId)){
            deleteModal.onOpen(reservationId);
        } else {
            return loginModal.onOpen();
        }
        }, [currentUser?.isAdmin, 
            deleteModal, 
            loginModal, 
            id,
            currentUser?.id,
            userId
            ]
    );

    const onReject= useCallback(()=>{
        if(currentUser?.id === userId || currentUser?.isAdmin){
            rejectModal.onOpen(reservationId);
        } else{
            return loginModal.onOpen();
        }

        
    }, [currentUser?.isAdmin, 
        rejectModal, 
        loginModal, 
        currentUser?.id,
        userId,
        reservationId
    ])

    const onCreateChat = useCallback(()=>{
        axios.post('/api/conversations', { userId: renteeId })
        .then((data) => {
          router.push(`/conversations/${data.data.id}`);
        })
    }, [router, renteeId])

    const location = getByValue(locationValue)
  return (
   <>
        <div className="flex flex-row justify-between">
        <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
        />
         <div className="items-center flex gap-x-4 flex-row">
            
        {userId === currentUser?.id && status === 2 && (
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
                onClick={onCancel}
                >
                    <div></div>
                    Cancel reservation
                    <IoClose
                        size={22}
                    />
                </button>
            </>
        )}

        <button 
            className="
            items-center 
            flex py-[10px] 
            rounded-[10px]
          bg-rose-500
            text-white
            px-6 
            gap-x-2
            text-md hover:opacity-90"
            onClick={onCreateChat}
        >
            <div></div>
            Chat with rentee
            <HiChatBubbleLeftEllipsis
                size={22}
            />
        </button>
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

export default ReservationHead