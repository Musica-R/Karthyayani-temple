import { useEffect, useRef, useState } from 'react';

/* Reveals an element once when scrolled into view.
   Use i={0,1,2...} so siblings appear one after another. */
export default function Reveal({ children, i = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`}
      style={{ '--d': `${i * 150}ms` }} {...rest}>
      {children}
    </Tag>
  );
}
