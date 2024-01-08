import prisma from '@/app/libs/prismadb'


export default async function getCheckinToday () 
{
 try {
   

    const today = new Date();
    today.setHours(0, 0, 0, 0)
    
    const checkinCountToday = await prisma.reservation.count({
        where: {
            status: 1,
            startDate: {
                gte: today, // Greater than or equal to the start of today
                lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Less than the start of the next day
              },
        }
    })

    return checkinCountToday
 } catch (error: any) {
    throw new Error(error)
 }
}
