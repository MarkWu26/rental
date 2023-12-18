'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'
import useApprovePropertyModal from '@/app/hooks/useApprovePropertyModal'
import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ConfirmationModal = () => {
    const router = useRouter();
    const confirmationModal = useApprovePropertyModal();
    const [isLoading, setIsLoading] = useState(false)
  
    const toggle = useCallback(()=>{
        confirmationModal.onClose();
    }, [confirmationModal])

    const approvingId = useApprovePropertyModal().listingId

    const onSubmit = () => {
      setIsLoading(true);
      

      axios.patch(`/api/listings/approve/${approvingId}`).then(()=>{
        toast.success('Property Listing Approved Successfully!');
        router.refresh();
        router.push('/admin');
        confirmationModal.onClose()
      }).catch(()=>{
        toast.error('Something happened!')
      }).finally(()=>{
        setIsLoading(false)
      })
    
    }


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Approve this property?"
                subtitle="Do you really want to approve this property?"
                center
            />
        </div>
    )


  return (
    <Modal
    disabled={isLoading}
    isOpen={confirmationModal.isOpen}
    title="Approve Property"
    actionLabel='Approve'
    secondaryActionLabel='Cancel'
    secondaryAction={toggle}
    onClose={confirmationModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    />
  )
}

export default ConfirmationModal