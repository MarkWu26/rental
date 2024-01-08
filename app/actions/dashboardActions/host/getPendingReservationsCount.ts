import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getPendingReservationsCount (params: IParams) 
{
 try {
    const {hostId} = params

    const pendingReservations = await prisma.reservation.count({
        where: {
            status: 2,
            listing: {
                userId: hostId
            }
        }
    })

    return pendingReservations
 } catch (error: any) {
    throw new Error(error)
 }
}
