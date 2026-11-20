import PageHero from '../components/PageHero.jsx';
import Section, { Band, Title } from '../components/Section.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { banyan, U } from '../data/images.js';
import '../styles/about.css';

export default function About() {
  const { t } = useLang();
  const a = t.about; const x = t.x.about;
  return (
    <>
      <PageHero title={a.title} sub={a.sub} image={[U.river, banyan]} />
      <Band tone="light" mandala={false} className="ab-facts">
        <div className="facts">
          {a.facts.map(([big, small], n) => (
            <Reveal key={n} i={n} className="fact"><b>{big}</b><span>{small}</span></Reveal>
          ))}
        </div>
      </Band>
      <Section tone="dark" title={a.historyTitle} paras={a.history} image={banyan} caption={x.photoCap} />
      <Section tone="cream" title={a.placeTitle} paras={a.place} image={U.river} caption={x.riverCap} flip />
      <Section tone="maroon" title={x.whyTitle} paras={x.why} />
      <Band tone="light">
        <Title>{x.timeTitle}</Title>
        <div className="timeline-v">
          {x.timeline.map(([when, what], n) => (
            <Reveal key={n} i={n % 2} className="tv-item"><b>{when}</b><span>{what}</span></Reveal>
          ))}
        </div>
      </Band>
      <Section tone="dark" title={a.mythTitle} paras={a.myth} />
      <Section tone="cream" title={a.manageTitle} paras={[a.manage]} />
    </>
  );
}
