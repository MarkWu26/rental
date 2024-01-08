import prisma from '@/app/libs/prismadb'

export default async function getPendingReservationsCount () 
{
 try {

    const pendingReservations = await prisma.reservation.count({
        where: {
            status: 2,
        }
    })

    return pendingReservations
 } catch (error: any) {
    throw new Error(error)
 }
}
