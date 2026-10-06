import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import standingImage from './assets/standing-studio.png';

const domains = [
  {
    tag: '01',
    name: 'Artificial Intelligence',
    status: 'Exploring',
    summary: 'How intelligent systems learn, reason, and support creative work.',
    points: ['Curious about how models learn from data', 'Interested in AI as a creative tool', 'Learning by experimenting'],
  },
  {
    tag: '02',
    name: 'Programming',
    status: 'Building',
    summary: 'Turning ideas into working software, one small project at a time.',
    points: ['Writing code to solve real problems', 'Building for the joy of learning', 'Getting comfortable iterating and debugging'],
  },
  {
    tag: '03',
    name: 'Cybersecurity',
    status: 'Learning',
    summary: 'How systems are attacked, defended, and kept resilient.',
    points: ['Curious about how systems are protected', 'Thinking in secure habits', 'Exploring the defensive side of tech'],
  },
  {
    tag: '04',
    name: 'Web Development',
    status: 'Building',
    summary: 'Building responsive, expressive pages with modern web tools.',
    points: ['Designing for clarity on every screen', 'Making interfaces feel alive', 'Learning modern web tooling'],
  },
  {
    tag: '05',
    name: 'Game Development',
    status: 'Exploring',
    summary: 'Experimenting with interactive worlds, mechanics, and play.',
    points: ['Enjoying systems and interaction', 'Testing ideas through play', 'Learning how games come together'],
  },
  {
    tag: '06',
    name: 'Creative Technology',
    status: 'Building',
    summary: 'Blending design, motion, and code into experiences that feel alive.',
    points: ['Mixing visuals with code', 'Drawn to motion and interaction', 'Trying to make technology feel human'],
  },
];

const approach = [
  { index: '01', label: 'Stay curious', note: 'Follow the questions that are interesting.' },
  { index: '02', label: 'Build to learn', note: 'Turn ideas into something that runs.' },
  { index: '03', label: 'Iterate', note: 'Improve a little every time.' },
];

export default function SkillsPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const current = domains[active];

  return <main className="skills-page">
    <div className="skills-background" style={{ backgroundImage: `url(${standingImage})` }} aria-hidden="true" />
    <SiteNavbar />
    <section className="skills-hero">
      <motion.p className="about-kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>System online <span /></motion.p>
      <motion.h1 initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .75, ease: [.2, .75, .25, 1] }}>Skills &amp; <em>tools.</em></motion.h1>
      <motion.p className="skills-hero-copy" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16, duration: .6 }}>Early in the journey and honest about it — these are the areas I keep coming back to, learning by building.</motion.p>
    </section>
    <section className="skills-console-section" aria-label="Skill areas">
      <motion.div className="skills-console" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7, ease: [.2, .75, .25, 1] }}>
        <div className="console-list" role="tablist" aria-label="Skill areas">
          {domains.map((domain, index) => <button key={domain.name} type="button" role="tab" aria-selected={active === index} className={active === index ? 'active' : ''} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
            <span className="console-index">{domain.tag}</span>
            <span className="console-name">{domain.name}</span>
            <span className="console-status">{domain.status}</span>
          </button>)}
        </div>
        <motion.div key={current.name} className="console-panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, ease: [.2, .75, .25, 1] }}>
          <span className="console-panel-kicker">Skill area {current.tag}</span>
          <h3>{current.name}</h3>
          <p>{current.summary}</p>
          <ul>{current.points.map(point => <li key={point}>{point}</li>)}</ul>
          <div className="console-panel-footer"><span className="console-chip">{current.status}</span><span className="console-hint">Tap another area</span></div>
        </motion.div>
      </motion.div>
    </section>
    <section className="exploring-section" aria-label="How I work">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><p className="section-kicker">The way I learn</p><h2>Interested, then <em>building.</em></h2></motion.div>
      <div className="exploration-list">{approach.map((step, index) => <motion.div key={step.label} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .07, duration: .45 }}><span>{step.index}</span>{step.label}<i>↗</i></motion.div>)}</div>
    </section>
    <section className="more-section">
      <div><p className="section-kicker">Keep moving</p><h2>More to <em>explore.</em></h2></div>
      <div className="more-links"><a href="/about" onClick={(event) => { event.preventDefault(); navigate('/about'); }}><span>01</span><strong>About</strong><p>Get to know Abdullah and the ideas behind the work.</p><b>↗</b></a><a href="/album" onClick={(event) => { event.preventDefault(); navigate('/album'); }}><span>02</span><strong>Album</strong><p>Explore Abdullah’s visual and project collection.</p><b>↗</b></a></div>
    </section>
    <footer className="about-footer"><strong>Abdullah Portfolio</strong><span>Building, learning, and exploring technology.</span><span>© 2026</span></footer>
  </main>;
}
