'use client'
import {AiOutlineMenu} from 'react-icons/ai'

import Avatar from '../Avatar'
import {useState, useCallback} from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import {signOut} from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";


interface UserMenuProps{
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()
    const [isOpen, setIsOpen] = useState(false)
    
   
    const toggleOpen = useCallback(()=>{
        setIsOpen((value)=> !value)
    }, [])

    const onRent = useCallback(()=>{
        if (!currentUser){
            return loginModal.onOpen();
        }

        //Open Rent Modal
        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal]);

    const signout = useCallback(()=>{
        signOut({callbackUrl: '/'});
        toast.success('Logged out successfuly')
        router.push('/');
        router.refresh();
    }, [router]);


  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            {currentUser && (
                <div
                className="cursor-pointer text-rose-500 transition-all ease-in-out duration-200
                hover:opacity-90
                "
                onClick={()=> router.push('/conversations')}
                >
                <HiChatBubbleLeftEllipsis
                size={26}
                />
                </div>
            )}
            
            <div
            onClick={onRent}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
                Snapp Your Home !
            </div>
            <div
            onClick={toggleOpen}
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
                <AiOutlineMenu/>
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>
        {isOpen && (
            <div className="rounded-xl absolute shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                              <>
                              <MenuItem onClick={()=> router.push('/trips')} 
                              label="My trips"/>
                              <MenuItem onClick={()=>router.push('/favorites')} 
                              label="My favorites"/>
                              <MenuItem onClick={()=>router.push('/reservations')} 
                              label="My reservation"/>
                              <MenuItem onClick={()=> router.push('/properties')} 
                              label="My properties"/>
                              <MenuItem onClick={onRent} 
                              label="Snapp my home"/>
                              <hr/>
                              
                              <MenuItem onClick={signout} 
                              label="Logout"/>
                  
                            
                              </>
                        ) : (
                            <>
                            <MenuItem onClick={loginModal.onOpen} label="Login"/>
                            <MenuItem onClick={registerModal.onOpen} label="Sign up"/>
                            </>
                        )}
                      
                    </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu