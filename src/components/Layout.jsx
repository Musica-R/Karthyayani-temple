import { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GiCandleFlame, GiLotus } from 'react-icons/gi';
import { useLang } from '../context/LanguageContext.jsx';
import Footer from './Footer.jsx';
import FloatingActions from './FloatingActions.jsx';
import '../styles/layout.css';

const links = [['/', 'home'], ['/about', 'about'], ['/architecture', 'architecture'], ['/deity', 'deity'],
  ['/pooja', 'pooja'], ['/festivals', 'festivals'], ['/gallery', 'gallery'], ['/contact', 'contact']];

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

export default function Layout() {
  const { t, toggle } = useLang();
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { window.scrollTo(0, 0); setMenu(false); }, [pathname]);

  return (
    <>
      <WelcomeModal />
      {/* navbar: always white with orange text */}
      <header className="nav">
        <Link to="/" className="brand">
          <GiLotus className="brand-icon" />
          <span><strong>{t.brand}</strong><small>{t.brandSub}</small></span>
        </Link>
        <nav className={`nav-links ${menu ? 'open' : ''}`}>
          {links.map(([to, k]) => (
            <NavLink key={k} to={to} end={to === '/'}>{t.nav[k]}</NavLink>
          ))}
        </nav>
        <div className="nav-tools">
          <button className="lang" onClick={toggle} aria-label="Switch language">{t.langBtn}</button>
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
