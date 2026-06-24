
import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  Shield,
  Database,
  Brain,
  BarChart3,
  Server,
  Lock,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Lock size={28} />,
      title: "JWT Authentication",
      desc: "Secure user authentication and authorization using JWT tokens.",
    },
    {
      icon: <Database size={28} />,
      title: "Log Management",
      desc: "Upload, process, and analyze security logs efficiently.",
    },
    {
      icon: <Brain size={28} />,
      title: "Machine Learning",
      desc: "Isolation Forest model for anomaly and threat detection.",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Analytics Dashboard",
      desc: "Interactive charts and security insights.",
    },
    {
      icon: <Shield size={28} />,
      title: "Threat Detection",
      desc: "Identify suspicious activities and generate risk scores.",
    },
    {
      icon: <Server size={28} />,
      title: "Real-Time Monitoring",
      desc: "Continuous monitoring of security posture.",
    },
  ];

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <section className="about-hero">

  <div className="hero-badge">
    ABOUT SHIELD
  </div>

  <h1>
    AI-Powered Security
    Analytics Platform
  </h1>

  <p>
    SHIELD combines Machine Learning,
    Security Analytics and Real-Time
    Monitoring to detect threats,
    analyze security events and improve
    cyber defense capabilities.
  </p>

</section>
        <div
          style={{
            padding: "30px",
            color: "white",
          }}
        >
          {/* Header */}
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <p
              style={{
                color: "#38bdf8",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              About SHIELD
            </p>

            <h1
              style={{
                fontSize: "42px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              🛡️ AI-Powered Security Analytics Platform
            </h1>

            <p
              style={{
                color: "#94a3b8",
                maxWidth: "900px",
                lineHeight: "1.8",
              }}
            >
              SHIELD is an intelligent cybersecurity platform that combines
              Machine Learning, Security Analytics, and Real-Time Monitoring
              to detect suspicious activities and assess threats from uploaded
              security logs.
            </p>
          </div>

          {/* Objective */}
          <div className="mission-grid">

  <div className="mission-card">
    <h3>🎯 Mission</h3>

    <p>
      Help organizations identify
      threats faster through intelligent
      AI-driven monitoring.
    </p>
  </div>

  <div className="mission-card">
    <h3>🚀 Vision</h3>

    <p>
      Build next-generation cyber defense
      systems powered by machine learning.
    </p>
  </div>

</div>

          {/* Features */}
          <h2 style={{ marginBottom: "20px" }}>🚀 Key Features</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div
                  style={{
                    color: "#38bdf8",
                    marginBottom: "15px",
                  }}
                >
                  {feature.icon}
                </div>

                <h3>{feature.title}</h3>

                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
         <div className="tech-grid">

  <div className="tech-card">
    <h3>Frontend</h3>
    <p>React.js + Vite</p>
  </div>

  <div className="tech-card">
    <h3>Backend</h3>
    <p>Node.js + Express.js</p>
  </div>

  <div className="tech-card">
    <h3>Machine Learning</h3>
    <p>Python + Flask</p>
  </div>

  <div className="tech-card">
    <h3>Database</h3>
    <p>MongoDB Atlas</p>
  </div>

</div>
<section className="architecture-section">

  <h2>System Architecture</h2>

  <div className="architecture-flow">

    <div className="arch-box">User</div>

    <div className="arch-arrow">↓</div>

    <div className="arch-box">
      React Frontend
    </div>

    <div className="arch-arrow">↓</div>

    <div className="arch-box">
      Node.js API
    </div>

    <div className="arch-arrow">↓</div>

    <div className="arch-box">
      Python ML Engine
    </div>

    <div className="arch-arrow">↓</div>

    <div className="arch-box">
      Threat Detection
    </div>

  </div>

</section>

          {/* Workflow */}
         {/* Workflow */}
<div className="card workflow-card">

  <h2>🔄 System Workflow</h2>

  <div className="workflow-modern">

    <div className="workflow-step">
      <div className="workflow-icon">📁</div>
      <h4>Upload Logs</h4>
      <p>Security events & network logs</p>
    </div>

    <div className="workflow-arrow">➜</div>

    <div className="workflow-step">
      <div className="workflow-icon">⚙️</div>
      <h4>Processing</h4>
      <p>Clean and validate records</p>
    </div>

    <div className="workflow-arrow">➜</div>

    <div className="workflow-step">
      <div className="workflow-icon">🤖</div>
      <h4>ML Analysis</h4>
      <p>Isolation Forest detection</p>
    </div>

    <div className="workflow-arrow">➜</div>

    <div className="workflow-step">
      <div className="workflow-icon">🛡️</div>
      <h4>Threat Score</h4>
      <p>Risk evaluation engine</p>
    </div>

    <div className="workflow-arrow">➜</div>

    <div className="workflow-step">
      <div className="workflow-icon">📊</div>
      <h4>Insights</h4>
      <p>Dashboard visualization</p>
    </div>

  </div>

</div>

        </div>
        <Footer />
      </main>
    </div>
  );
};

export default About;

