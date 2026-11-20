import PageHero from '../components/PageHero.jsx';
import Section, { Band } from '../components/Section.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { banyan, U } from '../data/images.js';
import { FaCheckCircle } from 'react-icons/fa';
import '../styles/deity.css';

export default function Deity() {
  const { t } = useLang();
  const d = t.deity; const x = t.x.deity;
  return (
    <>
      <PageHero title={d.title} sub={d.sub} image={[U.lampDark, banyan]} />
      <Band tone="maroon" className="prayer-band">
        <Reveal><p className="om">{t.om}</p></Reveal>
        <Reveal i={1}><p className="mantra-big">{t.mantra}</p></Reveal>
        <Reveal i={2}><p className="prayer-sub">{d.prayer}</p></Reveal>
      </Band>
      <Section tone="light" title={d.prathishtaTitle} paras={d.prathishta} image={banyan} caption={t.x.about.photoCap} />
      <Section tone="dark" title={x.deviTitle} paras={x.devi} image={U.statue} caption={x.cap2} flip />
      <Section tone="cream" title={d.antiqTitle} paras={d.antiq} />
      <Section tone="maroon" title={x.howTitle} image={U.lampDark} caption={x.cap1}>
        <ul className="how-list">
          {x.how.map((s, n) => <Reveal as="li" key={n} i={n + 2}><FaCheckCircle /> {s}</Reveal>)}
        </ul>
      </Section>
    </>
  );
}
