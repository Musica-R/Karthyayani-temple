import { useState } from 'react';
import { hero } from '../data/images.js';

/* Image that falls back to the temple's own photo if a hosted image fails */
export default function Img({ src, alt = '', fallback = hero, ...rest }) {
  const [bad, setBad] = useState(false);
  return <img src={bad ? fallback : src} alt={alt} loading="lazy" onError={() => setBad(true)} {...rest} />;
}
