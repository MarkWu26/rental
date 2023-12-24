'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'

import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useRejectPropertyModal from '@/app/hooks/useRejectPropertyModal'
import Input from '../inputs/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'


const RejectPropertyModal = () => {
    const router = useRouter();
    const rejectModal = useRejectPropertyModal();
    const [isLoading, setIsLoading] = useState(false)
  
    const toggle = useCallback(()=>{
        rejectModal.onClose();
    }, [rejectModal])

    const rejectingId = rejectModal.listingId

    const {
      register, 
      handleSubmit,
      setValue,
      formState: {
        errors
      }
    } = useForm<FieldValues>({
      defaultValues:{
        reason: ''
      }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);
      
      axios.patch(`/api/listings/reject/${rejectingId}`, data).
      then(()=>{
        toast.success('Property Listing Rejected!');
        router.refresh();
        router.push('/admin');
        rejectModal.onClose()
      }).catch(()=>{
        toast.error('Something happened!');
      }).finally(()=>{
        setIsLoading(false);
      })
    
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Reject this property?"
                subtitle="Please provide the reason for rejecting this property."
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
    isOpen={rejectModal.isOpen}
    title="Reject Property"
    actionLabel='Reject'
    secondaryActionLabel='Cancel'
    secondaryAction={toggle}
    onClose={rejectModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    />
  )
}

export default RejectPropertyModal