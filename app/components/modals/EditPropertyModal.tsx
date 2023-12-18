'use client'

import { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from './Modal'
import useEditPropertyModal from '@/app/hooks/useEditPropertyModal'
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import type { CountrySelectValue } from '../inputs/CountrySelect';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const EditPropertyModal = () => {
    const editModal = useEditPropertyModal();
    
    const router = useRouter()
    const listing = editModal.listing //fetch the category of listing
    const listingLocValue = editModal.locationValue
    const listingLocLatlng = editModal.latlng
    const {getByValue} = useCountries()
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLatlng, setSelectedLatlng] = useState(listingLocLatlng)
    const [selectedLocValue, setSelectedLocValue] = useState<CountrySelectValue
    | undefined>(undefined)
    const [selectedListing, setSelectedListing] = useState(listing);

    useEffect(()=>{

        if(!selectedListing){
            setSelectedListing(listing)
        } else {
            setSelectedListing(listing)
        }
      
        
        if(!selectedLatlng){
            setSelectedLatlng(listingLocLatlng);
           
        } 

        if(!selectedLocValue){
            setSelectedLocValue(getByValue(listingLocValue || ''))
        }
       
    }, [
        listingLocLatlng, 
        selectedLatlng,
        selectedLocValue,
        listingLocValue,
        getByValue,
        listing,
        selectedListing
    ])

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
            category: selectedListing?.category,
            location: selectedLocValue || listingLocValue,
            guestCount: selectedListing?.guestCount,
            roomCount: selectedListing?.roomCount,
            bathRoomCount: selectedListing?.bathRoomCount,
            imageSrc: selectedListing?.imageSrc,
            price: selectedListing?.price,
            title: selectedListing?.title,
            description: selectedListing?.description,
            isApproved: false
        }
    })

    const close = () => {
        editModal.onClose();
        setSelectedLocValue(undefined);
        setSelectedLatlng(undefined);
    }

    const category = watch('category');
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathRoomCount = watch('bathRoomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(()=> dynamic(()=> import('../Map'), {
        ssr:false
    }), [location])

    const setCustomValue = useCallback((id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }, [setValue])

    useEffect(() => {
        setCustomValue('roomCount', selectedListing?.roomCount);
        setCustomValue('guestCount', selectedListing?.guestCount);
        setCustomValue('bathRoomCount', selectedListing?.bathRoomCount);
        setCustomValue('category', selectedListing?.category)
        setCustomValue('price', selectedListing?.price);
        setCustomValue('title', selectedListing?.title);
        setCustomValue('description', selectedListing?.description);
        setCustomValue('imageSrc', selectedListing?.imageSrc);
        setCustomValue('location', selectedListing?.locationValue)
   
        
      }, [selectedListing?.roomCount, 
        selectedListing?.guestCount, 
        selectedListing?.bathRoomCount,
        selectedListing?.category,
        selectedListing?.title,
        selectedListing?.price,
        selectedListing?.description,
        selectedListing?.imageSrc,
        selectedListing?.locationValue,
        setCustomValue,
        ]);

    const onBack = () => {
        setStep((value)=> value - 1)
    }

    const onNext = () => {
        setStep((value)=> value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true);
        const editedData = {...data, latlng: selectedLatlng}
        console.log('edited: ', editedData)

        axios.put(`/api/listings/edit/${selectedListing?.id}`, editedData)
        .then(()=>{
            toast.success('Listing Information Edited!');
            router.refresh()
            reset();
            setStep(STEPS.CATEGORY);
            editModal.onClose()
        }).catch(()=>{
            toast.error('Something went wrong')
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    const actionLabel = useMemo(()=>{
        if(step === STEPS.PRICE){
            return 'Save';
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return undefined
        }

        return 'Back'
    }, [step])

    let bodyContent = (
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
                        onClick={(category)=>{
                            setCustomValue('category', category);
                          
                        }}
                        selected={category === item.label}
                        label={item.label}
                        icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Where is your place located?"
                    subtitle='Help guests find you!'
                />
                <CountrySelect
                onChange={(value)=> {
                    setCustomValue('location', value);
                    setSelectedLocValue(value);
                    setSelectedLatlng(value.latlng)
                    
                }}
                value={selectedLocValue}
                />
                <Map
                    center={selectedLatlng || []}
                    onChange={(value)=> {
                        setCustomValue('location', value);
                        setSelectedLatlng(value.latlng); 
                        setSelectedLocValue(value);
                    }}
                    value={selectedLocValue}
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
                    subtitle='Click on the photo to edit your property image!'
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
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if(step === STEPS.PRICE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                title="Now, set your price"
                subtitle='How much do you charge per night?'
                />
                <Input
                    id="price"
                    label="price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

   
  return (
    <Modal
    isOpen={editModal.isOpen}
    onClose={close}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    title='Edit Property'
    body={bodyContent}
    />
  )
}

export default EditPropertyModal