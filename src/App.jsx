import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Architecture from './pages/Architecture.jsx';
import Deity from './pages/Deity.jsx';
import Pooja from './pages/Pooja.jsx';
import Festivals from './pages/Festivals.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/deity" element={<Deity />} />
        <Route path="/pooja" element={<Pooja />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
