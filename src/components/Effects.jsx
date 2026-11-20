/* Soft, static mandala ornament used faintly behind coloured bands.
   (Rising sparkles, light rays and glows have been removed from the site.) */
export function Mandala({ className = '' }) {
  return (
    <svg className={`mandala ${className}`} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth=".7" aria-hidden="true">
      {[95, 82, 62, 42, 22].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
      {Array.from({ length: 16 }, (_, i) => (
        <ellipse key={i} cx="100" cy="38" rx="8" ry="22" transform={`rotate(${i * 22.5} 100 100)`} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d="M100 60 L108 100 L100 140 L92 100 Z" transform={`rotate(${i * 45} 100 100)`} />
      ))}
    </svg>
  );
}
