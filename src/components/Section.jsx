import Reveal from '../hooks/Reveal.jsx';
import Img from './Img.jsx';
import { Mandala } from './Effects.jsx';

/* Full-width coloured band. tone: dark | maroon | light | cream */
export function Band({ tone = 'dark', mandala = true, className = '', children }) {
  return (
    <div className={`band ${tone} ${className}`}>
      {mandala && <Mandala className="m1" />}
      {mandala && <Mandala className="m2" />}
      <div className="container section">{children}</div>
    </div>
  );
}

export function Title({ children }) {
  return (
    <>
      <Reveal as="h2" className="sec-title">{children}</Reveal>
      <Reveal i={1}><div className="divider"><span /></div></Reveal>
    </>
  );
}

/* Titled section; paragraphs reveal one by one. Optional arch-framed image beside the text. */
export default function Section({ title, paras = [], tone = 'dark', image, caption, flip = false, mandala = true, className = '', children }) {
  const text = (
    <>
      <Title>{title}</Title>
      {paras.map((p, n) => <Reveal as="p" key={n} i={n + 2} className="para">{p}</Reveal>)}
      {children}
    </>
  );
  return (
    <Band tone={tone} mandala={mandala} className={className}>
      {image ? (
        <div className={`split ${flip ? 'flip' : ''}`}>
          <div className="split-text">{text}</div>
          <Reveal as="figure" i={2} className="arch">
            <Img src={image} alt={caption || title} />
            {caption && <figcaption>{caption}</figcaption>}
          </Reveal>
        </div>
      ) : text}
    </Band>
  );
}
