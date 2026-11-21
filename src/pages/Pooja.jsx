import { FaClock, FaSpa, FaCookieBite, FaRing, FaCheckCircle } from 'react-icons/fa';
import { GiCandleFlame, GiLotus } from 'react-icons/gi';
import PageHero from '../components/PageHero.jsx';
import Section, { Band, Title } from '../components/Section.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { U } from '../data/images.js';
import '../styles/pooja.css';
import offering1 from "../assets/offering1.jpg";
import offering2 from "../assets/offering3.png";
import offering3 from "../assets/offering2.jpg";
import offering4 from "../assets/offering4.jpg";
import pray1 from "../assets/pray1.jpg";

const icons = [GiLotus, GiCandleFlame, FaCookieBite, FaRing];
const imgs = [offering1, offering2, offering3, offering4];

export default function Pooja() {
  const { t } = useLang();
  const p = t.pooja; const x = t.x.pooja;
  return (
    <>
      <PageHero title={p.title} sub={p.sub} image={[U.lampCircle]} />
      <Section tone="light" title={p.timeTitle} paras={[p.time]}>
        <div className="time-row">
          <Reveal className="time-box"><FaClock /><span>{p.open}</span><b>{p.openTime}</b></Reveal>
          <Reveal i={1} className="time-box"><FaSpa /><span>{p.close}</span><b>{p.closeTime}</b></Reveal>
        </div>
        <div className="day-line">
          {x.day.map(([time, what], n) => <Reveal key={n} i={n} className="dl"><b>{time}</b><span>{what}</span></Reveal>)}
        </div>
      </Section>
      <Band tone="dark">
        <Title>{p.offerTitle}</Title>
        <Reveal as="p" i={2} className="para center">{p.offerSub}</Reveal>
        <div className="offer-grid">
          {p.offers.map(([name, desc], n) => {
            const Icon = icons[n];
            return (
              <Reveal key={n} i={n} className="offer">
                <div className="offer-img" style={{ backgroundImage: `url(${imgs[n]})` }} />
                <Icon /><h3>{name}</h3><p>{desc}</p>
              </Reveal>
            );
          })}
        </div>
      </Band>
      <Section tone="cream" title={x.guideTitle} image={pray1}  flip>
        <ul className="how-list">
          {x.guide.map((s, n) => <Reveal as="li" key={n} i={n + 2}><FaCheckCircle /> {s}</Reveal>)}
        </ul>
      </Section>
    </>
  );
}
