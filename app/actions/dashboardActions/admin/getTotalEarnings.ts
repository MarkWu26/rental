import prisma from '@/app/libs/prismadb'


export default async function getTotalEarnings () {

    const calculateEarnings = (totalPrice: number) => {
        const feePercentage = 3;
        const fees = (totalPrice * feePercentage) / 100;
        return Math.round(fees * 100) / 100;
      }

    const allReservations = await prisma.reservation.findMany({
        where: {
            status: 1
        }
    });

    const totalEarnings = allReservations.reduce((accumulator, reservation) =>{
        const fees = calculateEarnings(reservation.totalPrice);

        return accumulator + fees
    }, 0)

    return totalEarnings
}