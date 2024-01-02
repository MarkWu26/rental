'use client'

import { useMemo, useState, useEffect } from 'react';
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import { rentalTypes } from '../inputs/CategoryInput';
import CategoryInput from '../inputs/CategoryInput';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useSuccessModal from '@/app/hooks/useSuccessModal';
import TimeInput from '../inputs/TimeInput';
import { HiInformationCircle } from "react-icons/hi2";
import CleaningInfo from '../CleaningInfo';

enum STEPS {
    RENTALTYPE = 0,
    CATEGORY = 1,
    LOCATION = 2,
    INFO = 3,
    IMAGES = 4,
    DESCRIPTION = 5,
    TIME = 6,
    PRICE = 7,
    ID = 8,
    DOCUMENTS = 9
}

const RentModal = () => {
    const rentModal = useRentModal();
    const successModal = useSuccessModal();
    const router = useRouter()

    const [step, setStep] = useState(STEPS.RENTALTYPE);
    const [isLoading, setIsLoading] = useState(false)
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [isCleaningFee, setIsCleaningFee] = useState(false);

    //when cleaning fee option is checked
    const handleCleaningFee = () => {
        setIsCleaningFee((prev)=> !prev)
    }

    console.log('is Cleaning fee? ', isCleaningFee)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset 
    } = useForm<FieldValues>({
        defaultValues: {
            rentalType: '',
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathRoomCount: 1,
            imageSrc: '',
            price: 1,
            cleaningFee: 1,
            title: '',
            description: '',
            isApproved: false,
            documentImageSrc: '',
            idImageSrc: '',
            checkoutTime: '',
            checkinTime: '',

        }
    })

    const rentalType = watch('rentalType');
    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathRoomCount = watch('bathRoomCount')
    const title = watch('title')
    const description = watch('description')
    const imageSrc = watch('imageSrc');
    const price = watch('price');
    const cleaningFee = watch('cleaningFee');
    console.log('the cleaning fee: ', cleaningFee)
    const checkinTime = watch('checkinTime');
    const checkoutTime = watch('checkoutTime');
    const documentImageSrc = watch('documentImageSrc');
    const idImageSrc = watch('idImageSrc');

    useEffect(()=>{ //disable buttons if user did not input anything
      
        if(step === STEPS.RENTALTYPE && rentalType === ''){
            setIsLoading(true)
        } else if (step === STEPS.RENTALTYPE && rentalType !== ''){
            setIsLoading(false)
        }

        if(step === STEPS.CATEGORY && category === ''){
            setIsLoading(true)
        } else if (step === STEPS.CATEGORY && category !== '') {
            setIsLoading(false)
        }

        if(step === STEPS.IMAGES && (imageSrc === '' || !imageSrc)){
            console.log('hello?', imageSrc)
            setIsLoading(true)
        } else if (step === STEPS.IMAGES && imageSrc !== '') {
            console.log('hi?')
            setIsLoading(false)
        }

        if((step === STEPS.DESCRIPTION) && (title === '' || description === '' )){
            setIsLoading(true)
        } else if ((step === STEPS.DESCRIPTION) && (title !== '' || description !== '' )) {
            setIsLoading(false)
        }
        
        if(step === STEPS.PRICE && (price === '' || cleaningFee === '' || !cleaningFee)){
            setIsLoading(true)
        } else if (step === STEPS.PRICE && (price !== '' || cleaningFee !== '' || cleaningFee)) {
            setIsLoading(false)
        }

        if(step === STEPS.ID && idImageSrc === ''){
            setIsLoading(true)
        } else if (step === STEPS.IMAGES && idImageSrc !== '') {
            setIsLoading(false)
        }

        if(step === STEPS.DOCUMENTS && documentImageSrc === ''){
            setIsLoading(true)
        } else if (step === STEPS.IMAGES && documentImageSrc !== '') {
            setIsLoading(false)
        }


    }, [step, rentalType, category, imageSrc, title, description, price, idImageSrc,
    documentImageSrc, cleaningFee])

    const Map = useMemo(()=> dynamic(()=> import('../Map'), {
        ssr:false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onBack = () => {
        setStep((value)=> value - 1)
    }

    const onNext = () => {
        setStep((value)=> value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.DOCUMENTS){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', {isCleaningFee, ...data})
        .then(()=>{
            rentModal.onClose()
            router.refresh()
            router.push('/properties')
            reset();
            setStep(STEPS.RENTALTYPE);
            successModal.onOpen('Listing Successfully Created!', 'PLease wait for 24 hours for the verification of your property.')
        }).catch(()=>{
            toast.error('Something went wrong')
        }).finally(()=>{
            setIsLoading(false)
            setIsCleaningFee(false)
        })
    }

    const actionLabel = useMemo(()=>{
        if(step === STEPS.DOCUMENTS ){
            return 'Create';
        }

        return 'Next'
    }, [step])

    const rentalDescription = useMemo(()=>{
        return rentalTypes.filter((rental)=> rental.label === rentalType);
    }, [rentalTypes, rentalType])

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.RENTALTYPE){
            return undefined
        }

        return 'Back'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Stay Duration Options"
                subtitle='Pick a rental type'
            />
            <div className="
                grid 
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
                "
            >
                {rentalTypes.map((rental)=> (
                    <div key={rental.label}>
                        <CategoryInput
                        label={rental.label}
                        name={rental.name}
                        selected={rentalType === rental.label}
                        onClick={(rentalType)=> setCustomValue('rentalType', rentalType)}
                        isRental
                        />
                    </div>
                ))}
             
            </div>
         
            {rentalDescription[0]?.description}
           
        </div>
    )

    if(step === STEPS.CATEGORY){
         bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Which of these best describes your place?"
                    subtitle='Pick a category'
                />
                <div className="
                    grid 
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                    "
                >
                    {categories.map((item)=> (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                            onClick={(category)=>setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Where is your place located?"
                    subtitle='Help guests find you!'
                />
                <CountrySelect
                onChange={(value)=> setCustomValue('location', value)}
                value={location}
                />
                <Map
                    center={location?.latlng}
                    onChange={(value)=> setCustomValue('location', value)}
                    value={location}
                    isDraggable={true}
                />
            </div>
        )
    }

    if(step === STEPS.INFO){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title="Share some basics about your place"
                subtitle="What amenities do you have?"
                />
                <Counter
                    title="Guests"
                    subtitle='How many guests do you allow?'
                    value={guestCount}
                    onChange={(value)=>setCustomValue('guestCount', value)}
                />
                <hr/>
                <Counter
                    title="Rooms"
                    subtitle='How many rooms do you have?'
                    value={roomCount}
                    onChange={(value)=>setCustomValue('roomCount', value)}
                />
                <hr/>
                <Counter
                    title="Bathrooms"
                    subtitle='How many bathrooms do you have?'
                    value={bathRoomCount}
                    onChange={(value)=>setCustomValue('bathRoomCount', value)}
                />
            </div>
        )
    }

    if(step === STEPS.IMAGES){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Add a photo of your place"
                    subtitle='Show guests what your place looks like!'
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value)=> setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if(step === STEPS.DESCRIPTION){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="description"
                    label="Description"
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if(step === STEPS.TIME){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Set Check-in and Checkout Times"
                    subtitle='Specify the times when guests can check in and check out'
                />
                <TimeInput
                value={checkinTime}
                onChange={(value)=> setCustomValue('checkinTime', value)}
                />
                <TimeInput
                value={checkoutTime}
                onChange={(value)=> setCustomValue('checkoutTime', value)}
                isCheckOut
                />
            </div>
        )
    }

    if(step === STEPS.PRICE){
        bodyContent = (
            <div className='flex flex-col gap-4'>
                <Heading
                title="Now, set your price"
                subtitle='How much do you charge per night?'
                />
                <Input
                    id="price"
                    label="price"
                    formatPrice
                    type="number"
                    register={register}
                    errors={errors}
                    required
                />
                <div className='font-light  mt-2 flex flex-col gap-2'>
                        <div className="font-semibold text-lg">
                            Additional Pricing Options
                        </div>
                        <div className="flex flex-row gap-x-2 text-neutral-600 text-sm">
                            Tick the box below if you want to provide your guests a cleaning service.
                        </div>
                        <CleaningInfo
                        onClick={handleCleaningFee}
                        isCleaningFee={isCleaningFee}
                        />
                </div>
                <Input
                        id="cleaningFee"
                        label="Cleaning Fee"
                        formatPrice
                        type="number"
                        register={register}
                        errors={errors}
                        required
                        />        
               
            </div>
        )
    }

    if(step === STEPS.ID){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                title="Upload a picture of your valid ID"
                subtitle="Verify the ownership of your property!"
                />
                  <ImageUpload
                    value={idImageSrc}
                    onChange={(value)=> setCustomValue('idImageSrc', value)}
                />
            </div>
        )
    }

    if(step === STEPS.DOCUMENTS){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                title="Upload a picture of Transfer Certificate of Title or 
                Tax Declaration of your property"
                subtitle="Verify the ownership of your property!"
                />
                  <ImageUpload
                    value={documentImageSrc}
                    onChange={(value)=> setCustomValue('documentImageSrc', value)}
                />
            </div>
        )
    }

  return (
    <Modal
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.RENTALTYPE ? undefined : onBack}
    title='Snapp your home!'
    body={bodyContent}
    disabled={isLoading}
    />
  )
}

export default RentModal