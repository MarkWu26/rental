'use client'
import Container from '../Container'
import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'
import { SafeUser } from '@/app/types'
import ClientOnly from '../ClientOnly'
import Filter from './Filter'
import AdminMenu from './AdminMenu'
import { usePathname, useRouter } from 'next/navigation'

interface NavbarClientProps{
  currentUser?: SafeUser | null;
}

const NavbarClient: React.FC<NavbarClientProps> = ({
  currentUser
}) => {
  const pathname = usePathname();
  const router = useRouter();
  console.log('navbar client:', currentUser);

  useEffect(()=>{
    if(pathname?.includes('/conversations')){
      setBody(null)
    }
  }, [pathname, router]);

console.log('client: ', currentUser)

  let navbarBody = (
<ClientOnly>
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b-[1px]">
            <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <Logo/>
                    <Search/>
                  
                    <UserMenu currentUser={currentUser}/>

                   

                    {/* {currentUser?.isAdmin ? (
                      <AdminMenu currentUser={currentUser}/>
                    ): (
                      <UserMenu currentUser={currentUser}/>
                    )}  */}
                 
                </div>
            </Container>
        </div>
        <Filter currentUser={currentUser}/>
        <Categories/>
    </div>
    </ClientOnly>
  )

  const [body, setBody] = useState<JSX.Element | null>(navbarBody)

 
                    useEffect(()=>{
                      if(!body){
                        setBody(navbarBody)
                      }
                    }, [])
  

  return body
}

export default NavbarClient