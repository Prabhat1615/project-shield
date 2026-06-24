import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ProtocolChart from "../components/ProtocolChart";
import { getAIPrediction, getModelMetrics } from "../services/mlService";
import { getStats, getProtocolStats } from "../services/logService";
import Footer from "../components/Footer";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [protocols, setProtocols] = useState({});
  const [aiPrediction, setAiPrediction] = useState("Loading");
  const [modelMetrics, setModelMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, protocolData, aiData, metricsData] = await Promise.all([
          getStats(),
          getProtocolStats(),
          getAIPrediction(),
          getModelMetrics(),
        ]);
        setStats(statsData);
        setProtocols(protocolData);
        setAiPrediction(aiData.prediction);
        setModelMetrics(metricsData.metrics);
      } catch (requestError) {
        console.error("Dashboard Error:", requestError);
        setError("Dashboard data could not be loaded. Confirm that the API and ML model are running.");
      }
    };

    loadDashboardData();
  }, []);

  if (!stats) return <div className="loading-screen">{error || "Preparing your security overview..."}</div>;

  const isThreat = aiPrediction === "threat";
  const safeRate = stats.totalLogs ? Math.round((stats.safeLogs / stats.totalLogs) * 100) : 100;

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="content-container">
<header className="page-header">
  <div>
    <p className="eyebrow">Security overview</p>

    <h1 className="page-title">
      Security operations overview
    </h1>

    <p className="page-description">
      Monitor network activity, model output,
      and current security posture.
    </p>
  </div>

  <div
    style={{
      display: "flex",
      gap: "12px",
      alignItems: "center",
    }}
  >
<button
  onClick={() =>
    window.open(
      "http://localhost:5000/api/report/pdf",
      "_blank"
    )
  }
  className="report-button"
>
  📊 Export Report
</button>
  </div>
</header>


          <section className="stats-grid">
            <StatCard title="Total events" value={stats.totalLogs} />
            <StatCard title="Safe events" value={stats.safeLogs} tone="green" meta="No action required" />
            <StatCard title="Threat events" value={stats.threatLogs} tone="red" meta="Flagged for review" />
            <StatCard title="Average risk score" value={stats.averageThreatScore} tone="amber" meta="Calculated threat level" />
          </section>

          <section className="dashboard-grid">
            <ProtocolChart protocols={protocols} />
            <aside className="panel posture-panel">
              <div className="panel-heading">
                <div>
                  <h2>Security posture</h2>
                  <p>Current model-assisted assessment</p>
                </div>
                <span className={`status-badge ${isThreat ? "threat" : "safe"}`}>
                  {isThreat ? "Attention" : "Healthy"}
                </span>
              </div>
              <div className="posture-score">
                <div><strong>{safeRate}%</strong><span>safe traffic</span></div>
              </div>
              <div className="posture-list">
                <div className="posture-row"><span>AI assessment</span><strong>{isThreat ? "Threat detected" : "No active threat"}</strong></div>
                <div className="posture-row"><span>Model precision</span><strong>{modelMetrics ? `${Math.round(modelMetrics.precision * 100)}%` : "Unavailable"}</strong></div>
                <div className="posture-row"><span>Model recall</span><strong>{modelMetrics ? `${Math.round(modelMetrics.recall * 100)}%` : "Unavailable"}</strong></div>
                <div className="posture-row"><span>Monitoring</span><strong>Continuous</strong></div>
              </div>
            </aside>
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Dashboard;
