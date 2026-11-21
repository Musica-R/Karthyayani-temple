import PageHero from '../components/PageHero.jsx';
import { Band } from '../components/Section.jsx';
import Img from '../components/Img.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { gallery as photos } from '../data/images.js';
import heroImg from '../assets/about3.png';
import '../styles/gallery.css';

const ratios = ['r45', 'r11', 'r43', 'r34', 'r11', 'r43']; // varied heights give a masonry look

export default function Gallery() {
  const { t } = useLang();
  const g = t.gallery; const caps = t.x.gallery.caps;

  return (
    <>
      <PageHero title={g.title} sub={g.sub} image={[heroImg]} />
      <Band tone="light" className="gx">
        <div className="gx-grid">
          {photos.map((src, i) => (
            <Reveal key={i} i={i % 3} className={`gx-item ${ratios[i % ratios.length]}`}>
              <Img src={src} alt={caps[i]} />
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="credit">{t.x.credit}</Reveal>
      </Band>
    </>
  );
}