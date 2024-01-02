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
 

    const {totalPrice, startDate, endDate, listingId} = useReservationModal();

   
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

     /* useEffect(()=>{
      setCustomValue('totalPrice', updatedPrice);
      setCustomValue('startDate', updatedStart);
      setCustomValue('endDate', updatedEnd);
      setCustomValue('listingId', updatedListing)
    }, [
        updatedPrice, 
        updatedStart, 
        updatedEnd, 
        updatedListing, 
        setCustomValue
      ]) */ 

    const idImageSrc = watch('idImageSrc')

    const reservationDetails = {
      totalPrice,
      startDate,
      endDate,
      listingId
    }


    const onSubmit: SubmitHandler<FieldValues> = (data) => {

      if(step !== STEPS.REVIEW){
        return onNext();
      }

      setIsLoading(true);

      const newData = {...data, ...reservationDetails}

      console.log('the new data: ', newData)

      axios.post('/api/reservations', newData)
      .then(()=>{
        successModal.onOpen('Reservation on process!', 
        'Please wait for 24 hours as we verify your reservation. Thank you!');
        ReservationModal.onClose()
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
          subtitle="For verification"
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