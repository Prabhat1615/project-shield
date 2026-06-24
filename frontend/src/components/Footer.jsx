import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        <div>
          <h2>🛡️ SHIELD</h2>

          <p>
            AI-Powered Security Analytics Platform
            for intelligent threat detection and
            cybersecurity monitoring.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <Link to="/">Overview</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/upload">Upload Logs</Link>
          <Link to="/logs">Security Events</Link>
        </div>

        <div>
          <h3>Technology</h3>

          <p>React + Vite</p>
          <p>Node.js + Express</p>
          <p>MongoDB Atlas</p>
          <p>Python ML Engine</p>
        </div>

        <div>
          <h3>Developer</h3>

          <p>Prabhat Kumar</p>

          <a
            href="https://github.com/Prabhat1615"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/prabhat-kumar-4b120326b"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 SHIELD Security Platform • Built by Prabhat Kumar
      </div>
    </footer>
  );
}

export default Footer;