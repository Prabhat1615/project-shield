import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/security-bg.jpg";
import Brand from "../components/Brand";
import { getApiError } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await registerUser(formData);
      navigate("/login");
    } catch (requestError) {
      console.error(requestError);
      setError(getApiError(requestError, "We couldn't create your account. Please review your details and try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual" style={{ backgroundImage: `url(${bgImage})` }}>
        <Brand />
        <div className="auth-copy">
          <p className="eyebrow">Built for modern security teams</p>
          <h1>Start protecting your network today.</h1>
          <p>
            Turn raw security logs into clear, actionable intelligence from one
            calm and dependable workspace.
          </p>
          <div className="security-points">
            <span>Fast onboarding</span>
            <span>Protected access</span>
          </div>
        </div>
      </section>

      <section className="auth-form-side">
        <div className="auth-card">
          <p className="eyebrow">Create your account</p>
          <h2>Join Project Shield</h2>
          <p>Set up your analyst profile to begin monitoring security events.</p>

          {error && <div className="form-message" role="alert">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input
                className="form-input"
                id="name"
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Work email</label>
              <input
                className="form-input"
                id="email"
                type="email"
                name="email"
                placeholder="analyst@company.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-input"
                id="password"
                type="password"
                name="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength="8"
                required
              />
            </div>

            <button className="primary-button auth-submit" type="submit" disabled={submitting}>
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
