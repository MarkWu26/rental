import prisma from '@/app/libs/prismadb'

export default async function getInProgressTripsToday () 
{
 try {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
   
    const inProgressTrips = await prisma.reservation.count({
        where: {
            status: 1,
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
