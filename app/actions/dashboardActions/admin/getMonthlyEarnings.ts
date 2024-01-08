import prisma from '@/app/libs/prismadb';
import {format} from 'date-fns'


interface EarningsPerMonth {
    [key: string]: number;
}
  
export default async function getMonthlyEarnings () {
  
  const calculateEarnings = (totalPrice: number) => {
    const feePercentage = 3;
    const earnings = (totalPrice * feePercentage) / 100;
    return Math.round(earnings * 100) / 100;
  };

  const allReservations = await prisma.reservation.findMany({
    where: {
        status: 1,
      },
        orderBy:{
          createdAt: 'asc'
        }
  });

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const earningsPerMonth: EarningsPerMonth = {};

  allReservations.forEach((reservation) => {
    const earnings = calculateEarnings(reservation.totalPrice);
    const monthYear = format(reservation.createdAt, 'MMMM yyyy')// Extracts "YYYY-MM" from the date
    const monthName = capitalize(monthYear.split(' ')[0])
    if (!earningsPerMonth[monthName]) {
      earningsPerMonth[monthName] = 0;
    }

    earningsPerMonth[monthName] += earnings;
  });

  const earningsData = [earningsPerMonth].flatMap((monthData)=>
  Object.entries(monthData).map(([month, earnings]) => ({
    month,
    earnings
  })))
  return earningsData;
  
}

