import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/security-bg.jpg";
import Brand from "../components/Brand";
import { getApiError } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (requestError) {
      console.error(requestError);
      setError(getApiError(requestError, "We couldn't sign you in. Check your credentials and try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual" style={{ backgroundImage: `url(${bgImage})` }}>
        <Brand />
        <div className="auth-copy">
          <p className="eyebrow">Secure intelligence</p>
          <h1>See threats clearly. Respond with confidence.</h1>
          <p>
            A focused workspace for monitoring network activity, identifying risk,
            and keeping your security operation one step ahead.
          </p>
          <div className="security-points">
            <span>Real-time monitoring</span>
            <span>AI-assisted analysis</span>
          </div>
        </div>
      </section>

      <section className="auth-form-side">
        <div className="auth-card">
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in to your workspace</h2>
          <p>Enter your analyst credentials to access the security console.</p>

          {error && <div className="form-message" role="alert">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <button className="primary-button auth-submit" type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="auth-switch">
            New to Project Shield? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
