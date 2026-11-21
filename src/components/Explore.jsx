import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaOm, FaMonument, FaHandHoldingHeart, FaCalendarAlt, FaImages, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { GiLotus } from 'react-icons/gi';
import Reveal from '../hooks/Reveal.jsx';
import Img from './Img.jsx';
import { Band, Title } from './Section.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { hero, banyan, U } from '../data/images.js';
import '../styles/explore.css';
import god from "../assets/god1.jpg"
import festival from '../assets/festival.jpg';
import pooja from "../assets/pooja.jpg";
import temple from "../assets/temple.webp";
import contact from "../assets/contact.jpg";
import book from "../assets/detity1.webp"

const items = [
  ['/deity', 'deity', GiLotus, god],
  ['/architecture', 'architecture', FaMonument, hero],
  ['/about', 'about', FaOm, book],
  ['/pooja', 'pooja', FaHandHoldingHeart, pooja],
  ['/festivals', 'festivals', FaCalendarAlt, festival],
  ['/gallery', 'gallery', FaImages, temple],
  ['/contact', 'contact', FaMapMarkerAlt, contact],
];
const DELAY = 5500;
const pad = (n) => String(n).padStart(2, '0');

/* "Explore the Temple": content on the left, a rotating photo carousel on the right */
export default function Explore() {
  const { t } = useLang();
  const e = t.x.explore;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (d) => setActive((i) => (i + d + items.length) % items.length);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce) return undefined;
    const id = setTimeout(() => go(1), DELAY);
    return () => clearTimeout(id);
  }, [active, paused]);

  const [, curKey, ,] = items[active];

  return (
    <Band tone="dark" className="xp">
      <div className="xp-head">
        <Title>{t.home.explore}</Title>
        <Reveal as="p" i={2} className="para xp-sub">{e.sub}</Reveal>
      </div>

      <div className="xp-grid" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        {/* LEFT: content */}
        <Reveal className="xp-left">
          <ul className="xp-tabs" role="tablist" aria-orientation="vertical">
            {items.map(([to, k, Icon], n) => (
              <li key={k} className={n === active ? 'on' : ''}>
                <button role="tab" aria-selected={n === active} onClick={() => setActive(n)}>
                  <span className="xp-num">{pad(n + 1)}</span>
                  <Icon className="xp-ico" />
                  <span className="xp-name">{t.nav[k]}</span>
                </button>
                {n === active && (
                  <div className="xp-body">
                    <p>{e.desc[k]}</p>
                    <Link to={to} className="xp-more">{e.more} <FaArrowRight /></Link>
                    <span className="xp-bar"><i key={`${active}-${paused}`} style={{ animationPlayState: paused ? 'paused' : 'running' }} /></span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* RIGHT: image carousel */}
        <Reveal i={2} className="xp-right">
          <div className="xp-frame">
            <div className="xp-stage">
              {items.map(([to, k, , img], n) => (
                <figure key={k} className={`xp-slide ${n === active ? 'on' : ''}`} aria-hidden={n !== active}>
                  <Img src={img} alt={t.nav[k]} />
                </figure>
              ))}
              <div className="xp-shade" />
              <div className="xp-cap">
                <b>{pad(active + 1)}<small> / {pad(items.length)}</small></b>
                <span>{t.nav[curKey]}</span>
              </div>
              <button className="xp-arrow l" onClick={() => go(-1)} aria-label={e.prev}><FaChevronLeft /></button>
              <button className="xp-arrow r" onClick={() => go(1)} aria-label={e.next}><FaChevronRight /></button>
            </div>
            <div className="xp-dots">
              {items.map(([, k], n) => (
                <button key={k} className={n === active ? 'on' : ''} onClick={() => setActive(n)} aria-label={t.nav[k]} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
