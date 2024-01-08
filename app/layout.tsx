import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import ApprovePropertyModal from './components/modals/ApprovePropertyModal'
import DeletePropertyModal from './components/modals/DeletePropertyModal'
import EditPropertyModal from './components/modals/EditPropertyModal'
import RejectPropertyModal from './components/modals/RejectPropertyModal'
import ApproveReservationModal from './components/modals/ApproveReservationModal'
import RejectReservationModal from './components/modals/RejectReservationModal'
import SuccessModal from './components/modals/SuccessModal'
import AuthContext from './context/AuthContext'
import LayoutClient from './LayoutClient'
import ReservationModal from './components/modals/ReservationModal'
import AddReviewModal from './components/modals/AddReviewModal'
import DeleteReviewModal from './components/modals/DeleteReviewModal'
import DeleteReservationModal from './components/modals/DeleteReservationModal'

const font = Nunito({
  subsets: ["latin"]
})


export const metadata: Metadata = {
  title: 'Snappstay',
  description: 'Snappstay, a rental web application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthContext>
        <ClientOnly>
          <ToasterProvider/>
          <RentModal/>
          <RegisterModal/>
          <LoginModal/>
          <ApprovePropertyModal/>
          <DeletePropertyModal/>
          <EditPropertyModal/>
          <RejectPropertyModal/>
          <ApproveReservationModal/>
          <RejectReservationModal/>
          <SuccessModal/>
          <DeleteReviewModal/>
          <ReservationModal/>
          <AddReviewModal/>
          <DeleteReservationModal/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <LayoutClient>{children}</LayoutClient>
        </AuthContext>
        </body>
    </html>
  )
}
