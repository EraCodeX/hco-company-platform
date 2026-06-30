import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

const DashboardChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],

    datasets: [
      {
        label: "Visitors",

        data: [120, 250, 180, 320, 410, 580, 760],

        borderColor: "#c9a861",

        backgroundColor: "rgba(201,168,97,.15)",

        fill: true,

        tension: 0.4,

        pointRadius: 4,

        pointBackgroundColor: "#c9a861",
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "#eef2f7",
        },
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
};

export default DashboardChart;
