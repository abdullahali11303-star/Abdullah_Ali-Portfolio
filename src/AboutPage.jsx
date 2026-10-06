import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import FlipCard from './components/FlipCard';
import FolderFloat from './components/FolderFloat';
import portraitImage from './assets/portrait-desk.png';
import sunsetImage from './assets/sunset-window.png';

const focusItems = [
  { label: 'AI', value: 'ai' },
  { label: 'Programming', value: 'programming' },
  { label: 'Cybersecurity', value: 'cybersecurity' },
  { label: 'Web development', value: 'web-development' },
  { label: 'Building projects', value: 'building' },
  { label: 'Always learning', value: 'learning' },
];
const explorations = ['AI', 'Programming', 'Cybersecurity', 'Web Development', 'Game Development', 'Creative Technology'];

export default function AboutPage() {
  const navigate = useNavigate();
  return <main className="about-page">
    <div className="about-background" style={{ backgroundImage: `url(${sunsetImage})` }} aria-hidden="true" />
    <SiteNavbar />
    <section className="about-hero">
      <motion.p className="about-kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>About me <span /></motion.p>
      <motion.h1 initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .75, ease: [.2, .75, .25, 1] }}>About <span className="name-highlight">Abdullah</span></motion.h1>
      <motion.p className="about-hero-copy" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16, duration: .6 }}>Curious about technology, drawn to creative ideas, and always learning what can be built next.</motion.p>
    </section>
    <section className="about-intro">
      <motion.div className="about-image-wrap" initial={{ opacity: 0, y: 30, scale: .96, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true, amount: .3 }} transition={{ duration: .8, ease: [.2, .75, .25, 1] }} whileHover={{ y: -5 }}>
        <FlipCard
          front={<img src={portraitImage} alt="Abdullah exploring technology at his desk" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          back={<img src={sunsetImage} alt="Abdullah looking over the city at sunset" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          axis="y"
          flipOnClick
          draggable
          dragDistance={0}
          tilt
          tiltMax={12}
          glare
          glareOpacity={0.22}
          hoverScale={1.03}
          perspective={1100}
          stiffness={170}
          damping={20}
          width={340}
          height={430}
          radius={22}
          background="#27272a"
          color="#f5f5f5"
          shadow
          shadowColor="#000000"
          shadowOpacity={0.45}
          ariaLabel="Abdullah — tap to flip"
        />
        <span className="image-caption">A curious mind, in progress.</span>
      </motion.div>
      <motion.div className="about-copy" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: .1, duration: .7 }}>
        <p className="section-kicker">A little about me</p>
        <h2>Ideas become more exciting when you <em>make them real.</em></h2>
        <p>I’m Abdullah — interested in programming, AI, cybersecurity, web development, and the creative side of technology. I enjoy learning through building, exploring how ideas work, and turning curiosity into small digital projects.</p>
        <div className="about-line" />
      </motion.div>
    </section>
    <section className="focus-section" aria-label="My focus">
      <motion.div className="focus-heading" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55 }}>
        <p className="section-kicker">Interests · Learning · Building</p>
        <h2>My <em>focus.</em></h2>
      </motion.div>
      <motion.div className="focus-stage" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: .1, duration: .7 }}>
        <FolderFloat
          items={focusItems}
          label="My Focus"
          sublabel="Interests · Learning · Building"
          trigger="hover"
          folderColor="#20221e"
          frontColor="#2b2d28"
          paperColor="#e8e2d4"
          itemColor="#2c2e29"
          itemTextColor="#f3efe6"
          labelColor="#f4f0e7"
          width={210}
          height={150}
          radius={15}
          spread={190}
          lift={28}
          tilt={8}
        />
      </motion.div>
    </section>
    <section className="exploring-section">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><p className="section-kicker">Always curious</p><h2>What I’m <em>exploring.</em></h2></motion.div>
      <div className="exploration-list">{explorations.map((topic, index) => <motion.div key={topic} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .055, duration: .45 }}><span>0{index + 1}</span>{topic}<i>↗</i></motion.div>)}</div>
    </section>
    <section className="more-section">
      <div><p className="section-kicker">Keep moving</p><h2>More to <em>explore.</em></h2></div>
      <div className="more-links"><a href="/skills" onClick={(event) => { event.preventDefault(); navigate('/skills'); }}><span>01</span><strong>Skills</strong><p>Explore Abdullah’s skills and technologies.</p><b>↗</b></a><a href="/album" onClick={(event) => { event.preventDefault(); navigate('/album'); }}><span>02</span><strong>Album</strong><p>Explore Abdullah’s visual and project collection.</p><b>↗</b></a></div>
    </section>
    <footer className="about-footer"><strong>Abdullah Portfolio</strong><span>Building, learning, and exploring technology.</span><span>© 2026</span></footer>
  </main>;
}
