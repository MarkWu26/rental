import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getRejectedReservationsCount (params: IParams) 
{
 try {
    const {hostId} = params

    const pendingReservations = await prisma.reservation.count({
        where: {
            status: 3,
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
