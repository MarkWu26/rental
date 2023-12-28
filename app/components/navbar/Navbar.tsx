import getCurrentUser from '@/app/actions/getCurrentUser'
import NavbarClient from './NavbarClient'
import { SafeUser } from '@/app/types';

interface NavbarProps{
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = async ({
  currentUser
}) => {
  
 
  return (
    <NavbarClient
    currentUser = {currentUser}
    />
  )
  
}

export default Navbar