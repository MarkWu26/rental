'use client'

import {useState, useEffect} from 'react'

import { useRouter } from 'next/router'

interface ClientOnlyProps{
    children: React.ReactNode

}

const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState<boolean>()

  
    useEffect(()=>{
        setHasMounted(true)
    }, [])

    if(!hasMounted){
        return null
    }
  return (
    <>
    {children}
    </>
  )
}

export default ClientOnly