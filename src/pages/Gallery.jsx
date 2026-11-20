import { useEffect, useMemo, useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus, FaCamera } from 'react-icons/fa';
import PageHero from '../components/PageHero.jsx';
import { Band } from '../components/Section.jsx';
import Img from '../components/Img.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { hero, gallery as photos, galleryCats, U } from '../data/images.js';
import '../styles/gallery.css';

const cats = ['all', 'temple', 'lamps', 'festival', 'nature'];
const ratios = ['r45', 'r11', 'r43', 'r34', 'r11', 'r43']; // varied heights give a masonry look

export default function Gallery() {
  const { t } = useLang();
  const g = t.gallery; const gx = t.x.gx; const caps = t.x.gallery.caps;
  const [cat, setCat] = useState('all');
  const [idx, setIdx] = useState(null);

  const list = useMemo(
    () => photos.map((src, i) => ({ src, i })).filter((p) => cat === 'all' || galleryCats[p.i] === cat),
    [cat],
  );
  const go = (d) => setIdx((i) => (i + d + list.length) % list.length);
  const pick = (c) => { setCat(c); setIdx(null); };

  useEffect(() => {
    if (idx === null) return undefined;
    const key = (e) => {
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [idx, list.length]);

  const cur = idx !== null ? list[idx] : null;

  return (
    <>
      <PageHero title={g.title} sub={g.sub} image={[U.lampStand, hero]} />
      <Band tone="light" className="gx">
        <Reveal as="p" className="para center">{g.tap}</Reveal>

        <Reveal i={1} className="gx-bar">
          <div className="gx-filters" role="tablist">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => pick(c)}>{gx.cats[c]}</button>
            ))}
          </div>
          <span className="gx-count"><FaCamera /> {list.length} {gx.count}</span>
        </Reveal>

        <div className="gx-grid">
          {list.map(({ src, i }, n) => (
            <Reveal key={`${cat}-${i}`} i={n % 3} className={`gx-item ${ratios[n % ratios.length]}`}>
              <button onClick={() => setIdx(n)} aria-label={`${gx.view}: ${caps[i]}`}>
                <Img src={src} alt={caps[i]} />
                <span className="gx-zoom"><FaSearchPlus /></span>
                <span className="gx-tag">{String(n + 1).padStart(2, '0')}</span>
                <span className="gx-cap">{caps[i]}</span>
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="credit">{t.x.credit}</Reveal>
      </Band>

      {cur && (
        <div className="lightbox" onClick={() => setIdx(null)} role="dialog" aria-modal="true">
          <button className="lb-x" onClick={() => setIdx(null)} aria-label={t.common.close}><FaTimes /></button>
          <button className="lb-nav l" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t.x.explore.prev}><FaChevronLeft /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            <Img src={cur.src} alt={caps[cur.i]} />
            <figcaption><b>{idx + 1} / {list.length}</b> · {caps[cur.i]}</figcaption>
          </figure>
          <button className="lb-nav r" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t.x.explore.next}><FaChevronRight /></button>
        </div>
      )}
    </>
  );
}
