'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps{
    id: string;
    label:string;
    type?:string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    textarea?: boolean;
    comment?: string;
}

import React from 'react'
import { TbCurrencyPeso } from "react-icons/tb";


const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors,
    textarea = false,
    comment
}) => {
  let content;

  if(textarea){
    content = (
      <div className='w-full relative flex flex-col gap-2'>
      {formatPrice && (
          <TbCurrencyPeso size={24} className="text-neutral-700 absolute top-5 left-2"/>
      )}
       <label
      className={`   
      text-md
      z-10
      text-sm
      origin-[0]
      ${formatPrice ? 'left-9':'left-4'}
      peer-focus:-translate-y-4
      ${errors[id]?'text-rose-500':'text-zinc-400'}
      `}
      >{label}</label>
      <textarea
      id={id}
      disabled={disabled}
      {...register(id, {required})}
      placeholder=" "
      className={`
      peer 
      w-full 
      p-4 
      pt-6 
      font-white
      bg-white
      border-2
      rounded-md
      outline-none
      transition
      resize-none
      h-[130px]
      disabled:opacity-70
      disabled:cursor-not-allowed
      ${formatPrice? 'pl-9':'pl-4'}
      ${errors[id]?'border-rose-500': 'border-neutral-500'}
      ${errors[id]?'focus:border-rose-500': 'focus:border-black'}
      `}
      >{comment}</textarea>
     
  </div>
    )
  } else if (!textarea){
    content =
    (<div className='w-full relative'>
    {formatPrice && (
        <TbCurrencyPeso size={24} className="text-neutral-700 absolute top-5 
        left-2"/>
    )}
    <input
    min={1}
    id={id}
    disabled={disabled}
    {...register(id, {required})}
    placeholder=" "
    type={type}
    className={`
    peer 
    w-full 
    p-4 
    pt-6 
    font-white
    bg-white
    border-2
    rounded-md
    outline-none
    transition
    disabled:opacity-70
    disabled:cursor-not-allowed
    ${formatPrice? 'pl-9':'pl-4'}
    ${errors[id]?'border-rose-500': 'border-neutral-500'}
    ${errors[id]?'focus:border-rose-500': 'focus:border-black'}
    `}
    />
    <label
    className={`
    text-sm
    absolute
    text-md
    duration-100
    transform
    -translate-y-3
    top-5
    z-10
    origin-[0]
    ${formatPrice ? 'left-9':'left-4'}
    peer-placeholder-shown:scale-100
    peer-placeholder-shown:translate-y-0 
    peer-focus:scale-75
    peer-focus:-translate-y-4
    ${errors[id]?'text-rose-500':'text-zinc-400'}
    `}
    >{label}</label>
</div>)
  }

  return content
}

export default Input