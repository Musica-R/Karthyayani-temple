import { FaDoorOpen, FaUtensils, FaMonument, FaCircle, FaGem } from 'react-icons/fa';
import { GiCandleFlame } from 'react-icons/gi';
import PageHero from '../components/PageHero.jsx';
import Section, { Band, Title } from '../components/Section.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { hero, U } from '../data/images.js';
import '../styles/architecture.css';

const icons = [FaDoorOpen, FaUtensils, GiCandleFlame, FaCircle];

export default function Architecture() {
  const { t } = useLang();
  const a = t.arch; const x = t.x.arch;
  return (
    <>
      <PageHero title={a.title} sub={a.sub} image={[U.gopuram, hero]} />
      <Section tone="light" title={a.listTitle} paras={[a.intro]} image={hero} caption={x.cap1}>
        <div className="arch-grid">
          {a.items.map(([name, desc], n) => {
            const Icon = icons[n] || FaMonument;
            return <Reveal key={n} i={n + 3} className="arch-item"><Icon /><div><h3>{name}</h3><p>{desc}</p></div></Reveal>;
          })}
        </div>
        <Reveal as="p" i={8} className="para">{a.other}</Reveal>
      </Section>
      <Section tone="dark" title={x.sacredTitle} paras={x.sacred} image={U.gopuram} caption={x.cap2} flip>
        <ul className="tip-list">
          {x.tips.map((tip, n) => <Reveal as="li" key={n} i={n + 3}><FaGem /> {tip}</Reveal>)}
        </ul>
      </Section>
      <Band tone="cream">
        <Title>{a.detailTitle}</Title>
        <ul className="detail-list">
          {a.details.map((d, n) => <Reveal as="li" key={n} i={n + 2}>{d}</Reveal>)}
        </ul>
        <Reveal as="p" i={6} className="source">{a.source}</Reveal>
      </Band>
    </>
  );
}
