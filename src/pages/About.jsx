import { Link } from 'react-router-dom';
import { FaLeaf, FaUsers, FaLandmark, FaPrayingHands, FaMapMarkerAlt } from 'react-icons/fa';
import PageHero from '../components/PageHero.jsx';
import Section, { Band, Title } from '../components/Section.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { banyan, U } from '../data/images.js';
import '../styles/about.css';
import abouthero from "../assets/deepam.png";
import about from "../assets/about2.png"

const MEAN_ICONS = [FaLeaf, FaUsers, FaLandmark];

export default function About() {
  const { t } = useLang();
  const a = t.about; const x = t.x.about;
  return (
    <>
      <PageHero title={a.title} sub={a.sub} image={abouthero} />

      {/* key facts, overlapping the banner */}
      <Band tone="light" mandala={false} className="ab-facts">
        <div className="facts">
          {a.facts.map(([big, small], n) => (
            <Reveal key={n} i={n} className="fact"><b>{big}</b><span>{small}</span></Reveal>
          ))}
        </div>
      </Band>

      <Section tone="dark" title={a.historyTitle} paras={a.history} image={about} caption={x.photoCap} />

      {/* temple at a glance */}
      <Band tone="cream">
        <Title>{x.glanceTitle}</Title>
        <div className="glance">
          {x.glance.map(([label, value], n) => (
            <Reveal key={n} i={n % 3} className="glance-item"><small>{label}</small><b>{value}</b></Reveal>
          ))}
        </div>
      </Band>

      <Section tone="maroon" title={a.placeTitle} paras={a.place} image={U.river} caption={x.riverCap} flip>
        <Reveal i={5} as="ul" className="chips">
          {x.chips.map((c, n) => <li key={n}><FaMapMarkerAlt aria-hidden="true" /> {c}</li>)}
        </Reveal>
      </Section>

      {/* why people come */}
      <Section tone="light" title={x.whyTitle} paras={x.why}>
        <div className="means">
          {x.means.map(([h, p], n) => {
            const Icon = MEAN_ICONS[n % MEAN_ICONS.length];
            return (
              <Reveal key={n} i={n} className="mean-card">
                <span className="mean-ico"><Icon aria-hidden="true" /></span>
                <h3>{h}</h3>
                <p>{p}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* timeline */}
      <Band tone="cream">
        <Title>{x.timeTitle}</Title>
        <div className="timeline-v">
          {x.timeline.map(([when, what], n) => (
            <Reveal key={n} i={n % 2} className="tv-item"><b>{when}</b><span>{what}</span></Reveal>
          ))}
        </div>
      </Band>

      <Section tone="dark" title={a.mythTitle} paras={a.myth} />
      <Section tone="light" title={a.manageTitle} paras={[a.manage]} />

      {/* call to action */}
      <Band tone="maroon" className="ab-cta">
        <Title>{x.ctaTitle}</Title>
        <Reveal as="p" i={2} className="para cta-text">{x.ctaText}</Reveal>
        <Reveal i={3} className="cta-row">
          <Link to="/pooja" className="btn"><FaPrayingHands aria-hidden="true" /> {x.ctaPooja}</Link>
          <Link to="/contact" className="btn ghost"><FaMapMarkerAlt aria-hidden="true" /> {x.ctaContact}</Link>
        </Reveal>
      </Band>
    </>
  );
}
