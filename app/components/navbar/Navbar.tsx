import getCurrentUser from '@/app/actions/getCurrentUser'
import NavbarClient from './NavbarClient'

const Navbar = async () => {
  const currentUser = await getCurrentUser();
 
  return (
    <NavbarClient
    currentUser = {currentUser}
    />
  )
  
}

export default Navbar