// Your own temple photos (keep these in src/assets)
import hero from '../assets/temple-image.png';
import banyan from '../assets/k2.jpeg';
import shrine from '../assets/WhatsApp_Image_2026-11-19_at_11_39_20_AM.jpeg';

// Free-to-use photos from unsplash.com (hotlinked). If one cannot load, the site shows your own photo instead.
const u = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=70&w=${w}`;

export const U = {
  gopuram: u('1644773182204-f0bf03cae0cb'),
  templeWater: u('1589707787376-98f208f4b307'),
  statue: u('1649564293021-073a9932e5e9'),
  lampDark: u('1695805554325-1e8a1e44956b'),
  lampStand: u('1619410676080-5be7b3befc21'),
  lampCircle: u('1635192592106-77a5aacbe1a3'),
  lampTable: u('1702072698230-edc03e6511d4'),
  bananaLeaf: u('1635778975932-6f51c8fa2ece'),
  kathakali: u('1597735881932-d9664c9bbcea'),
  river: u('1704365159747-1f7b8913044f'),
  hills: u('1583513645242-25a32d451084'),
};

export { hero, banyan, shrine };
// gallery order, matches t.x.gallery.caps
export const gallery = [hero, banyan, shrine, U.gopuram, U.templeWater, U.statue, U.lampDark, U.lampStand, U.lampCircle, U.lampTable, U.bananaLeaf, U.kathakali, U.river, U.hills];

// category of each gallery photo (same order as `gallery` above)
export const galleryCats = ['temple', 'temple', 'temple', 'temple', 'temple', 'temple', 'lamps', 'lamps', 'lamps', 'lamps', 'festival', 'festival', 'nature', 'nature'];
