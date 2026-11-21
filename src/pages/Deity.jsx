import { Link } from 'react-router-dom';
import { FaGem, FaStar, FaHeart, FaPrayingHands, FaMapMarkerAlt } from 'react-icons/fa';
import { GiLotus } from 'react-icons/gi';
import PageHero from '../components/PageHero.jsx';
import Section, { Band, Title } from '../components/Section.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { banyan, U } from '../data/images.js';
import '../styles/deity.css';
import arcbg from "../assets/deepam.png";
import god1 from "../assets/god1.jpg";
import pray from "../assets/contact1.jpg";
import book from "../assets/detity1.webp";



const PILLAR_ICONS = [FaGem, GiLotus, FaStar, FaHeart];

export default function Deity() {
  const { t } = useLang();
  const d = t.deity; const x = t.x.deity;
  return (
    <>
      <PageHero title={d.title} sub={d.sub} image={arcbg} />

      {/* opening prayer */}
      <Band tone="maroon" className="prayer-band">
        <Reveal><p className="om">{t.om}</p></Reveal>
        <Reveal i={1}><p className="mantra-big">{t.mantra}</p></Reveal>
        <Reveal i={2}><p className="prayer-sub">{d.prayer}</p></Reveal>
      </Band>

      {/* the idol at a glance, overlapping the band above */}
      <Band tone="light" mandala={false} className="dt-facts">
        <div className="dt-fact-grid">
          {x.facts.map(([big, small], n) => (
            <Reveal key={n} i={n} className="dt-fact"><b>{big}</b><span>{small}</span></Reveal>
          ))}
        </div>
      </Band>

      <Section tone="dark" title={d.prathishtaTitle} paras={d.prathishta} image={book}  />

      {/* know the goddess: four short cards */}
      <Band tone="cream">
        <Title>{x.pillarsTitle}</Title>
        <div className="pillars">
          {x.pillars.map(([h, p], n) => {
            const Icon = PILLAR_ICONS[n % PILLAR_ICONS.length];
            return (
              <Reveal key={n} i={n} className="pillar">
                <span className="pillar-ico"><Icon aria-hidden="true" /></span>
                <h3>{h}</h3>
                <p>{p}</p>
              </Reveal>
            );
          })}
        </div>
      </Band>

      <Section tone="maroon" title={x.deviTitle} paras={x.devi} image={god1}  flip />

      {/* tradition and priesthood */}
      <Section tone="light" title={d.antiqTitle} paras={d.antiq}>
        <h3 className="mini-title centered">{x.priestTitle}</h3>
        <div className="priest-grid">
          {x.priest.map(([h, p], n) => (
            <Reveal key={n} i={n} className="priest-card"><b>{h}</b><span>{p}</span></Reveal>
          ))}
        </div>
      </Section>

      {/* the prayer and its meaning */}
      <Band tone="dark" className="meaning-band">
        <Title>{x.meaningTitle}</Title>
        <Reveal i={2} className="mantra-card">
          <GiLotus className="mc-lotus" aria-hidden="true" />
          <p className="mc-sanskrit">{t.x.home.quote}</p>
          <p className="mc-mean">{t.x.home.quoteMean}</p>
        </Reveal>
      </Band>

      {/* how to pray: numbered steps */}
      <Section tone="maroon" title={x.howTitle} image={pray}>
        <ol className="how-list">
          {x.how.map((s, n) => <Reveal as="li" key={n} i={n + 2}><span className="how-no">{n + 1}</span><span>{s}</span></Reveal>)}
        </ol>
      </Section>

      {/* call to action */}
      <Band tone="cream" className="dt-cta">
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
