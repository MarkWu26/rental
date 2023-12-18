'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Container from '../Container'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string'
import { SafeUser } from '@/app/types';

const filterData = [
    {
        name: 'All Properties',
        label: 'All'
    },
    {
        name: 'Pending Properties',
        label: 'Pending'
    },
    {
        name: 'Approved Properties',
        label: 'Approved'
    },
    {
        name: 'Rejected Properties',
        label: 'Rejected'
    },
]

interface FilterItemsProps{
    currentUser?: SafeUser | null
}

const FilterItems: React.FC<FilterItemsProps> = ({
    currentUser
}) => {

    const router = useRouter();
    const params = useSearchParams();


    const [selectedFilter, setSelectedFilter] = useState<string | null>('All')

    useEffect(()=>{
        let currentQuery = {}
        if(params){
            currentQuery = qs.parse(params?.toString());
            if(Object.keys(currentQuery).length === 0){
                setSelectedFilter('All')
            }
            else if (params?.get('filter') === 'Pending'){
                setSelectedFilter('Pending')
            }
            else if (params?.get('filter') === 'Approved'){
                setSelectedFilter('Approved')
            }
            else if (params?.get('filter') === 'Rejected'){
                setSelectedFilter('Rejected')
            } else {
                setSelectedFilter('All')
            }
        }
       
    }, [params])

    const handleClick = useCallback((label: string)=>{
        let currentQuery = {};
        setSelectedFilter(label || 'All');
        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            filter: label
        }

        if(!params?.get('filter')){
             setSelectedFilter('All')
        }

        if(params?.get('filter') === label){
            delete updatedQuery.filter
            setSelectedFilter('All')
        } else {
            setSelectedFilter(label)
        }

        const url = qs.stringifyUrl({
            url: currentUser?.isAdmin ? '/admin' : '/properties',
            query: updatedQuery
        }, {skipNull: true})

        router.push(url);
    }, [params, router, currentUser?.isAdmin])

  return (
    <Container>
    <div className="flex gap-x-8 flex-row">
        {filterData.map((item, index)=> (
            <div
            className={`px-6 cursor-pointer font-light ${
              selectedFilter === item.label ? 'border-b-2 font-semibold text-black' : 'text-gray-600 hover:text-black transition-all ease-in-out duration-200'
            }`}
            key={index}
            onClick={() => {
              handleClick(item.label);
            }}
          >
            {item.name}
            </div>
        ))}
       
     </div>
    </Container>
  )
}

export default FilterItems