'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'
import useDeleteReservationModal from '@/app/hooks/useDeleteReservationModal'
import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const DeleteReservationModal = () => {
    const router = useRouter();
    const deleteModal = useDeleteReservationModal();
    const [isLoading, setIsLoading] = useState(false)
  
    const toggle = useCallback(()=>{
        deleteModal.onClose();
    }, [deleteModal])

    const deletingId = useDeleteReservationModal().reservationId 

    const onSubmit = () => {
      setIsLoading(true);
      
      axios.delete(`/api/reservations/${deletingId}`).then(()=>{
        toast.success('Reservation Cancelled');
        router.refresh();
        router.push('/reservations');
        deleteModal.onClose()
      }).catch(()=>{
        toast.error('Something happened!')
      }).finally(()=>{
        setIsLoading(false)
      })
    
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Cancel Reservation?"
                subtitle="You may not be able to revert this back."
                center
            />
        </div>
    )

  return (
    <Modal
    disabled={isLoading}
    isOpen={deleteModal.isOpen}
    title="Cancel Reservation"
    actionLabel='Cancel reservation'
    secondaryActionLabel='Back'
    secondaryAction={toggle}
    onClose={deleteModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    />
  )
}

export default DeleteReservationModal