import { useState } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaCarSide, FaTrain, FaPlane, FaMapMarkerAlt, FaRoute, FaClock, FaQuestionCircle, FaGlobe, FaExternalLinkAlt, FaRegCopy, FaCheck } from 'react-icons/fa';
import PageHero from '../components/PageHero.jsx';
import Section, { Band, Title } from '../components/Section.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Reveal from '../hooks/Reveal.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { U, hero } from '../data/images.js';
import { PHONE, WHATSAPP, FEST_PHONES, MAP_EMBED, MAP_LINK, TRUST_URL } from '../data/common.js';
import donationQr from '../assets/donation-qr.jpeg';
import '../styles/contact.css';

/* donation details, English + Malayalam */
const DONATE = {
  en: {
    title: 'Donations',
    sub: 'Your offering supports the temple and the Vedic, cultural and charitable work of the trust. You may donate by bank transfer or by UPI.',
    trust: 'Sandeepani Sadhanalaya Charitable & Welfare Trust',
    reg: 'Reg. No. 141/IV/2012',
    bankTitle: 'Bank Details',
    rows: [
      ['Account Name', 'Sandeepani Sadhanalaya Charitable & Welfare Trust'],
      ['SB A/c. No.', '32567270816', true],
      ['Bank & Branch', 'SBI, Vadakkanthara, Palakkad'],
      ['IFSC', 'SBIN0012862', true],
    ],
    upiTitle: 'UPI / Google Pay',
    upiRows: [
      ['UPI ID', 'sandeepanisadhanalaya@upi', true],
      ['Google Pay No.', '9447354285', true],
    ],
    scan: 'Scan with Google Pay, PhonePe or any UPI app',
    mob: 'Mob',
    copy: 'Copy', copied: 'Copied',
    qrAlt: 'Donation UPI QR code',
  },
  ml: {
    title: 'സംഭാവനകൾ',
    sub: 'നിങ്ങളുടെ സമർപ്പണം ക്ഷേത്രത്തിനും ട്രസ്റ്റിന്റെ വൈദിക, സാംസ്കാരിക, ജീവകാരുണ്യ പ്രവർത്തനങ്ങൾക്കും തുണയാകുന്നു. ബാങ്ക് ട്രാൻസ്ഫർ വഴിയോ യുപിഐ വഴിയോ സംഭാവന നൽകാം.',
    trust: 'സന്ദീപനി സാധനാലയ ചാരിറ്റബിൾ & വെൽഫെയർ ട്രസ്റ്റ്',
    reg: 'രജി. നമ്പർ 141/IV/2012',
    bankTitle: 'ബാങ്ക് വിവരങ്ങൾ',
    rows: [
      ['അക്കൗണ്ട് പേര്', 'സന്ദീപനി സാധനാലയ ചാരിറ്റബിൾ & വെൽഫെയർ ട്രസ്റ്റ്'],
      ['SB അക്കൗണ്ട് നമ്പർ', '32567270816', true],
      ['ബാങ്ക് & ശാഖ', 'എസ്ബിഐ, വടക്കഞ്ചേരി, പാലക്കാട്'],
      ['IFSC', 'SBIN0012862', true],
    ],
    upiTitle: 'യുപിഐ / ഗൂഗിൾ പേ',
    upiRows: [
      ['യുപിഐ ഐഡി', 'sandeepanisadhanalaya@upi', true],
      ['ഗൂഗിൾ പേ നമ്പർ', '9447354285', true],
    ],
    scan: 'ഗൂഗിൾ പേ, ഫോൺപേ അല്ലെങ്കിൽ ഏതെങ്കിലും യുപിഐ ആപ്പ് ഉപയോഗിച്ച് സ്കാൻ ചെയ്യുക',
    mob: 'ഫോൺ',
    copy: 'പകർത്തുക', copied: 'പകർത്തി',
    qrAlt: 'സംഭാവന യുപിഐ ക്യുആർ കോഡ്',
  },
};

function CopyBtn({ value, label, done }) {
  const [ok, setOk] = useState(false);
  const go = async () => {
    try { await navigator.clipboard.writeText(value); setOk(true); setTimeout(() => setOk(false), 1600); } catch { /* ignore */ }
  };
  return (
    <button type="button" className="dn-copy" onClick={go} aria-label={`${label} ${value}`}>
      {ok ? <FaCheck aria-hidden="true" /> : <FaRegCopy aria-hidden="true" />} <span>{ok ? done : label}</span>
    </button>
  );
}

function DonRow({ label, val, copy, d }) {
  return (
    <div className="dn-row">
      <span className="dn-label">{label}</span>
      <b className="dn-val">{val}</b>
      {copy && <CopyBtn value={val} label={d.copy} done={d.copied} />}
    </div>
  );
}

const icons = [FaCarSide, FaTrain, FaPlane, FaPhoneAlt];

export default function Contact() {
  const { t, lang } = useLang();
  const d = DONATE[lang] || DONATE.en;
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

      {/* donations */}
      <Band tone="light" className="dn-sec">
        <Title>{d.title}</Title>
        <Reveal as="p" i={2} className="para center dn-sub">{d.sub}</Reveal>
        <div className="dn-grid">
          <Reveal i={1} className="dn-card">
            <h3 className="dn-trust">{d.trust}</h3>
            <p className="dn-meta">{d.reg}</p>
            <p className="dn-meta">{d.mob}: <a href="tel:9447354285">9447354285</a>, <a href="tel:8304824285">8304824285</a></p>
            <p className="dn-meta"><a href={TRUST_URL} target="_blank" rel="noopener noreferrer">sandeepanisadhanalaya.com</a></p>
            <h4 className="dn-h">{d.bankTitle}</h4>
            {d.rows.map(([l, v, c]) => <DonRow key={l} label={l} val={v} copy={c} d={d} />)}
          </Reveal>
          <Reveal i={3} className="dn-card dn-pay">
            <h4 className="dn-h">{d.upiTitle}</h4>
            <div className="dn-qr"><img src={donationQr} alt={d.qrAlt} loading="lazy" /></div>
            <p className="dn-scan">{d.scan}</p>
            {d.upiRows.map(([l, v, c]) => <DonRow key={l} label={l} val={v} copy={c} d={d} />)}
          </Reveal>
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