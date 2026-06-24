
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getStats } from "../services/logService";
import Footer from "../components/Footer";
import {
  Shield,
  Brain,
  Lock,
  Activity,
  Database,
  ArrowRight,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

function Overview() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadStats();
  }, []);

  useEffect(() => {
    if (launching) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [launching, navigate]);

  if (launching) {
    return (
      <div className="launch-screen">
        <div className="launch-box">
          <div className="launch-logo">🛡️</div>

          <h1>Initializing SHIELD</h1>

          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>

          <div className="launch-steps">
            <p>✓ Loading AI Engine</p>
            <p>✓ Connecting Security Services</p>
            <p>✓ Fetching Threat Intelligence</p>
            <p>✓ Launching Dashboard</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <div className="premium-overview">
            <div className="network-bg">
  {[...Array(20)].map((_, i) => (
    <span key={i} className="node"></span>
  ))}
</div>
            <div className="cyber-background">

  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>

</div>

          {/* HERO */}

          <section className="premium-hero">

            <motion.div
              className="hero-left"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >

              <div className="hero-pill">
                AI Powered Threat Detection
              </div>

              <h1 className="premium-title">
                CYBER
                <br />
                SECURITY
              </h1>

              <p className="premium-subtitle">
                SHIELD combines Machine Learning,
                Threat Intelligence and Real-Time
                Monitoring to protect modern systems.
              </p>

              <div className="hero-actions">
                <button
                  className="launch-btn"
                 onClick={() => setLaunching(true)}
                >
                  Launch Dashboard
                  <ArrowRight size={18} />
                </button>

                <button
                  className="demo-btn"
                  onClick={() =>
                    navigate("/about")
                  }
                >
                  Learn More
                </button>
              </div>

            </motion.div>
<motion.div
  className="hero-right"
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
>
  <div className="shield-container">

    <div className="shield-glow"></div>

    <div className="shield-core">
      <Shield size={140} />
    </div>

    <div className="floating-tag ai">
      🧠 AI Analysis
    </div>

    <div className="floating-tag secure">
      🔒 Secure
    </div>

    <div className="floating-tag monitor">
      📡 Monitoring
    </div>

  </div>
</motion.div>
          </section>

<section className="overview-features">

  <div className="section-header">
    <span>CORE FEATURES</span>
    <h2>Everything You Need To Protect Your Systems</h2>
    <p>
      SHIELD combines machine learning, security
      analytics, and monitoring capabilities to
      identify threats and improve security posture.
    </p>
  </div>

  <div className="feature-grid">

    <div className="feature-card">
      <h3>Threat Detection</h3>
      <p>
        Detect suspicious network activities and
        potential cyber attacks using AI-powered
        anomaly detection.
      </p>
    </div>

    <div className="feature-card">
      <h3>Log Analysis</h3>
      <p>
        Process and analyze large volumes of
        security logs efficiently and accurately.
      </p>
    </div>

    <div className="feature-card">
      <h3>Real-Time Monitoring</h3>
      <p>
        Continuously monitor network events and
        security posture in real time.
      </p>
    </div>

    <div className="feature-card">
      <h3>Machine Learning Engine</h3>
      <p>
        Isolation Forest based model identifies
        unusual traffic patterns automatically.
      </p>
    </div>

    <div className="feature-card">
      <h3>Secure Authentication</h3>
      <p>
        JWT-based authentication ensures secure
        user access and session management.
      </p>
    </div>

    <div className="feature-card">
      <h3>Security Analytics</h3>
      <p>
        Visual dashboards provide actionable
        insights into threats and events.
      </p>
    </div>

  </div>

</section>
<section className="workflow-section">

  <div className="section-header">
    <span>WORKFLOW</span>
    <h2>How SHIELD Protects Your Network</h2>
    <p>
      SHIELD follows an intelligent security
      analysis pipeline to identify threats and
      provide actionable insights.
    </p>
  </div>

  <div className="workflow-container">

    <div className="workflow-item">
      <div className="workflow-icon">📁</div>
      <h3>Upload Logs</h3>
      <p>
        Upload network and security logs
        for analysis.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-item">
      <div className="workflow-icon">⚙️</div>
      <h3>Data Processing</h3>
      <p>
        Clean and prepare log data for
        machine learning.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-item">
      <div className="workflow-icon">🤖</div>
      <h3>ML Analysis</h3>
      <p>
        Isolation Forest model detects
        anomalies automatically.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-item">
      <div className="workflow-icon">🛡️</div>
      <h3>Threat Detection</h3>
      <p>
        Potential threats are identified
        and classified.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-item">
      <div className="workflow-icon">📊</div>
      <h3>Security Insights</h3>
      <p>
        Results are visualized in the
        dashboard.
      </p>
    </div>

  </div>

</section>

<section className="overview-stats">

  <div className="overview-stat">
    <h3>5000+</h3>
    <p>Logs Processed</p>
  </div>

  <div className="overview-stat">
    <h3>98%</h3>
    <p>Detection Accuracy</p>
  </div>

  <div className="overview-stat">
    <h3>24/7</h3>
    <p>Monitoring</p>
  </div>

  <div className="overview-stat">
    <h3>AI</h3>
    <p>Threat Detection</p>
  </div>
                            
</section>
<section className="command-center">

  <div className="section-header">
    <span>SECURITY COMMAND CENTER</span>

    <h2>System Health Overview</h2>

    <p>
      Monitor critical security services,
      AI engine performance and overall
      platform readiness.
    </p>
  </div>

  <div className="command-grid">

    <div className="command-card">
      <div className="command-row">
        <span>Threat Detection</span>
        <strong>98%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: "98%" }}
        ></div>
      </div>
    </div>

    <div className="command-card">
      <div className="command-row">
        <span>AI Engine</span>
        <strong>95%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: "95%" }}
        ></div>
      </div>
    </div>

    <div className="command-card">
      <div className="command-row">
        <span>Network Monitoring</span>
        <strong>99%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: "99%" }}
        ></div>
      </div>
    </div>

    <div className="command-card">
      <div className="command-row">
        <span>System Availability</span>
        <strong>100%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: "100%" }}
        ></div>
      </div>
    </div>

  </div>

</section>

        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Overview;

