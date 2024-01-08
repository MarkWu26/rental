'use client'

import axios from 'axios'

import { useEffect, useMemo, useState } from 'react'

import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import ImageUpload from '../inputs/ImageUpload'
import useReservationModal from '@/app/hooks/useReservationModal'
import useSuccessModal from '@/app/hooks/useSuccessModal'
import Image from 'next/image'
import { BsDot } from "react-icons/bs";

enum STEPS{
  IDPICTURE = 0,
  REVIEW = 1
}

const ReservationModal = () => {
    const router = useRouter();
    const ReservationModal = useReservationModal();
    const successModal = useSuccessModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.IDPICTURE);
 

    const {
      totalPrice, 
      startDate, 
      endDate, 
      listingId, 
      listingImage, 
      bathroomCount, 
      roomCount,
      checkinDate,
      checkoutDate,
      category,
      listingName,
      price,
      pricePerNight,
      cleaningFee,
      dayDiff
    } = useReservationModal();

   
    const [updatedPrice, setUpdatedPrice] = useState(totalPrice);
    const [updatedStart, setUpdatedStart] = useState(startDate);
    const [updatedEnd, setUpdatedEnd] = useState(endDate);
    const [updatedListing, setUpdatedListing] = useState(listingId)


    const onBack = () => {
      setStep((step)=> step - 1)
    }

    const onNext = () => {
      setStep((step)=> step + 1)
    }

   const actionLabel = useMemo(()=>{
      if(step === STEPS.REVIEW){
        return 'Confirm';
      }

      return 'Next';
   }, [step]);

   const secondaryActionLabel = useMemo(()=>{
      if(step === STEPS.IDPICTURE){
        return undefined;
      }

      return 'Back';
   }, [step])

    const {
      register, 
      handleSubmit,
      setValue,
      watch,
      reset,
      formState: {
        errors
      }
    } = useForm<FieldValues>({
      defaultValues:{
        idImageSrc: '',
        totalPrice: updatedPrice,
        startDate: updatedStart,
        endDate: updatedEnd,
        listingId: updatedListing
      }
    })

    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      })
    }

    const idImageSrc = watch('idImageSrc')

    const reservationDetails = {
      totalPrice,
      startDate,
      endDate,
      listingId
    }

    useEffect(()=>{
      if(step === STEPS.IDPICTURE && idImageSrc === ''){
        setIsLoading(true)
      } else if (step === STEPS.IDPICTURE && idImageSrc !== ''){
        setIsLoading(false)
      }
    }, [step, STEPS.IDPICTURE, idImageSrc])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

      if(step !== STEPS.REVIEW){
        return onNext();
      }

      setIsLoading(true);

      const newData = {...data, ...reservationDetails}

      axios.post('/api/reservations', newData)
      .then(()=>{
        successModal.onOpen('Reservation on process!', 
        'Please wait for 24 hours as we verify your reservation. Thank you!');
        ReservationModal.onClose();
        reset();
        setStep(STEPS.IDPICTURE)
        router.refresh();
      })
      .catch(()=>{
        toast.error('Error')
      })
      .finally(()=>{
        setIsLoading(false)
      })
    
    }

    let bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title="Upload a picture of your valid ID"
          subtitle="Help us ensure a safe community by providing a clear picture of your valid ID for verification."
        />
        <ImageUpload
          value={idImageSrc}
          onChange={(value)=> setCustomValue('idImageSrc', value)}
        />
      </div>
    )

   
    if(step === STEPS.REVIEW){
       bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Review your trip"
                subtitle="Ensure that your trip details are correct."
                center
            />
            <div className="flex flex-row gap-2 w-full pt-2">
              <div className='aspect-square w-[50%] h-[20vh] relative overflow-hidden rounded-xl'>
                <Image
                alt="Listing Image"
                src={listingImage || ""}
                className= "object-cover w-full h-full"
                fill
                />
              </div>
              <div className="flex flex-col gap-2 pl-2 w-[50%]">
               <div className="font-semibold text-lg">
                {listingName}
                </div>
                <div className="flex flex-row gap-x-4 items-center text-neutral-500 font-light text-xs sm:text-base">
                  <div className='flex flex-row items-center'>
                  {category} 
                  </div>
                  <div className='flex flex-row items-center'>
                    <div className='flex-row flex gap-x-1 items-center'>
                      <BsDot className="ml-[-14px] sm:ml-[-6px]"/> {roomCount} {roomCount === 1 ? 'room': 'rooms'} 
                    </div>
                  </div>
                  <div className='flex flex-row items-center'>
                    <div className='flex-row flex gap-x-1 items-center'>
                      <BsDot className="ml-[-14px] sm:ml-[-6px]"/> {bathroomCount} {bathroomCount === 1 ? 'bath': 'baths'}
                    </div>
                  </div>
                
                </div>
              </div>
             

            </div>

            <hr/>

          
            <div className="flex flex-row justify-between px-4">
                <div className="font-semibold">
                  Dates
                </div>
                <div>
                  {checkinDate} - {checkoutDate}
                </div>
            </div>

            <hr/>

            <div>
            <div className="px-4 pt-2 flex flex-col gap-1">
                <div className="flex flex-row justify-between">
                    <div>₱{price} x {dayDiff} nights</div>
                    <div>₱{pricePerNight?.toFixed(2)}</div>
                </div>
                {cleaningFee !== 0 && cleaningFee && (
                    <div className="flex flex-row justify-between">
                        <div>Cleaning Fee</div>
                        <div>₱{cleaningFee.toFixed(2)}</div>
                    </div>
                )}

                <div className="
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
                    ₱{totalPrice?.toFixed(2)}
                </div>

            </div>
               
            </div>
            </div>

        </div>
      )
    }
  
  return (
    <Modal
    disabled={isLoading}
    isOpen={ReservationModal.isOpen}
    title="Confirm Reservation"
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.IDPICTURE ? undefined : onBack}
    onClose={ReservationModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    />
  )
}

export default ReservationModal