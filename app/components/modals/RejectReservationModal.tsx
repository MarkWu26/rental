'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'
import useRejectReservation from '@/app/hooks/useRejectReservation'
import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '../inputs/Input'

const RejectReservationModal = () => {
    const router = useRouter();
    const RejectReservationModal = useRejectReservation();
    const [isLoading, setIsLoading] = useState(false)
  
    const toggle = useCallback(()=>{
        RejectReservationModal.onClose();
    }, [RejectReservationModal])

    const approvingId = useRejectReservation().reservationId;

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: {
          errors
      },
      reset 
  } = useForm<FieldValues>({
      defaultValues: {
      reason: ''
      }
  })

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
    })
}

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      axios.patch(`/api/reservations/reject/${approvingId}`, data)
      .then(()=>{
        toast.success('Property Listing Rejected Successfully!');
        router.refresh();
        RejectReservationModal.onClose()
      }).catch(()=>{
        toast.error('Something happened!')
      }).finally(()=>{
        setIsLoading(false)
      })
    
    }


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Reject this reservation?"
                subtitle="Please Provide the reason for rejecting."
                center
            />
            <Input
             id="reason"
             label="Reason"
             disabled={isLoading}
             register={register}
             errors={errors}
             required
            />
        </div>
    )


  return (
    <Modal
    disabled={isLoading}
    isOpen={RejectReservationModal.isOpen}
    title="Reject Reservation"
    actionLabel='Reject'
    secondaryActionLabel='Cancel'
    secondaryAction={toggle}
    onClose={RejectReservationModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    />
  )
}

export default RejectReservationModal