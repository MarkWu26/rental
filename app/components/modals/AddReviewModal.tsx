'use client'

import useReviewModal from "@/app/hooks/useReviewModal"
import Modal from "./Modal"
import Heading from "../Heading"
import ReviewInput from "../inputs/ReviewInput"
import Input from '../inputs/Input'
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {toast} from 'react-hot-toast'


const AddReviewModal = () => {

    const ReviewModal = useReviewModal();
    const [disabled, setDisabled] = useState(false);
    const [listingId, setListingId] = useState<string | undefined | null>('');
    const pathname = usePathname();
    const router = useRouter()
    console.log('listing iD: ', listingId)

    

    useEffect(()=>{
      const parts = pathname?.split('/listings/')[1];
      setListingId(parts);
    }, [])
   

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState:{
        errors
      },
      reset
    } = useForm<FieldValues>({
      defaultValues:{
        ratingValue: 1,
        comment: ''
      }
    })

    const star = watch('ratingValue');
    const comment = watch('comment')

    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }

    useEffect(()=>{
      const isDisabled = comment === '' || star === 0 || star === null;
      setDisabled(isDisabled);
    }, [star, comment])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      const newData = {listingId, ...data}

      setDisabled(true);
     
      axios.post('/api/reviews', newData)
      .then(()=>{
        ReviewModal.onClose();
        toast.success('Review succesfully submitted!');
        router.refresh();
      }).catch((error)=>{
        toast.error('something went wrong!');
        console.log(error)
      }).finally(()=>{
        setDisabled(false);
      })
    }

    let bodyContent = (
        <div className="flex flex-col gap-8 items-center justify-center">
            <Heading
            title="Add a Review"
            subtitle="Rate your stay, write a review!"
            center
            />
            <ReviewInput
            setCustomValue={setCustomValue}
            />
            <Input
            id="comment"
            label="Comment"
            register={register}
            errors={errors}
            required
            textarea
            />
        </div>
    )

  return (
    <Modal
    onClose={ReviewModal.onClose}
    isOpen={ReviewModal.isOpen}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={'Submit'}
    title='Review'
    body={bodyContent}
    disabled={disabled}
    isReview
    />
  )
}

export default AddReviewModal
