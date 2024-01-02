'use client'

import { IconType } from "react-icons"

interface CategoryInputProps {
    icon?: IconType;
    label: string;
    selected?: boolean;
    onClick: (value:string)=> void;
    isRental?: boolean,
    name?: string
}

export const rentalTypes = [
    {
        label: 'shortTerm',
        name: 'Short Term Rental',
        description: 'Short-term rentals are temporary accommodations leased for stays typically lasting up to 28 days, catering to individuals seeking brief stays, such as tourists or business travelers. These rentals offer flexibility without the commitment of a long-term lease.'
    },
    {
        label: 'longTerm',
        name: 'Long Term Rental',
        description: 'Long-term rentals extend beyond 28 days, providing extended housing solutions for individuals seeking more prolonged stays, such as those relocating, on extended work assignments, or in need of stable, extended-term accommodations.'
    }
]

const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    name,
    selected,
    onClick,
    isRental
}) => {
  return (
    <div
        onClick={()=> onClick(label)}
        className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected? 'border-black': 'border-neutral-200'}
        `}
    >
        {Icon && (
            <Icon size={30}/>
        )}
       
        <div className={`${isRental ? 'justify-center' : ''} font-semibold flex-row flex`}>
            {isRental ? name : label}
        </div>
    </div>
  )
}

export default CategoryInput