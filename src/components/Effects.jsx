/* Soft, static devotional ornament used faintly behind coloured bands.
   A padma (lotus) mandala in the style of temple carvings: a scalloped border,
   four rings of ogee-tipped lotus petals (24, 16, 12 and 8), beaded rings and a bindu.
   It uses currentColor, so the colour and the faintness are set in global.css (.mandala). */
const rot = (deg) => `rotate(${deg} 100 100)`;
const range = (n) => Array.from({ length: n }, (_, i) => i);
const f = (n) => +n.toFixed(2);

/* One lotus petal pointing up from radius `rb` to radius `rt` (centre 100,100), with a curved, pointed tip */
function petal(rb, rt, w) {
  const B = 100 - rb; const L = rt - rb;
  const y = (k) => f(B - L * k);
  const x = (k) => f(100 + w * k);
  return [
    `M100 ${f(B)}`,
    `C${x(1)} ${y(.1)} ${x(1)} ${y(.55)} ${x(.45)} ${y(.78)}`,
    `C${x(.2)} ${y(.88)} ${x(.05)} ${y(.94)} 100 ${y(1)}`,
    `C${x(-.05)} ${y(.94)} ${x(-.2)} ${y(.88)} ${x(-.45)} ${y(.78)}`,
    `C${x(-1)} ${y(.55)} ${x(-1)} ${y(.1)} 100 ${f(B)} Z`,
  ].join(' ');
}

const P1 = petal(68, 87, 6.6);   // outer ring, 24 petals
const P2 = petal(44, 62, 8.2);   // second ring, 16 petals
const P2i = petal(46, 57, 4.2);  // small petal inside each second-ring petal
const P3 = petal(24, 38, 7.2);   // third ring, 12 petals
const P4 = petal(8, 20, 4.6);    // heart, 8 petals

export function Mandala({ className = '' }) {
  return (
    <svg className={`mandala ${className}`} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth=".6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      {/* scalloped border with a bead in every scallop */}
      {range(36).map((i) => (
        <g key={i} transform={rot(i * 10)}>
          <path d="M92.07 9.34 A8 8 0 0 1 107.93 9.34" />
          <circle cx="100" cy="7.6" r=".8" fill="currentColor" stroke="none" />
        </g>
      ))}
      <circle cx="100" cy="100" r="90.7" />

      {/* ring 1: 24 petals, a bead between the tips */}
      {range(24).map((i) => (
        <g key={i} transform={rot(i * 15)}>
          <path d={P1} />
          <path d="M100 28.5 L100 19" strokeWidth=".35" />
        </g>
      ))}
      {range(24).map((i) => (
        <circle key={i} cx="100" cy="15.5" r="1" fill="currentColor" stroke="none" transform={rot(i * 15 + 7.5)} />
      ))}

      {/* beaded ring */}
      <circle cx="100" cy="100" r="66" />
      <circle cx="100" cy="100" r="63.4" strokeWidth=".3" />
      {range(48).map((i) => (
        <circle key={i} cx="100" cy="35.2" r=".65" fill="currentColor" stroke="none" transform={rot(i * 7.5)} />
      ))}

      {/* ring 2: 16 double-line petals */}
      {range(16).map((i) => (
        <g key={i} transform={rot(i * 22.5)}>
          <path d={P2} />
          <path d={P2i} strokeWidth=".45" />
        </g>
      ))}
      {range(16).map((i) => (
        <circle key={i} cx="100" cy="39.5" r=".9" fill="currentColor" stroke="none" transform={rot(i * 22.5 + 11.25)} />
      ))}

      {/* beaded ring */}
      <circle cx="100" cy="100" r="42.5" />
      <circle cx="100" cy="100" r="40.2" strokeWidth=".3" />

      {/* ring 3: 12 petals with a vein */}
      {range(12).map((i) => (
        <g key={i} transform={rot(i * 30 + 15)}>
          <path d={P3} />
          <path d="M100 72 L100 66" strokeWidth=".35" />
        </g>
      ))}
      <circle cx="100" cy="100" r="22.5" />

      {/* heart: 8 petals, a ring and the bindu */}
      {range(8).map((i) => (
        <path key={i} d={P4} transform={rot(i * 45)} />
      ))}
      <circle cx="100" cy="100" r="7" />
      <circle cx="100" cy="100" r="2.8" fill="currentColor" stroke="none" />
    </svg>
  );
}