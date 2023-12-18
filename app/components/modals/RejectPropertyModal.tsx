'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'

import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useRejectPropertyModal from '@/app/hooks/useRejectPropertyModal'


const RejectPropertyModal = () => {
    const router = useRouter();
    const rejectModal = useRejectPropertyModal();
    const [isLoading, setIsLoading] = useState(false)
  
    const toggle = useCallback(()=>{
        rejectModal.onClose();
    }, [rejectModal])

    const rejectingId = rejectModal.listingId

    const onSubmit = () => {
      setIsLoading(true);
      
      axios.patch(`/api/listings/reject/${rejectingId}`).then(()=>{
        toast.success('Property Listing Deleted!');
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
                subtitle="Do you really want to reject this property?"
                center
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
    onSubmit={onSubmit}
    body={bodyContent}
    />
  )
}

export default RejectPropertyModal