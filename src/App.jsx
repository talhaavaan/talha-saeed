import { useEffect, useRef, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { Testimonials3D } from './components/Testimonials3D';
import { VideoSection } from './components/VideoSection';
import AboutPage from './components/ui/about-page';
import { ServiceCard } from './components/ui/service-card';
import { CircularGallery } from './components/ui/circular-gallery';

const SERVICES = [
  { num: '01', title: 'Meta Ads', desc: 'Full-funnel Meta advertising — creative strategy, audience targeting, A/B testing, and ROAS optimization across Facebook and Instagram.', tag: 'Performance', variant: 'blue' },
  { num: '02', title: 'Shopify Store Management', desc: 'End-to-end Shopify setup, product listing, theme customization, conversion optimization, and ongoing store management.', tag: 'E-Commerce', variant: 'default' },
  { num: '03', title: 'Airbnb Listing & Handling', desc: 'Professional Airbnb listing creation, photography direction, pricing strategy, guest communication, and reputation management.', tag: 'Hospitality', variant: 'gray' },
  { num: '04', title: 'Web Development & Design', desc: 'Custom websites for performance and aesthetics — from landing pages to full web apps, responsive across all devices.', tag: 'Development', variant: 'blue' },
  { num: '05', title: 'Graphic Design & Videography', desc: 'Brand visuals, social media content, cinematic video, reels, and short-form content that stops the scroll.', tag: 'Creative', variant: 'red' },
  { num: '06', title: 'Google Ads', desc: 'Data-driven Google Ads — search, display, shopping, and YouTube — engineered for maximum click-through and conversion.', tag: 'Growth', variant: 'default' },
  { num: '07', title: 'Content Strategy', desc: 'Platform-specific content calendars, trend analysis, and storytelling frameworks that grow your audience.', tag: 'Strategy', variant: 'gray' },
  { num: '08', title: 'Brand Identity', desc: 'Complete brand systems: logo, color palette, typography, tone of voice, and guidelines to show up consistently.', tag: 'Branding', variant: 'blue' },
  { num: '09', title: 'Creative Direction', desc: 'End-to-end creative vision for campaigns, shoots, and launches. Concept to execution at its very best.', tag: 'Premium', variant: 'red' },
];

const GALLERY_ITEMS = [
  {
    common: 'Meta Campaign',
    binomial: 'E-Commerce Brand — 4× ROAS',
    photo: { url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80', text: 'Social media ads dashboard', by: 'Campaign Work', pos: 'center' }
  },
  {
    common: 'Shopify Store',
    binomial: 'Fashion Brand Full Build',
    photo: { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80', text: 'E-commerce store', by: 'Store Design', pos: 'center top' }
  },
  {
    common: 'Brand Identity',
    binomial: 'CyberStudio Full System',
    photo: { url: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&auto=format&fit=crop&q=80', text: 'Brand identity design', by: 'Branding Work', pos: 'center' }
  },
  {
    common: 'Cinematic Edit',
    binomial: 'Battle of Jalalabad — 2M Views',
    photo: { url: '/assets/cinematic.jpg', text: 'Cinematic video production', by: 'Video Work', pos: '50% 30%' }
  },
  {
    common: 'Web Design',
    binomial: 'Restaurant — 98 Lighthouse',
    photo: { url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80', text: 'Restaurant website design', by: 'Web Work', pos: 'center' }
  },
  {
    common: 'Google Ads',
    binomial: 'Local Business — 3× Leads',
    photo: { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80', text: 'Google ads management', by: 'Ads Work', pos: 'center' }
  },
  {
    common: 'Airbnb Listing',
    binomial: 'Luxury Property Management',
    photo: { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&auto=format&fit=crop&q=80', text: 'Luxury Airbnb property', by: 'Hospitality Work', pos: 'center' }
  },
  {
    common: 'Content Strategy',
    binomial: 'Brand Growth — 10K Followers',
    photo: { url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&auto=format&fit=crop&q=80', text: 'Content creation', by: 'Strategy Work', pos: 'center' }
  },
];

export default function App() {
  const [loaderPct, setLoaderPct] = useState(0);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: "Hey! I'm Talha's digital assistant. Want to know about services, pricing, or have a project in mind?" },
    { from: 'bot', text: 'You can also reach Talha directly on Instagram @talha___w202 for the fastest response!' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [skillsDone, setSkillsDone] = useState(false);

  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const chatBodyRef = useRef(null);
  const replyIdx = useRef(0);
  const skillsRef = useRef(null);

  const chatReplies = [
    "Great! Talha is currently available for new projects. Drop your details here or DM on Instagram @talha___w202",
    "Pricing depends on the project scope. For a quick quote, share your requirements and I'll connect you with Talha!",
    "Talha specializes in Meta/Google Ads, Shopify, web design, video editing, and brand strategy. What are you looking for?",
    "Turnaround is typically 2–5 days for reels and 5–10 days for full brand projects. Rush delivery available!",
    "Reach Talha fastest on Instagram @talha___w202 or fill out the contact form above. Response within hours!",
  ];

  // Loader
  useEffect(() => {
    let pct = 0;
    const int = setInterval(() => {
      pct += Math.random() * 8;
      if (pct >= 100) { pct = 100; clearInterval(int); setTimeout(() => setLoaderHidden(true), 400); }
      setLoaderPct(Math.floor(pct));
    }, 80);
    return () => clearInterval(int);
  }, []);

  // Cursor — desktop only
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
      return;
    }
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (cursorRef.current) { cursorRef.current.style.left = mx + 'px'; cursorRef.current.style.top = my + 'px'; }
    };
    const animRing = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px'; }
      requestAnimationFrame(animRing);
    };
    document.addEventListener('mousemove', onMove);
    animRing();
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollPct(pct * 100);
      setNavScrolled(window.scrollY > 80);
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('visible');
      });
      if (!skillsDone && skillsRef.current) {
        if (skillsRef.current.getBoundingClientRect().top < window.innerHeight * 0.8) {
          setSkillsDone(true);
          document.querySelectorAll('.skill-fill').forEach(el => { el.style.width = el.dataset.width + '%'; });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    setTimeout(onScroll, 100);
    return () => window.removeEventListener('scroll', onScroll);
  }, [skillsDone]);

  // Particles
  useEffect(() => {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 1;
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${8 + Math.random() * 15}s;animation-delay:${-Math.random() * 20}s;opacity:${Math.random() * 0.2 + 0.05}`;
      container.appendChild(p);
    }
  }, [loaderHidden]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { from: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      const reply = chatReplies[replyIdx.current % chatReplies.length];
      replyIdx.current++;
      setChatMessages(prev => [...prev, { from: 'bot', text: reply }]);
    }, 800);
  };

  useEffect(() => {
    if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
      <div id="scroll-bar" style={{ width: scrollPct + '%' }} />

      {/* ── MOBILE MENU ── */}
      <div id="mobile-menu" className={menuOpen ? 'open' : ''}>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#showreel" onClick={() => setMenuOpen(false)}>Work</a>
        <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>

      {/* ── LOADER ── */}
      <div className={`loader${loaderHidden ? ' hidden' : ''}`}>
        <div className="loader-logo">TALHA SAEED</div>
        <div className="loader-sub">Nikamma Film Maker</div>
        <div className="loader-bar-wrap"><div className="loader-bar" /></div>
        <div className="loader-count">{loaderPct}%</div>
      </div>

      {/* ── NAV — only one, fixed, clean glass on scroll ── */}
      <nav className={navScrolled ? 'scrolled' : ''}>
        <a href="#hero" className="nav-logo">TALHA SAEED</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#showreel">Work</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Let's Work</a>
        <button className="hamburger" onClick={() => setMenuOpen(m => !m)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className="portfolio-body" id="particles">

        {/* HERO — MinimalistHero has its own internal header hidden via CSS */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* MARQUEE */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {['Meta Ads', 'Shopify Stores', 'Web Design', 'Google Ads', 'Brand Identity', 'Video Editing', 'Airbnb Handling', 'Motion Graphics', 'Content Strategy', 'Creative Direction',
              'Meta Ads', 'Shopify Stores', 'Web Design', 'Google Ads', 'Brand Identity', 'Video Editing', 'Airbnb Handling', 'Motion Graphics', 'Content Strategy', 'Creative Direction'].map((item, i) => (
              <span key={i} className={`marquee-item${i % 2 === 1 ? ' highlight' : ''}`}>
                {item} <span className="dot" />
              </span>
            ))}
          </div>
        </div>

        {/* ── ABOUT — exact about-page component ── */}
        <section id="about" style={{ padding: 0, maxWidth: '100%', margin: 0 }}>
          <div className="section-tag reveal" style={{ padding: '4rem 4rem 0', maxWidth: 1400, margin: '0 auto' }}>About Me</div>
          <AboutPage />
        </section>

        <div className="neon-divider" />

        {/* ── SERVICES — ServiceCard grid ── */}
        <section id="services">
          <div className="section-tag reveal">What I Do</div>
          <h2 className="section-h2 reveal">Services That <span className="gradient-text">Elevate</span><br />Your Brand.</h2>
          <div className="services-card-grid">
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.num}
                num={s.num}
                title={s.title}
                desc={s.desc}
                tag={s.tag}
                variant={s.variant}
                href="#contact"
                className="reveal"
              />
            ))}
          </div>
        </section>

        <div className="neon-divider" />

        {/* VIDEO SHOWREEL */}
        <VideoSection />

        <div className="neon-divider" />

        {/* ── WORK — CircularGallery ── */}
        <section id="portfolio" style={{ padding: 0, maxWidth: '100%', margin: 0 }}>
          <div style={{ padding: '8rem 4rem 3rem', maxWidth: 1400, margin: '0 auto' }}>
            <div className="section-tag reveal">My Work</div>
            <h2 className="section-h2 reveal">Portfolio That<br /><span className="gradient-text">Speaks</span> Loud.</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.85rem', color: 'rgba(209,213,219,0.4)', marginTop: '0.5rem' }}>Scroll to rotate through the work.</p>
          </div>
          {/* Sticky scrollable gallery */}
          <div style={{ height: '140vh', position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <CircularGallery items={GALLERY_ITEMS} radius={520} autoRotateSpeed={0.025} />
            </div>
          </div>
        </section>

        <div className="neon-divider" />

        {/* SKILLS */}
        <section id="skills" ref={skillsRef}>
          <div className="section-tag reveal">My Arsenal</div>
          <h2 className="section-h2 reveal">Tools &amp; <span className="gradient-text">Skills.</span></h2>

          {/* Skill bars */}
          <div className="arsenal-bars reveal">
            {[
              ['Meta Ads Manager', 97],
              ['Adobe Premiere Pro', 97],
              ['Shopify', 94],
              ['Photoshop', 92],
              ['Google Ads', 88],
              ['Figma / UI Design', 88],
              ['Web Development', 85],
            ].map(([name, w]) => (
              <div key={name} className="arsenal-bar-row">
                <div className="arsenal-bar-label">
                  <span className="arsenal-bar-name">{name}</span>
                  <span className="arsenal-bar-pct">{w}%</span>
                </div>
                <div className="arsenal-bar-track">
                  <div className="skill-fill" data-width={w} style={{ height: '100%', width: 0, background: 'linear-gradient(90deg,var(--blue),var(--cyan))', transition: 'width 1.4s cubic-bezier(.16,1,.3,1)' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Tool cards — bento grid */}
          <div className="arsenal-bento reveal">
            {[
              { name: 'Meta Ads', level: 'Expert', cat: 'Performance', icon: '⚡' },
              { name: 'Shopify', level: 'Expert', cat: 'E-Commerce', icon: '🛍' },
              { name: 'Google Ads', level: 'Advanced', cat: 'Growth', icon: '📈' },
              { name: 'Premiere Pro', level: 'Expert', cat: 'Video', icon: '🎬' },
              { name: 'Photoshop', level: 'Expert', cat: 'Design', icon: '🎨' },
              { name: 'Figma', level: 'Proficient', cat: 'UI/UX', icon: '✦' },
              { name: 'Airbnb', level: 'Full Mgmt', cat: 'Hospitality', icon: '🏡' },
              { name: 'Web Dev', level: 'React · Vite', cat: 'Code', icon: '⟨/⟩' },
            ].map((t) => (
              <div key={t.name} className="arsenal-card">
                <div className="arsenal-card-icon">{t.icon}</div>
                <div className="arsenal-card-name">{t.name}</div>
                <div className="arsenal-card-level">{t.level}</div>
                <div className="arsenal-card-cat">{t.cat}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="neon-divider" />

        {/* TESTIMONIALS */}
        <section id="testimonials">
          <div className="section-tag reveal">Client Love</div>
          <h2 className="section-h2 reveal">What Clients<br /><span className="gradient-text">Say.</span></h2>
          <div className="reveal"><Testimonials3D /></div>
        </section>

        <div className="neon-divider" />

        {/* SOCIAL */}
        <section id="social">
          <div className="section-tag reveal">Social Presence</div>
          <h2 className="section-h2 reveal">Follow the<br /><span className="gradient-text">Journey.</span></h2>
          <div className="social-hero reveal">
            <div>
              <p style={{ fontSize: '.9rem', lineHeight: 1.9, color: 'rgba(209,213,219,.6)', marginBottom: '2rem' }}>
                Join the community and watch behind-the-scenes content, edits, and the creative process unfold in real time.
              </p>
              <div className="social-stats">
                {[['10K+', 'Followers'], ['2M+', 'Total Views'], ['500+', 'Posts'], ['98%', 'Engagement']].map(([n, l]) => (
                  <div key={l}><div className="social-stat-num">{n}</div><div className="social-stat-label">{l}</div></div>
                ))}
              </div>
            </div>
            <div>
              <div className="ig-mockup">
                <div className="ig-at-sign">@</div>
                <div className="ig-handle">@talha___w202</div>
                <a href="https://www.instagram.com/talha___w202" target="_blank" rel="noreferrer" className="ig-btn">Follow on Instagram</a>
              </div>
            </div>
          </div>
        </section>

        <div className="neon-divider" />

        {/* CONTACT */}
        <section id="contact">
          <div className="section-tag reveal">Get In Touch</div>
          <h2 className="section-h2 reveal">Let's Create Something<br /><span className="gradient-text">Remarkable.</span></h2>
          <div className="contact-grid">
            <div className="contact-info reveal">
              <p>Ready to grow your brand, run smarter ads, or build something the internet won't forget? Whether you have a full brief or just an idea — let's talk.</p>
              <div className="contact-links">
                <a href="https://www.instagram.com/talha___w202" target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-link-icon">IG</div><span>@talha___w202 on Instagram</span>
                </a>
                <a href="mailto:Nikammafilmmaker@gmail.com" className="contact-link">
                  <div className="contact-link-icon">@</div><span>Nikammafilmmaker@gmail.com</span>
                </a>
                <a href="https://wa.me/923167115545" target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-link-icon">WA</div><span>WhatsApp — DM for quick reply</span>
                </a>
              </div>
            </div>
            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <div className="form-group"><input type="text" className="form-input" placeholder="Your Name" /></div>
              <div className="form-group"><input type="email" className="form-input" placeholder="Email Address" /></div>
              <div className="form-group"><input type="text" className="form-input" placeholder="Service Needed (Ads, Shopify, Video, etc.)" /></div>
              <div className="form-group"><textarea className="form-textarea" placeholder="Tell me about your project — the more detail, the better." /></div>
              <button type="submit" className="form-submit" style={formSubmitted ? { background: 'linear-gradient(135deg,#10B981,#22D3EE)', color: '#050505' } : {}}>
                {formSubmitted ? 'Message Sent ✓' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>

        <div className="neon-divider" />
        <footer>
          <div className="footer-logo">TALHA SAEED</div>
          <div className="footer-copy">&copy; 2025 Talha Saeed. Nikamma Film Maker.<br />Crafted in Pakistan.</div>
          <div className="footer-socials">
            <a href="https://www.instagram.com/talha___w202" target="_blank" rel="noreferrer" className="social-icon">IG</a>
            <a href="#" className="social-icon">YT</a>
            <a href="#" className="social-icon">TW</a>
            <a href="#" className="social-icon">LI</a>
          </div>
        </footer>
      </div>

      {/* CHATBOT */}
      <button id="chatbot-btn" onClick={() => setChatOpen(o => !o)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
      <div id="chatbot-popup" className={chatOpen ? 'open' : ''}>
        <div className="chat-header">
          <div className="chat-avatar">T</div>
          <div>
            <div className="chat-name">Talha's Assistant</div>
            <div className="chat-status">Online — Usually replies in 1hr</div>
          </div>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {chatMessages.map((m, i) => (
            <div key={i} className="chat-msg" style={m.from === 'user' ? { alignSelf: 'flex-end', background: 'rgba(59,130,246,.2)', borderRadius: '12px 12px 0 12px' } : {}}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="chat-input-row">
          <input
            type="text" className="chat-input" placeholder="Type a message..."
            value={chatInput} onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendChat()}
          />
          <button className="chat-send" onClick={sendChat}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
      </div>
    </>
  );
}
