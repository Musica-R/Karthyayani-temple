import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import * as LottieWeb from 'lottie-web';
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, FaHandHoldingHeart, FaOm, FaPhoneAlt, FaRoute, FaArrowRight } from 'react-icons/fa';
import { GiLotus, GiCandleFlame } from 'react-icons/gi';
import Reveal from '../hooks/Reveal.jsx';
import Section, { Band, Title } from '../components/Section.jsx';
import Explore from '../components/Explore.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { hero, U } from '../data/images.js';
import god from "../assets/original-god.webp";
import temple from "../assets/god3.jpg";
import offering1 from "../assets/offering1.jpg";
import offering2 from "../assets/offering3.png";
import offering3 from "../assets/offering2.jpg";
import offering4 from "../assets/offering4.jpg";
import deepam from "../assets/deepam.webp";
import deviAnim from "../assets/devi-lottie.json";
import { PHONE, MAP_LINK } from '../data/common.js';
import '../styles/home.css';

/* Devi lottie player (lottie-web). Handles both default / namespace exports of the bundler. */
const lottie = LottieWeb.default?.loadAnimation ? LottieWeb.default : LottieWeb.loadAnimation ? LottieWeb : LottieWeb.default?.default;
function DeviLottie() {
  const box = useRef(null);
  useEffect(() => {
    if (!box.current || !lottie) { console.warn('lottie-web not loaded'); return undefined; }
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const anim = lottie.loadAnimation({
      container: box.current, renderer: 'svg', loop: false, autoplay: false, animationData: deviAnim,
      rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
    });
    // sketch reveal plays only when this section scrolls into view (replays each time it comes back)
    let io;
    if (reduce || !('IntersectionObserver' in window)) {
      anim.addEventListener('DOMLoaded', () => anim.goToAndStop(anim.totalFrames - 1, true));
    } else {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) anim.goToAndPlay(0, true);
        else anim.goToAndStop(0, true);
      }, { threshold: 0.4 });
      io.observe(box.current);
    }
    return () => { if (io) io.disconnect(); anim.destroy(); };
  }, []);
  return <div ref={box} style={{ width: '100%', height: '100%' }} />;
}

const offerIcons = [GiLotus, GiCandleFlame, FaHandHoldingHeart, FaOm];
// your own offering photos (src/assets/offering1.jpg ... offering4.jpg)
const offerImgs = [offering1, offering2, offering3, offering4];

/* welcome image drops in from the top of its card; prayer section gets the Devi lottie on the left */
const homeCss = `
.hm-welcome .arch { overflow: hidden; }
.hm-welcome .arch img { transform: translateY(-110%); opacity: .15;
  transition: transform 1.7s cubic-bezier(.22, .61, .36, 1) .35s, opacity 1.2s ease .35s; }
.hm-welcome .arch.in img { transform: none; opacity: 1; }
.hm-prayer-grid { display: grid; grid-template-columns: .85fr 1.15fr; gap: 3rem; align-items: center; }
.hm-devi { width: 100%; max-width: 380px; aspect-ratio: 2 / 3; margin: 0 auto; }
.hm-devi > div, .hm-devi svg { width: 100% !important; height: 100% !important; display: block; }
.hm-prayer-text { text-align: center; }
@media (max-width: 860px) { .hm-prayer-grid { grid-template-columns: 1fr; gap: 1rem; } .hm-devi { max-width: 280px; } }
@media (prefers-reduced-motion: reduce) { .hm-welcome .arch img { transform: none; opacity: 1; transition: none; } }
`;

export default function Home() {
  const { t } = useLang();
  const h = t.home; const x = t.x.home; const hx = t.x.hx;

  return (
    <div className="home">
      <style>{homeCss}</style>
      {/* HERO: the temple photo, no glow */}
      <section className="hero" style={{ '--bg': `url(${hero})` }}>
        <div className="hero-in">
          <Reveal><p className="hero-mantra"><GiLotus /> {t.mantra}</p></Reveal>
          <Reveal as="h1" i={1}>{h.title}</Reveal>
          <Reveal as="p" i={2} className="hero-place"><FaMapMarkerAlt /> {h.place}</Reveal>
          <Reveal as="p" i={3} className="hero-tag">{h.tag}</Reveal>
          <Reveal i={4} className="hero-cta">
            <Link to="/festivals" className="btn">{h.cta1} <FaArrowRight /></Link>
            <Link to="/contact" className="btn ghost">{h.cta2}</Link>
          </Reveal>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="strip container">
        <Reveal className="strip-box"><FaClock />
          <div><h3>{h.timingTitle}</h3><p className="big">{h.timing}</p><small>{h.timingNote}</small></div></Reveal>
        <Reveal i={1} className="strip-box"><FaCalendarAlt />
          <div><h3>{h.countdown.label}</h3><p className="big">{h.countdown.note}</p></div></Reveal>
        <Reveal i={2} className="strip-box"><FaMapMarkerAlt />
          <div><h3>{x.locLabel}</h3><p className="big">{x.loc}</p><small>{t.contact.rows[0][1]}</small></div></Reveal>
      </section>

      {/* LIGHT: welcome + key facts */}
      <Section tone="light" className="hm-welcome" title={h.welcomeTitle} paras={[h.welcomeText]} image={god} >
        <div className="points">
          {x.points.map(([big, small], n) => (
            <Reveal key={n} i={n + 3} className="point"><b>{big}</b><span>{small}</span></Reveal>
          ))}
        </div>
      </Section>

      {/* DARK: explore, content left + image carousel right */}
      <Explore />

      {/* CREAM: why devotees come */}
      <Section tone="cream" title={x.whyTitle} paras={[x.why]} image={temple} flip>
        <Reveal i={3}><Link to="/about" className="btn">{hx.whyBtn} <FaArrowRight /></Link></Reveal>
      </Section>

      {/* LIGHT: offerings with photos */}
      <Band tone="light">
        <Title>{x.offerTitle}</Title>
        <Reveal as="p" i={2} className="para center">{x.offerText}</Reveal>
        <div className="hm-offers">
          {t.pooja.offers.map(([name, desc], n) => {
            const Icon = offerIcons[n];
            return (
              <Reveal key={n} i={n} className="hm-offer">
                <div className="hm-offer-img" style={{ backgroundImage: `url(${offerImgs[n]}), url(${hero})` }} />
                <span className="hm-offer-ico"><Icon /></span>
                <h3>{name}</h3><p>{desc}</p>
              </Reveal>
            );
          })}
        </div>
        <Reveal i={5} className="cta-center"><Link to="/pooja" className="btn">{x.offerBtn} <FaArrowRight /></Link></Reveal>
      </Band>

      {/* MAROON: festival feature */}
      <Section tone="maroon" title={x.festTitle} paras={[x.festText]} image={deepam} >
        <Reveal i={3}><Link to="/festivals" className="btn">{x.festBtn} <FaArrowRight /></Link></Reveal>
      </Section>

      {/* CREAM: divine quote */}
      <Band tone="cream" className="quote-band">
        <div className="hm-prayer-grid">
          <div className="hm-devi" aria-hidden="true">
            <DeviLottie />
          </div>
          <div className="hm-prayer-text">
            <Reveal><GiLotus className="q-lotus" /></Reveal>
            <Reveal as="h2" i={1} className="sec-title">{x.quoteTitle}</Reveal>
            <Reveal as="p" i={2} className="shloka">{x.quote}</Reveal>
            <Reveal as="p" i={3} className="para center">{x.quoteMean}</Reveal>
          </div>
        </div>
      </Band>

      {/* DARK: visit + contact form */}
      <Band tone="dark" className="hm-visit">
        <Title>{x.visitTitle}</Title>
        <div className="hm-visit-grid">
          <Reveal className="hm-visit-info">
            <p className="para">{x.visitText}</p>
            <ul className="hm-info">
              <li><FaClock /><div><b>{h.timingTitle}</b><span>{h.timing}</span></div></li>
              <li><FaMapMarkerAlt /><div><b>{hx.addrLabel}</b><span>{t.footer.line}</span></div></li>
              <li><FaPhoneAlt /><div><b>{t.contact.rows[3][0]}</b><a href={`tel:${PHONE}`}>{PHONE}</a></div></li>
            </ul>
            <div className="hero-cta left">
              <a className="btn" href={`tel:${PHONE}`}><FaPhoneAlt /> {t.contact.call}</a>
              <a className="btn ghost" href={MAP_LINK} target="_blank" rel="noreferrer"><FaRoute /> {t.contact.directions}</a>
            </div>
          </Reveal>
          <Reveal i={2}><ContactForm /></Reveal>
        </div>
      </Band>
    </div>
  );
}