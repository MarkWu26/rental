'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'
import useRejectReservation from '@/app/hooks/useRejectReservation'
import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const RejectReservationModal = () => {
    const router = useRouter();
    const RejectReservationModal = useRejectReservation();
    const [isLoading, setIsLoading] = useState(false)
  
    const toggle = useCallback(()=>{
        RejectReservationModal.onClose();
    }, [RejectReservationModal])

    const approvingId = useRejectReservation().reservationId

    const onSubmit = () => {
      setIsLoading(true);

      axios.patch(`/api/reservations/reject/${approvingId}`).then(()=>{
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
                subtitle="Do you really want to reject this reservation?"
                center
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
    onSubmit={onSubmit}
    body={bodyContent}
    />
  )
}

export default RejectReservationModal