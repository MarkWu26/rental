'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeListings, SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useCallback } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useApprovePropertyModal from "@/app/hooks/useApprovePropertyModal";
import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import useRejectPropertyModal from "@/app/hooks/useRejectPropertyModal";
import useDeleteReservationModal from "@/app/hooks/useDeleteReservationModal";
import axios from "axios";
import { useRouter } from "next/navigation";


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
    reservationId: string;
    guestId: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser,
    status,
    userId,
    reservationId,
    guestId
}) => {
    const {getByValue} = useCountries();
    const loginModal = useLoginModal();
    const approveModal = useApprovePropertyModal();
    const deleteModal = useDeleteReservationModal()
    const rejectModal = useRejectPropertyModal();
    

    const router = useRouter();

    const onApprove= useCallback(()=>{
        if(!currentUser?.isAdmin){
            return loginModal.onOpen();
        }
        approveModal.onOpen(id);
    }, [currentUser?.isAdmin, approveModal, loginModal, id]);

    const onCancel= useCallback(()=>{
        if(currentUser?.isAdmin || (currentUser?.id === guestId)){
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

    const onCreateChat = useCallback(()=>{
        axios.post('/api/conversations', { userId: userId })
        .then((data) => {
          router.push(`/conversations/${data.data.id}`);
        })
    }, [router, userId])

    const location = getByValue(locationValue);

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
                    className="items-center flex py-[10px] rounded-[10px]bg-red-500text-white px-6 
                    gap-x-2 text-md hover:opacity-90"
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
        
            {status === 1 && (
                <>
                <button 
                    className="items-center flex py-[10px] rounded-[10px] bg-red-500 text-white px-6 
                    gap-x-2 text-md hover:opacity-90"
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
            className="items-center flex py-[10px] rounded-[10px] bg-rose-500 text-white px-6 gap-x-2
            text-md hover:opacity-90"
            onClick={onCreateChat}
            >
            <div></div>
            Chat with host
            <HiChatBubbleLeftEllipsis
                size={22}
            />
            </button>

        </div>
           
        </div>
        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
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