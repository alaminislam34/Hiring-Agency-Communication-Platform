"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js কে রেজিস্টার করা লাগে
ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = () => {
  const data = {
    labels: ["React", "Next.js", "Tailwind", "MongoDB"],
    datasets: [
      {
        label: "Technology Usage",
        data: [30, 25, 20, 25],
        backgroundColor: ["#61dafb", "#000000", "#38bdf8", "#13aa52"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="max-w-xs mx-auto  p-4">
      <h2 className="text-lg font-semibold text-center mb-4">Tech Overview</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CircleChart;
