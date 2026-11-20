import { createContext, useContext, useEffect, useState } from 'react';
import en from '../data/en.js';
import ml from '../data/ml.js';

const packs = { en, ml };
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'ml'; } catch { return 'ml'; }
  });
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch { /* ignore */ }
  }, [lang]);
  const toggle = () => setLang((l) => (l === 'en' ? 'ml' : 'en'));
  return (
    <LanguageContext.Provider value={{ lang, t: packs[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}
export const useLang = () => useContext(LanguageContext);
