import { FaPhoneAlt, FaMusic, FaCheckCircle } from 'react-icons/fa';
import PageHero from '../components/PageHero.jsx';
import Section, { Band, Title } from '../components/Section.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { U } from '../data/images.js';
import { FEST_PHONES } from '../data/common.js';
import '../styles/festivals.css';
import fev from "../assets/festival1.jpg";
import festival from "../assets/festival2.jpg";

export default function Festivals() {
  const { t } = useLang();
  const f = t.fest; const x = t.x.fest;
  return (
    <>
      <PageHero title={f.title} sub={f.sub} image={[U.lampTable]} />
      <Band tone="maroon" className="banner-band">
        <Reveal className="banner-box">
          <h2>{f.bannerName}</h2>
          <p>{f.bannerPlace}</p>
        </Reveal>
      </Band>
      <Section tone="light" title={f.aboutTitle} paras={f.about} image={fev} caption={x.cap1} />
      <Section tone="dark" title={x.sigTitle} paras={x.sig} image={festival} caption={x.cap2} flip />
      <Section tone="light" title={f.cultTitle}>
        <ul className="cult">
          {f.cult.map((c, n) => <Reveal as="li" key={n} i={n}><FaMusic /> {c}</Reveal>)}
        </ul>
      </Section>
      <Section tone="maroon" title={x.tipsTitle}>
        <ul className="how-list">
          {x.tips.map((s, n) => <Reveal as="li" key={n} i={n + 2}><FaCheckCircle /> {s}</Reveal>)}
        </ul>
      </Section>
      <Section tone="cream" title={f.comTitle} paras={[f.comNote]}>
        <div className="committee">
          {t.committee.map((name, n) => (
            <Reveal key={n} i={n % 3} className="member"><b>{n + 1}</b><span>{name}</span></Reveal>
          ))}
        </div>
      </Section>
      <Section tone="dark" title={f.contactTitle}>
        <div className="phones">
          {FEST_PHONES.map((p, n) => (
            <Reveal key={p} i={n}><a className="btn" href={`tel:${p}`}><FaPhoneAlt /> {p}</a></Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}