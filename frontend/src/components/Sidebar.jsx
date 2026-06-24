
import { Link, useLocation, useNavigate } from "react-router-dom";
import Brand from "./Brand";

const icons = {
  overview: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12L12 4L21 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 10V20H18V10"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  ),

  dashboard: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  ),

  upload: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 16V4m0 0L8 8m4-4 4 4M5 14v5h14v-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  logs: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M7 5h13M7 12h13M7 19h13M3.5 5h.01M3.5 12h.01M3.5 19h.01"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),

  about: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 10v6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  ),
};

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    {
      to: "/",
      label: "Overview",
      icon: icons.overview,
    },

    {
      to: "/dashboard",
      label: "Dashboard",
      icon: icons.dashboard,
    },

    {
      to: "/upload",
      label: "Upload Logs",
      icon: icons.upload,
    },

    {
      to: "/logs",
      label: "Security Events",
      icon: icons.logs,
    },

    {
      to: "/about",
      label: "About SHIELD",
      icon: icons.about,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user")
    );
  } catch {
    user = null;
  }

  const initials = user?.name
    ? user.name
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "SA";

  return (
    <aside className="sidebar">
      <Brand />

      <nav
        className="sidebar-nav"
        aria-label="Main navigation"
      >
        <p className="nav-label">
          Workspace
        </p>

        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link ${
              location.pathname === link.to
                ? "active"
                : ""
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div
          className="analyst-card"
          onClick={() =>
            navigate("/profile")
          }
        >
          <div className="analyst-avatar">
            {initials}
          </div>

          <div>
            <strong>
              {user?.name ||
                "Security Analyst"}
            </strong>

            <span>
              Active Session
            </span>
          </div>
        </div>

        <button
          className="danger-button"
          onClick={logout}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

