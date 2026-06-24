function StatCard({ title, value, tone = "blue", meta = "Across all ingested logs" }) {
  const colors = {
    blue: "#38bdf8",
    green: "#34d399",
    red: "#fb7185",
    amber: "#fbbf24",
  };

  return (
    <article className="stat-card" style={{ "--card-accent": colors[tone] }}>
      <p className="stat-label">{title}</p>
      <p className="stat-value">{value}</p>
      <div className="stat-meta"><span className="stat-dot" />{meta}</div>
    </article>
  );
}

export default StatCard;
