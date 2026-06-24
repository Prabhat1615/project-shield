import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProtocolChart({ protocols }) {
  const data = {
    labels: Object.keys(protocols),
    datasets: [{
      data: Object.values(protocols),
      backgroundColor: ["#38bdf8", "#34d399", "#fbbf24", "#a78bfa", "#fb7185"],
      borderColor: "#0d1b2e",
      borderWidth: 4,
      hoverOffset: 5,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        position: "right",
        labels: { color: "#8fa3ba", usePointStyle: true, pointStyle: "circle", padding: 18, font: { size: 11 } },
      },
      tooltip: {
        backgroundColor: "#14263b",
        titleColor: "#f8fafc",
        bodyColor: "#bac8d8",
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <h2>Protocol distribution</h2>
          <p>Traffic volume grouped by network protocol</p>
        </div>
      </div>
      <div className="chart-wrap"><Doughnut data={data} options={options} /></div>
    </section>
  );
}

export default ProtocolChart;
