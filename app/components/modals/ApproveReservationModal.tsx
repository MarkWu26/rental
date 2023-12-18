'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'
import useApproveReservation from '@/app/hooks/useApproveReservation'
import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ApproveReservationModal = () => {
    const router = useRouter();
    const ApproveReservationModal = useApproveReservation();
    const [isLoading, setIsLoading] = useState(false)
  
    const toggle = useCallback(()=>{
        ApproveReservationModal.onClose();
    }, [ApproveReservationModal])

    const approvingId = useApproveReservation().reservationId

    const onSubmit = () => {
      setIsLoading(true);

      axios.patch(`/api/reservations/approve/${approvingId}`).then(()=>{
        toast.success('Property Listing Approved Successfully!');
        router.refresh();
        ApproveReservationModal.onClose()
      }).catch(()=>{
        toast.error('Something happened!')
      }).finally(()=>{
        setIsLoading(false)
      })
    
    }


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Confirm this reservation?"
                subtitle="Do you really want to confirm this reservation?"
                center
            />
        </div>
    )


  return (
    <Modal
    disabled={isLoading}
    isOpen={ApproveReservationModal.isOpen}
    title="Confirm Reservation"
    actionLabel='Confirm'
    secondaryActionLabel='Cancel'
    secondaryAction={toggle}
    onClose={ApproveReservationModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    />
  )
}

export default ApproveReservationModal