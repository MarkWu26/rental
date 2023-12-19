'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface LayoutClientProps{
    children: React.ReactNode
}

const LayoutClient: React.FC<LayoutClientProps> = ({
    children
}) => {
    const pathname = usePathname();
    const [isConversations, setConversations] = useState(false)

    useEffect(()=>{
        if(pathname?.includes('/conversations')){
            setConversations(true);
        }
    }, [pathname])

  return (
    <div className={`${isConversations ? '' : 'pb-20 pt-28'}`}>
        {children}
    </div>
  )
}

export default LayoutClient