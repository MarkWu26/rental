'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'
import useSuccessModal from '@/app/hooks/useSuccessModal'
import Modal from './Modal'
import Heading from '../Heading'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const SuccessModal = () => {
    const router = useRouter();
   
    const SuccessModal = useSuccessModal();
  
    const toggle = useCallback(()=>{
        SuccessModal.onClose();
        router.push('/trips');
        router.refresh();
    }, [router, SuccessModal])


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title={SuccessModal.title}
                subtitle={SuccessModal.subtitle}
                center
            />
        </div>
    )


  return (
    <Modal
    isOpen={SuccessModal.isOpen}
    title="Reservation processing"
    actionLabel='Continue'
    onClose={SuccessModal.onClose}
    onSubmit={toggle}
    body={bodyContent}
    />
  )
}

export default SuccessModal