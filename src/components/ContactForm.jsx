import { useState } from 'react';
import { FaWhatsapp, FaSms, FaPaperPlane } from 'react-icons/fa';
import { useLang } from '../context/LanguageContext.jsx';
import { PHONE, WHATSAPP } from '../data/common.js';
import '../styles/contactform.css';

/* Message-the-temple form. There is no server: the message is written into WhatsApp (or SMS)
   addressed to the temple number, so the devotee only has to press send. */
export default function ContactForm({ className = '' }) {
  const { t } = useLang();
  const f = t.x.form;
  const [v, setV] = useState({ name: '', phone: '', topic: 0, msg: '' });
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('');

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!v.name.trim()) e.name = f.errName;
    if (!v.msg.trim()) e.msg = f.errMsg;
    if (v.phone.trim() && !/^\d{10}$/.test(v.phone.replace(/[\s-]/g, '').replace(/^(\+91|91)/, ''))) e.phone = f.errPhone;
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const text = () => [
    f.greet, '',
    `${f.lblTopic}: ${f.topics[v.topic]}`,
    v.msg.trim(), '',
    `${f.lblName}: ${v.name.trim()}`,
    v.phone.trim() ? `${f.lblPhone}: ${v.phone.trim()}` : '',
  ].filter((l, i, a) => l !== '' || (i > 0 && a[i - 1] !== '')).join('\n').trim();

  const sendWhatsApp = (e) => {
    e.preventDefault();
    if (!validate()) { setStatus(''); return; }
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text())}`, '_blank', 'noopener');
    setStatus(f.ok);
  };
  const sendSms = () => {
    if (!validate()) { setStatus(''); return; }
    window.location.href = `sms:${PHONE}?body=${encodeURIComponent(text())}`;
    setStatus(f.okSms);
  };

  return (
    <form className={`cf ${className}`} onSubmit={sendWhatsApp} noValidate>
      <h3 className="cf-title"><FaPaperPlane /> {f.title}</h3>
      <p className="cf-sub">{f.sub}</p>

      <div className="cf-row">
        <label className="cf-field">
          <span>{f.name}</span>
          <input type="text" value={v.name} onChange={set('name')} autoComplete="name" aria-invalid={!!err.name} />
          {err.name && <em role="alert">{err.name}</em>}
        </label>
        <label className="cf-field">
          <span>{f.phone}</span>
          <input type="tel" inputMode="tel" value={v.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={!!err.phone} />
          {err.phone && <em role="alert">{err.phone}</em>}
        </label>
      </div>

      <label className="cf-field">
        <span>{f.topic}</span>
        <select value={v.topic} onChange={(e) => setV((s) => ({ ...s, topic: Number(e.target.value) }))}>
          {f.topics.map((tp, n) => <option key={n} value={n}>{tp}</option>)}
        </select>
      </label>

      <label className="cf-field">
        <span>{f.msg}</span>
        <textarea rows="4" value={v.msg} onChange={set('msg')} aria-invalid={!!err.msg} />
        {err.msg && <em role="alert">{err.msg}</em>}
      </label>

      <div className="cf-actions">
        <button type="submit" className="btn"><FaWhatsapp /> {f.whatsapp}</button>
        <button type="button" className="btn ghost" onClick={sendSms}><FaSms /> {f.sms}</button>
      </div>
      <p className={`cf-note ${status ? 'ok' : ''}`} aria-live="polite">{status || f.note}</p>
    </form>
  );
}
