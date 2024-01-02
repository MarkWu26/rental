'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'
import useDeleteReviewModal from '@/app/hooks/useDeleteReviewModal'
import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const DeleteReviewModal = () => {
    const router = useRouter();
    const deleteModal = useDeleteReviewModal();
    const [isLoading, setIsLoading] = useState(false)
  
    const toggle = useCallback(()=>{
        deleteModal.onClose();
    }, [deleteModal])

    const reviewId = useDeleteReviewModal().reviewId 

    

    const onSubmit = () => {
      setIsLoading(true);
      console.log('review to be deleted: ', reviewId)
      axios.delete(`/api/reviews/delete/${reviewId}`)
      .then(()=>{
        toast.success('Review deleted!');
        router.refresh();
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
                title="Delete this review?"
                subtitle="Do you really want to delete this review?"
                center
            />
        </div>
    )

  return (
    <Modal
    disabled={isLoading}
    isOpen={deleteModal.isOpen}
    title="Delete Review"
    actionLabel='Delete'
    secondaryActionLabel='Cancel'
    secondaryAction={toggle}
    onClose={deleteModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    />
  )
}

export default DeleteReviewModal