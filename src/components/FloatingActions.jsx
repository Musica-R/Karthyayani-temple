import { useEffect, useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaArrowUp } from 'react-icons/fa';
import { useLang } from '../context/LanguageContext.jsx';
import { PHONE, WHATSAPP } from '../data/common.js';
import '../styles/floating.css';

/* WhatsApp + Call icons floating above the back-to-top arrow */
export default function FloatingActions() {
  const { t } = useLang();
  const f = t.x.float;
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fa-wrap">
      <a className="fa-btn fa-wa" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label={f.whatsapp} title={f.whatsapp}>
        <FaWhatsapp />
      </a>
      <a className="fa-btn fa-call" href={`tel:${PHONE}`} aria-label={f.call} title={f.call}>
        <FaPhoneAlt />
      </a>
      <div className={`fa-topwrap ${showTop ? 'show' : ''}`}>
        <button className="fa-btn fa-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={f.top} title={f.top} tabIndex={showTop ? 0 : -1}>
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
}
