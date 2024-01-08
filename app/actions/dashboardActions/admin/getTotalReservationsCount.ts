import prisma from '@/app/libs/prismadb'

export default async function getTotalReservationsCount () 
{
 try {

    const reservations = await prisma.reservation.count({
        where: {
            status: 1,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return reservations
 } catch (error: any) {
    throw new Error(error)
 }
}
