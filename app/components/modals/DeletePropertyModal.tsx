'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'
import useDeletePropertyModal from '@/app/hooks/useDeletePropertyModal'
import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const DeletePropertyModal = () => {
    const router = useRouter();
    const deleteModal = useDeletePropertyModal();
    const [isLoading, setIsLoading] = useState(false)
  
    const toggle = useCallback(()=>{
        deleteModal.onClose();
    }, [deleteModal])

    const deletingId = useDeletePropertyModal().listingId 

    const onSubmit = () => {
      setIsLoading(true);
      
      axios.delete(`/api/listings/${deletingId}`).then(()=>{
        toast.success('Property Listing Deleted!');
        router.refresh();
        router.push('/admin');
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
                title="Delete this property?"
                subtitle="Do you really want to delete this property?"
                center
            />
        </div>
    )

  return (
    <Modal
    disabled={isLoading}
    isOpen={deleteModal.isOpen}
    title="Delete Property"
    actionLabel='Delete'
    secondaryActionLabel='Cancel'
    secondaryAction={toggle}
    onClose={deleteModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    />
  )
}

export default DeletePropertyModal