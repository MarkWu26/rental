'use client'

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, // x axis
  LinearScale, // y axis

  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler
);

interface MonthlyData {
   month: string;
   reservations: number;
}

interface MonthlyReservationProps{
    monthlyReservation: MonthlyData[]
}

const MonthlyReservationBar: React.FC<MonthlyReservationProps> = ({
    monthlyReservation
}) => {

  const data = {
    labels: monthlyReservation.map((data) => data.month),
    datasets: [
      {
        label: "Reservations",
        data: monthlyReservation.map((data) => data.reservations),
        borderColor: "#007acc",
        borderWidth: 1,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#66a3ff");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
           
          },
        },
        title: {
          display: true,
          text: "Reservations",
          padding: {
            bottom: 10,
          },
          font: {
           
          },
        },
      },
      x: {
        ticks: {
          font: {
           
          },
        },
        title: {
          display: false,
          text: "Month",
          padding: {
            top: 10,
          },
          font: {
            
          },
        },
      },
    },
  };

  return (
   <div className="w-full p-[20px] shadow-xl bg-white rounded-xl border-[1px] border-neutral-200 cursor-pointer flex flex-col gap-y-1">
    <Bar data={data} options={options}/>
    <div className="font-semibold flex flex-row items-center justify-center pb-1">
                    Monthly Reservations
    </div>
   </div>
  )
}

export default MonthlyReservationBar