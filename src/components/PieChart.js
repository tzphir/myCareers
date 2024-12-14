import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Tooltip, Legend, ArcElement);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true, // Display the title
      text: "Applied jobs vs. all remaining jobs", // Title text
    },
  },
};

function PieChart({ data }) {
  if (!data) {
    return <div>Loading...</div>; // Fallback for when data isn't available
  }

  return <Pie options={options} data={data} />;
}

export default PieChart;
