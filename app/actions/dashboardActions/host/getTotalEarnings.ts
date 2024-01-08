import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getTotalEarnings (params: IParams) {

    const {hostId} = params;

    const calculateEarnings = (totalPrice: number) => {
        const feePercentage = 3;
        const earnings = totalPrice - (totalPrice * feePercentage) / 100;
        return Math.round(earnings * 100) / 100;
      }

    const allReservations = await prisma.reservation.findMany({
        where: {
                listing: {
                    userId: hostId
                },
            status: 1
        }
    });

    const totalEarnings = allReservations.reduce((accumulator, reservation) =>{
        const earnings = calculateEarnings(reservation.totalPrice);

        return accumulator + earnings
    }, 0)

    return totalEarnings
}