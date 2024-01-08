'use client'

import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Legend,
  Tooltip,
);

interface ListingRevenueType {
    [name: string]: number;
  }

interface ListingReservationProps{
    ListingRevenue: ListingRevenueType[]
}

const ListingRevenuePie: React.FC<ListingReservationProps> = ({
    ListingRevenue
}) => {

     // Sort the data by reservation count in descending order
  const sortedData = ListingRevenue.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);

  // Extract the top 3 listings and the rest
  const top3 = sortedData.slice(0, 3);
  const others = sortedData.slice(3);

  // Calculate the total sum of all data values
  const total = sortedData.reduce((acc, entry) => acc + Object.values(entry)[0], 0);

  // Calculate percentages for the top 3 listings
  const top3Percentages = top3.map((entry) => ({
    [Object.keys(entry)[0]]: (Object.values(entry)[0] / total) * 100,
  }));

  // Calculate percentage for the "Others" category
  const othersPercentage = others.length > 0 ? (others.reduce((acc, entry) => acc + Object.values(entry)[0], 0) / total) * 100 : 0;

  // Combine the top 3 listings and the "Others" category with percentages
  const finalData = [...top3Percentages];

  if (othersPercentage > 0) {
    finalData.push({ Others: othersPercentage });
  }

  console.log('final data: ', finalData)

    // Extracting data from the props
  const names = finalData.map((data) => Object.keys(data)[0]);
  const values = finalData.map((data) => Object.values(data)[0]);


  const data = {
    labels: names,
    datasets: [
      {
        label: "Reservations",
        data: values,
       /*  borderColor: "#fc3759", */
        borderWidth: 2,
        fill: true,
        backgroundColor: ['#fc3759', '#f5526e', '#f6647d', '#f99cac'], // Add your desired colors here
        borderColor: "#fff",
       /*  backgroundColor: (context: any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, "#f797e1");
            gradient.addColorStop(1, "white");
            return gradient;
        }, */
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
     /*  legend: {
        display: true,
        position: 'right',
      }, */
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value.toFixed(2)}%`;
          },
        },
      },
    },
  };

  return (
   <div className="xl:w-[35%] w-full md:w-[35%] flex flex-col gap-4 rounded-xl bg-white border-[1px] border-neutral-100 shadow-xl py-4 relative px-[65px] cursor-pointer">
    <Pie data={data} options={options} className=""/>
    <div className="font-semibold flex flex-row items-center justify-center pb-1">
    Leading Listings by Revenue
    </div>
   </div>
  )
}

export default ListingRevenuePie