import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getStats } from "../services/logService";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load profile stats:", error);
      }
    };

    loadStats();
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "SA";

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <div style={{ padding: "30px" }}>
          <h1 style={{ marginBottom: "24px" }}>
            👤 User Profile
          </h1>

          {/* Profile Header */}
          <div className="profile-header-card">
            <div className="profile-avatar-large">
              {initials}
            </div>

            <div className="profile-name">
              {user?.name || "Security Analyst"}
            </div>

            <div className="profile-role">
              Security Analyst
            </div>

            <div className="profile-info">
              <div className="profile-info-item">
                📧 {user?.email}
              </div>

              <div className="profile-info-item">
                🟢 Active Session
              </div>

              <div className="profile-info-item">
                🛡️ Security Team
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="profile-stats">
            <div className="profile-stat-card">
              <h2>{stats?.totalLogs ?? 0}</h2>
              <p>Total Events</p>
            </div>

            <div className="profile-stat-card">
              <h2>{stats?.safeLogs ?? 0}</h2>
              <p>Safe Events</p>
            </div>

            <div className="profile-stat-card">
              <h2>{stats?.threatLogs ?? 0}</h2>
              <p>Threat Events</p>
            </div>

            <div className="profile-stat-card">
              <h2>{stats?.averageThreatScore ?? 0}</h2>
              <p>Average Risk Score</p>
            </div>
          </div>

          {/* Account Information */}
          <div className="account-card">
            <h2>Account Information</h2>

            <table className="account-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Name</strong>
                  </td>
                  <td>{user?.name}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Email</strong>
                  </td>
                  <td>{user?.email}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Role</strong>
                  </td>
                  <td>Security Analyst</td>
                </tr>

                <tr>
                  <td>
                    <strong>Status</strong>
                  </td>
                  <td>Active Session</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;

