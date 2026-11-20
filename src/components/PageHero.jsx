import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import Reveal from '../hooks/Reveal.jsx';
import { GiLotus } from 'react-icons/gi';
import { useLang } from '../context/LanguageContext.jsx';

/* Page banner: the photo is clearly visible (no glow / rays / sparkles).
   `image` may be a list; if the first photo cannot load, the next one shows through. */
export default function PageHero({ title, sub, image }) {
  const { t } = useLang();
  const imgs = [].concat(image || []).map((s) => `url(${s})`).join(', ');
  return (
    <header className="page-hero" style={imgs ? { '--bg': imgs } : undefined}>
      <div className="page-hero-in">
        <Reveal>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">{t.nav.home}</Link><FaChevronRight aria-hidden="true" /><span>{title}</span>
          </nav>
        </Reveal>
        <Reveal i={1}><GiLotus className="ph-lotus" /></Reveal>
        <Reveal as="h1" i={2}>{title}</Reveal>
        <Reveal as="p" i={3}>{sub}</Reveal>
        <Reveal i={4}><div className="divider"><span /></div></Reveal>
      </div>
    </header>
  );
}
