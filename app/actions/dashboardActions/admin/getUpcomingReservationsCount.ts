import prisma from '@/app/libs/prismadb'


export default async function getUpcomingReservationsCount () 
{
 try {

    const today = new Date();
    today.setHours(0, 0, 0, 0)

    const upcomingReservations = await prisma.reservation.count({
        where: {
            status: 1,
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
