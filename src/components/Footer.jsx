import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp, FaClock, FaCalendarAlt, FaChevronRight, FaRoute, FaArrowUp } from 'react-icons/fa';
import { GiLotus, GiCandleFlame } from 'react-icons/gi';
import { useLang } from '../context/LanguageContext.jsx';
import { PHONE, WHATSAPP, FEST_PHONES, MAP_LINK } from '../data/common.js';
import '../styles/footer.css';

const links = [['/', 'home'], ['/about', 'about'], ['/architecture', 'architecture'], ['/deity', 'deity'],
  ['/pooja', 'pooja'], ['/festivals', 'festivals'], ['/gallery', 'gallery'], ['/contact', 'contact']];

export default function Footer() {
  const { t } = useLang();
  const f = t.x.footer;
  return (
    <footer className="ft">
      <div className="ft-frieze" aria-hidden="true" />

      <div className="ft-wrap">
        {/* call-to-action card */}
        <div className="ft-cta">
          <GiCandleFlame className="ft-cta-icon" />
          <div className="ft-cta-text">
            <h3>{f.ctaTitle}</h3>
            <p>{f.ctaText}</p>
          </div>
          <div className="ft-cta-btns">
            <a className="ft-pill" href={`tel:${PHONE}`}><FaPhoneAlt /> {f.call}</a>
            <a className="ft-pill alt" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><FaWhatsapp /> {f.whatsapp}</a>
          </div>
        </div>

        <div className="ft-grid">
          {/* brand */}
          <div className="ft-col ft-brand">
            <div className="ft-logo">
              <GiLotus />
              <div><strong>{t.brand}</strong><small>{t.brandSub}</small></div>
            </div>
            <p className="ft-mantra">{t.mantra}</p>
            <p className="ft-blurb">{f.blurb}</p>
            <div className="ft-social">
              <a href={`tel:${PHONE}`} aria-label={f.call}><FaPhoneAlt /></a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label={f.whatsapp}><FaWhatsapp /></a>
              <a href={MAP_LINK} target="_blank" rel="noreferrer" aria-label={f.directions}><FaMapMarkerAlt /></a>
            </div>
          </div>

          {/* links */}
          <div className="ft-col">
            <h4>{t.footer.quick}</h4>
            <ul className="ft-links">
              {links.map(([to, k]) => <li key={k}><Link to={to}><FaChevronRight />{t.nav[k]}</Link></li>)}
            </ul>
          </div>

          {/* timings */}
          <div className="ft-col">
            <h4>{f.timingsTitle}</h4>
            <div className="ft-card">
              <FaClock />
              <div><b>{f.daily}</b><span>{f.dailyVal}</span><small>{f.poojaNote}</small></div>
            </div>
            <div className="ft-card">
              <FaCalendarAlt />
              <div><b>{f.fest}</b><span>{f.festVal}</span></div>
            </div>
          </div>

          {/* contact */}
          <div className="ft-col">
            <h4>{f.reachTitle}</h4>
            <p className="ft-line"><FaMapMarkerAlt /> <span>{t.footer.line}</span></p>
            <p className="ft-line"><FaPhoneAlt /> <a href={`tel:${PHONE}`}>{PHONE}</a></p>
            <p className="ft-sub">{f.festPhones}</p>
            <div className="ft-phones">
              {FEST_PHONES.map((p) => <a key={p} href={`tel:${p}`}>{p}</a>)}
            </div>
            <a className="ft-dir" href={MAP_LINK} target="_blank" rel="noreferrer"><FaRoute /> {f.directions}</a>
          </div>
        </div>

        <div className="ft-bottom">
          <p>{t.footer.rights} · {f.templeName}</p>
          <p className="ft-credit">{t.x.credit}</p>
          <button className="ft-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FaArrowUp /> {f.top}</button>
        </div>
      </div>
    </footer>
  );
}