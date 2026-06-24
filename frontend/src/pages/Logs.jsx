import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getLogs } from "../services/logService";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [protocolFilter, setProtocolFilter] = useState("ALL");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await getLogs();
        setLogs(data.logs || data);
      } catch (error) {
        console.error(error);
        setError("Security events could not be loaded.");
      }
    };
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = (log.sourceIP || "").toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (protocolFilter === "ALL" || log.protocol === protocolFilter);
  });

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="content-container">
          <header className="page-header">
            <div>
              <p className="eyebrow">Event intelligence</p>
              <h1 className="page-title">Security events</h1>
              <p className="page-description">Search and inspect network activity across your monitored environment.</p>
            </div>
            <span className="live-indicator">{logs.length} events indexed</span>
          </header>

          <div className="toolbar">
            <div className="search-control">
              <input
                className="filter-control"
                type="search"
                placeholder="Search by source IP address..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search source IP"
              />
            </div>
            <div className="select-control">
              <select
                className="filter-control"
                value={protocolFilter}
                onChange={(event) => setProtocolFilter(event.target.value)}
                aria-label="Filter by protocol"
              >
                <option value="ALL">All protocols</option>
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
                <option value="ICMP">ICMP</option>
              </select>
            </div>
          </div>

          <section className="panel table-panel">
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr><th>Source IP</th><th>Destination IP</th><th>Protocol</th><th>Risk score</th><th>Assessment</th></tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => {
                    const isThreat = log.prediction === "threat";
                    return (
                      <tr key={log._id}>
                        <td className="mono">{log.sourceIP}</td>
                        <td className="mono">{log.destinationIP}</td>
                        <td><span className="protocol-badge">{log.protocol}</span></td>
                        <td><strong className={log.threatScore >= 50 ? "score-threat" : "score-safe"}>{log.threatScore}</strong></td>
                        <td><span className={`status-badge ${isThreat ? "threat" : "safe"}`}>{isThreat ? "Threat" : "Safe"}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!filteredLogs.length && <div className="empty-state">{error || "No security events match your filters."}</div>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Logs;
