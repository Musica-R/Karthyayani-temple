import { FaPhoneAlt, FaWhatsapp, FaCarSide, FaTrain, FaPlane, FaMapMarkerAlt, FaRoute, FaClock, FaQuestionCircle, FaGlobe, FaExternalLinkAlt } from 'react-icons/fa';
import PageHero from '../components/PageHero.jsx';
import Section, { Band, Title } from '../components/Section.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { U, hero } from '../data/images.js';
import { PHONE, WHATSAPP, FEST_PHONES, MAP_EMBED, MAP_LINK, TRUST_URL } from '../data/common.js';
import '../styles/contact.css';

const icons = [FaCarSide, FaTrain, FaPlane, FaPhoneAlt];

export default function Contact() {
  const { t } = useLang();
  const c = t.contact; const x = t.x.contact; const cx = t.x.cx; const h = t.home; const f = t.x.form;
  const quick = [
    [FaPhoneAlt, c.call, PHONE, cx.callText, `tel:${PHONE}`],
    [FaWhatsapp, cx.wa, PHONE, cx.waText, `https://wa.me/${WHATSAPP}`],
    [FaMapMarkerAlt, t.x.home.locLabel, t.x.home.loc, c.directions, MAP_LINK],
    [FaClock, h.timingTitle, h.timing, h.timingNote, null],
  ];
  return (
    <>
      <PageHero title={c.title} sub={c.sub} image={[U.hills, hero]} />

      {/* quick contact cards */}
      <Band tone="light" mandala={false} className="ct-quick-band">
        <div className="ct-quick">
          {quick.map(([Icon, label, val, text, href], n) => {
            const Tag = href ? 'a' : 'div';
            const ext = href && href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {};
            return (
              <Reveal key={n} i={n} className="ct-q-wrap">
                <Tag className="ct-q" {...(href ? { href } : {})} {...ext}>
                  <span className="ct-q-ico"><Icon /></span>
                  <h3>{label}</h3><b>{val}</b><small>{text}</small>
                </Tag>
              </Reveal>
            );
          })}
        </div>
      </Band>

      {/* message the temple */}
      <Band tone="dark" className="ct-msg">
        <div className="ct-msg-grid">
          <Reveal className="ct-msg-info">
            <Reveal as="h2" className="sec-title ct-left">{f.title}</Reveal>
            <div className="divider ct-left-div"><span /></div>
            <p className="para">{f.sub}</p>
            <ul className="ct-list">
              <li><FaMapMarkerAlt /><span>{t.footer.line}</span></li>
              <li><FaClock /><span>{h.timingTitle}: {h.timing}</span></li>
              <li><FaPhoneAlt /><a href={`tel:${PHONE}`}>{PHONE}</a></li>
              <li>
                <FaGlobe />
                <a href={TRUST_URL} target="_blank" rel="noopener noreferrer">sandeepanisadhanalaya.com</a>
              </li>
            </ul>
          </Reveal>
          <Reveal i={2}><ContactForm /></Reveal>
        </div>
      </Band>

      {/* how to reach */}
      <Section tone="cream" title={c.reachTitle} paras={[c.reach]}>
        <div className="reach-grid">
          {c.rows.map(([label, val], n) => {
            const Icon = icons[n];
            return (
              <Reveal key={n} i={n + 3} className="reach">
                <Icon /><div><h3>{label}</h3>{val ? <p>{val}</p> : <a href={`tel:${PHONE}`}>{PHONE}</a>}</div>
              </Reveal>
            );
          })}
        </div>
        <Reveal i={8} className="cta-row">
          <a className="btn" href={`tel:${PHONE}`}><FaPhoneAlt /> {c.call}</a>
          <a className="btn ghost" href={MAP_LINK} target="_blank" rel="noreferrer"><FaRoute /> {c.directions}</a>
        </Reveal>
      </Section>

      <Band tone="dark" className="map-sec">
        <Reveal className="map-wrap">
          <iframe title="Temple map" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </Reveal>
        <Reveal i={1} as="p" className="para center"><FaMapMarkerAlt /> {x.mapCap}</Reveal>
      </Band>

      <Section tone="light" title={x.faqTitle}>
        <div className="faq">
          {x.faq.map(([q, a], n) => (
            <Reveal key={n} i={n % 3} className="faq-item"><h3><FaQuestionCircle /> {q}</h3><p>{a}</p></Reveal>
          ))}
        </div>
      </Section>

      {/* managed by the trust, with link to their website */}
      <Band tone="cream" className="ct-trust">
        <Reveal className="ct-trust-box">
          <h3>{cx.trustTitle}</h3>
          <p className="para">{cx.trustText}</p>
          <a className="btn" href={TRUST_URL} target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt aria-hidden="true" /> {cx.trustBtn}
          </a>
        </Reveal>
      </Band>

      <Section tone="maroon" title={c.festPhones}>
        <div className="phones">
          {FEST_PHONES.map((p, n) => (
            <Reveal key={p} i={n}><a className="btn" href={`tel:${p}`}><FaPhoneAlt /> {p}</a></Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}