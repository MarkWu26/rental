'use client'

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

interface MonthlyData {
   month: string;
   earnings: number;
}

interface RevenueTrendProps{
    monthlyEarnings: MonthlyData[]
}

const RevenueTrendLine: React.FC<RevenueTrendProps> = ({
    monthlyEarnings
}) => {

  const data = {
    labels: monthlyEarnings.map((data) => data.month),
    datasets: [
      {
        label: "Earnings",
        data: monthlyEarnings.map((data) => data.earnings),
        borderColor: "#cb0c9f",
        borderWidth: 3,
        pointBorderColor: "#cb0c9f",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#f797e1");
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
          callback: (value: number) => `₱ ${value.toLocaleString()}`
        },
        title: {
          display: true,
          text: "Earnings",
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
   <div className="w-full xl:h-[52vh] p-[20px] shadow-xl bg-white rounded-xl border-[1px] border-neutral-200 cursor-pointer flex flex-col gap-y-1">
    <Line data={data} options={options}/>
    <div className="font-semibold flex flex-row items-center justify-center pb-1">
                    Monthly Earnings
    </div>
   </div>
  )
}

export default RevenueTrendLine