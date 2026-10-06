import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const links = ['Home', 'About', 'Skills', 'Album'];

export default function SiteNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const path = location.pathname;
  const selected = path === '/about' ? 1 : path === '/skills' ? 2 : path === '/album' ? 3 : 0;
  const focus = hovered ?? selected;
  const go = (link) => {
    if (link === 'About') { navigate('/about'); return; }
    if (link === 'Skills') { navigate('/skills'); return; }
    if (link === 'Album') { navigate('/album'); window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0); return; }
    if (link === 'Home') { navigate('/'); window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0); return; }
  };
  return <nav className="navbar" aria-label="Primary navigation">
    <button className="brand" type="button" onClick={() => go('Home')}>Abdullah<span>.</span></button>
    <div className="rubber-segment" onMouseLeave={() => setHovered(null)} style={{ '--segment': focus }}>
      <span className="segment-orb" aria-hidden="true" />
      {links.map((link, index) => <button key={link} className={selected === index ? 'active' : ''} onMouseEnter={() => setHovered(index)} onFocus={() => setHovered(index)} onClick={() => go(link)}>{link}</button>)}
    </div>
  </nav>;
}
