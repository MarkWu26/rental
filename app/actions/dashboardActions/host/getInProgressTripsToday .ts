import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getInProgressTripsToday (params: IParams) 
{
 try {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const {hostId} = params
    const inProgressTrips = await prisma.reservation.count({
        where: {
            status: 1,
            listing: {
                userId: hostId
            },
            endDate: {
                gte: today, 
            },
            startDate:{
                lte: today
            }
        }
    })

    return inProgressTrips
 } catch (error: any) {
    throw new Error(error)
 }
}
