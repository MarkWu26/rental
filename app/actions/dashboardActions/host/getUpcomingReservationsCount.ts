import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getUpcomingReservationsCount (params: IParams) 
{
 try {
    const {hostId} = params;

    const today = new Date();
    today.setHours(0, 0, 0, 0)

    const upcomingReservations = await prisma.reservation.count({
        where: {
            status: 1,
            listing: {
                userId: hostId
            },
            startDate: {
                gte: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Greater than or equal to the start of tomorrow
            },
        }
    })

    return upcomingReservations
 } catch (error: any) {
    throw new Error(error)
 }
}
