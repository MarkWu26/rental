import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getReservationsCount (params: IParams) 
{
 try {
    const {hostId} = params;

    const upcomingReservations = await prisma.reservation.count({
        where: {
            status: 1,
            listing: {
                userId: hostId
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return upcomingReservations
 } catch (error: any) {
    throw new Error(error)
 }
}
