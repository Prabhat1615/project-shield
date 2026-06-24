function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3 5.5 5.7v5.1c0 4.6 2.7 8.2 6.5 10.2 3.8-2 6.5-5.6 6.5-10.2V5.7L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="m9.2 11.8 1.8 1.8 3.9-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Brand({ compact = false }) {
  return (
    <div className="brand">
      <div className="brand-mark"><ShieldIcon /></div>
      <div>
        <p className="brand-name">Project Shield</p>
        {!compact && <p className="brand-subtitle">Security Operations Platform</p>}
      </div>
    </div>
  );
}

export { ShieldIcon };
export default Brand;
