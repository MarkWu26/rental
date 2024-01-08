import prisma from '@/app/libs/prismadb'

export default async function getRejectedReservationsCount () 
{
 try {
   
    const pendingReservations = await prisma.reservation.count({
        where: {
            status: 3,
        }
    })

    return pendingReservations
 } catch (error: any) {
    throw new Error(error)
 }
}
