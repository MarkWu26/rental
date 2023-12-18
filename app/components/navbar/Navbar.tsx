'use client'
import Container from '../Container'
import React from 'react'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'
import { SafeUser } from '@/app/types'
import ClientOnly from '../ClientOnly'
import Filter from './Filter'
import AdminMenu from './AdminMenu'

interface NavbarProps{
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {

  return (
    <ClientOnly>
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b-[1px]">
            <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <Logo/>
                    <Search/>
                    {currentUser?.isAdmin ? (
                      <AdminMenu currentUser={currentUser}/>
                    ): (
                      <UserMenu currentUser={currentUser}/>
                    )}
                 
                </div>
            </Container>
        </div>
        <Filter currentUser={currentUser}/>
        <Categories/>
    </div>
    </ClientOnly>
  )
}

export default Navbar