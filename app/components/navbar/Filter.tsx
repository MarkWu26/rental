'use client'

import { usePathname, useSearchParams } from "next/navigation";
import Container from "../Container"
import FilterItems from "./FilterItems";
import { SafeUser } from "@/app/types";

interface FilterProps{
    currentUser?: SafeUser | null;
}

const Filter: React.FC<FilterProps> = ({
    currentUser
}) => {

    const pathName = usePathname()

    const isAuthorizedPage = pathName === '/properties' || pathName === '/admin'

    if(!isAuthorizedPage){ //do not render if the current page is not properties or admin page
        return null;
    }

    

  return (
    
    <div className="w-full flex flex-row items-center h-[60px] justify-center p-3 overflow-x-auto">
        <FilterItems currentUser={currentUser}/>
    </div>

  )
}

export default Filter