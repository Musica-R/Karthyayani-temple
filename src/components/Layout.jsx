import { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaRegCalendarAlt, FaBell, FaPrayingHands } from 'react-icons/fa';
import { GiCandleFlame, GiLotus } from 'react-icons/gi';
import { useLang } from '../context/LanguageContext.jsx';
import Footer from './Footer.jsx';
import FloatingActions from './FloatingActions.jsx';
import logo from '../assets/logo.png';
import '../styles/layout.css';

const links = [['/', 'home'], ['/about', 'about'], ['/architecture', 'architecture'], ['/deity', 'deity'],
  ['/pooja', 'pooja'], ['/festivals', 'festivals'], ['/gallery', 'gallery'], ['/contact', 'contact']];

/* top bar text for each language (kept here in the layout page) */
const topbarText = {
  en: {
    timings: 'Temple Timings: 6:00 AM – 12:00 PM & 5:00 PM – 8:30 PM',
    pooja: 'Daily Pooja',
    notes: 'Quick Notes: Special Pooja on Fridays',
  },
  ml: {
    timings: 'ക്ഷേത്ര സമയം: രാവിലെ 6:00 – ഉച്ചയ്ക്ക് 12:00 & വൈകുന്നേരം 5:00 – രാത്രി 8:30',
    pooja: 'ദിവസേനയുള്ള പൂജ',
    notes: 'പ്രധാന അറിയിപ്പ്: വെള്ളിയാഴ്ചകളിൽ പ്രത്യേക പൂജ',
  },
};

function WelcomeModal() {
  const { t } = useLang();
  const [open, setOpen] = useState(() => {
    try { return !sessionStorage.getItem('welcomed'); } catch { return true; }
  });
  const enter = () => {
    setOpen(false);
    try { sessionStorage.setItem('welcomed', '1'); } catch { /* ignore */ }
  };
  if (!open) return null;
  return (
    <div className="welcome" role="dialog" aria-modal="true">
      <div className="welcome-box">
        <div className="flames"><GiCandleFlame /><GiLotus /><GiCandleFlame /></div>
        <p className="om">{t.om}</p>
        <h2>{t.welcome.title}</h2>
        <p className="mantra">{t.mantra}</p>
        <p>{t.welcome.text}</p>
        <button className="btn" onClick={enter}>{t.welcome.enter}</button>
      </div>
    </div>
  );
}

/* top announcement bar: scrolling text, changes with the selected language */
function TopBar() {
  const { t } = useLang();

  // detect Malayalam from the translated nav label (works without knowing the context shape)
  const isMl = /[\u0D00-\u0D7F]/.test(t.nav?.home || '');
  const tb = isMl ? topbarText.ml : topbarText.en;

  const items = [
    { icon: <FaRegCalendarAlt />, text: tb.timings },
    { icon: <FaPrayingHands />, text: tb.pooja },
    { icon: <FaBell />, text: tb.notes },
  ];

  const row = (key) => (
    <div className="marquee-row" key={key} aria-hidden={key === 'b'}>
      {items.map((it, i) => (
        <span className="topbar-item" key={i}>
          {it.icon}
          <span>{it.text}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="topbar">
      <div className="marquee">
        <div className="marquee-track">
          {row('a')}
          {row('b')}
        </div>
      </div>
    </div>
  );
}

export default function Layout() {
  const { t, toggle } = useLang();
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { window.scrollTo(0, 0); setMenu(false); }, [pathname]);

  const switchLang = () => {
    toggle();
    setMenu(false); // close the dropdown after choosing a language
  };

  return (
    <>
      <WelcomeModal />
      <TopBar />
      {/* navbar: always white with orange text */}
      <header className="nav">
        <Link to="/" className="brand">
          <img className="brand-logo" src={logo} alt={t.brand} />
          <span className="brand-text"><strong>{t.brand}</strong><small>{t.brandSub}</small></span>
        </Link>

        <nav className={`nav-links ${menu ? 'open' : ''}`}>
          {links.map(([to, k]) => (
            <NavLink key={k} to={to} end={to === '/'}>{t.nav[k]}</NavLink>
          ))}

          {/* language button inside the mobile menu list (hidden on desktop) */}
          <div className="lang-item">
            <button className="lang" onClick={switchLang} aria-label="Switch language">
              {t.langBtn}
            </button>
          </div>
        </nav>

        <div className="nav-tools">
          {/* language button for desktop (hidden on mobile) */}
          <button className="lang lang-desktop" onClick={toggle} aria-label="Switch language">
            {t.langBtn}
          </button>
          <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menu">
            {menu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      <main><Outlet /></main>
      <Footer />
      <FloatingActions />
    </>
  );
}