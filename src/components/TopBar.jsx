import { useLang } from '../context/LanguageContext.jsx';
import { FaClock } from 'react-icons/fa';
import { GiCandleFlame } from 'react-icons/gi';
import '../styles/topbar.css';

const text = {
  en: [
    'Daily Darshan: 6:30 AM – 8:30 AM',
    'One pooja every day, in the morning',
  ],
  ml: [
    'ദിവസേനയുള്ള ദർശനം: രാവിലെ 6.30 മുതൽ 8.30 വരെ',
    'ദിവസവും രാവിലെ ഒരു നേരം പൂജ',
  ],
};
const icons = [FaClock, GiCandleFlame];

/* sliding (marquee) timing bar: text keeps moving right to left, pauses on hover */
const css = `
.tb.tb-marquee { display: block; padding: 0; overflow: hidden; }
.tb-marquee .tbm-view { height: 100%; overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
.tb-marquee .tbm-track { display: flex; width: max-content; height: 100%; align-items: center; animation: tbmSlide 32s linear infinite; }
.tb-marquee:hover .tbm-track { animation-play-state: paused; }
.tb-marquee .tbm-group { display: flex; align-items: center; flex: none; }
.tb-marquee .tbm-item { display: inline-flex; align-items: center; gap: .55rem; margin: 0 2.2rem; font-size: .98rem; font-weight: 600; white-space: nowrap; }
.tb-marquee .tbm-item svg { color: var(--gold); flex: none; }
.tb-marquee .tbm-dot { color: var(--gold); font-size: .7rem; flex: none; }
@keyframes tbmSlide { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (max-width: 480px) { .tb-marquee .tbm-item { font-size: .85rem; margin: 0 1.4rem; } .tb-marquee .tbm-track { animation-duration: 26s; } }
`;

/* Pooja-time bar shown above the navbar */
export default function TopBar() {
  const { lang } = useLang();
  const items = text[lang];
  // one group = the items repeated enough times to be wider than a big screen
  const group = (hidden) => (
    <div className="tbm-group" aria-hidden={hidden}>
      {[0, 1, 2].flatMap((r) => items.map((s, n) => {
        const Icon = icons[n % icons.length];
        return (
          <span key={`${r}-${n}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span className="tbm-item"><Icon /> <span>{s}</span></span>
            <span className="tbm-dot">◆</span>
          </span>
        );
      }))}
    </div>
  );
  return (
    <div className="tb tb-marquee" role="region" aria-label="Pooja timings">
      <style>{css}</style>
      <div className="tbm-view">
        <div className="tbm-track">{group(false)}{group(true)}</div>
      </div>
    </div>
  );
}