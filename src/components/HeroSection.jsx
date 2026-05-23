import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

export function HeroSection() {
  return (
    <div id="hero-root" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#020617' }}>

      {/* ── LAMP BACKGROUND ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        {/* Lamp beams */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', isolation: 'isolate', transform: 'scaleY(1.25)', marginTop: '-8rem' }}>

          {/* Left conic beam */}
          <motion.div
            initial={{ opacity: 0.5, width: '15rem' }}
            animate={{ opacity: 1, width: '30rem' }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              right: '50%',
              height: '14rem',
              overflow: 'visible',
              backgroundImage: 'conic-gradient(from 70deg at center top, #06b6d4, transparent, transparent)',
              zIndex: 1,
            }}
          >
            <div style={{ position: 'absolute', width: '100%', left: 0, background: '#020617', height: '10rem', bottom: 0, zIndex: 20, maskImage: 'linear-gradient(to top, white, transparent)' }} />
            <div style={{ position: 'absolute', width: '10rem', height: '100%', left: 0, background: '#020617', bottom: 0, zIndex: 20, maskImage: 'linear-gradient(to right, white, transparent)' }} />
          </motion.div>

          {/* Right conic beam */}
          <motion.div
            initial={{ opacity: 0.5, width: '15rem' }}
            animate={{ opacity: 1, width: '30rem' }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              height: '14rem',
              overflow: 'visible',
              backgroundImage: 'conic-gradient(from 290deg at center top, transparent, transparent, #06b6d4)',
              zIndex: 1,
            }}
          >
            <div style={{ position: 'absolute', width: '10rem', height: '100%', right: 0, background: '#020617', bottom: 0, zIndex: 20, maskImage: 'linear-gradient(to left, white, transparent)' }} />
            <div style={{ position: 'absolute', width: '100%', right: 0, background: '#020617', height: '10rem', bottom: 0, zIndex: 20, maskImage: 'linear-gradient(to top, white, transparent)' }} />
          </motion.div>

          {/* Dark blur fill */}
          <div style={{ position: 'absolute', top: '50%', height: '12rem', width: '100%', transform: 'translateY(3rem) scaleX(1.5)', background: '#020617', filter: 'blur(2rem)', zIndex: 2 }} />
          {/* Frosted layer */}
          <div style={{ position: 'absolute', top: '50%', zIndex: 50, height: '12rem', width: '100%', background: 'transparent', opacity: 0.1, backdropFilter: 'blur(8px)' }} />
          {/* Big cyan glow orb */}
          <div style={{ position: 'absolute', zIndex: 50, height: '9rem', width: '28rem', transform: 'translateY(-50%)', borderRadius: '9999px', background: 'rgba(6,182,212,0.5)', filter: 'blur(3rem)' }} />
          {/* Tight cyan blur bar */}
          <motion.div
            initial={{ width: '8rem' }}
            animate={{ width: '16rem' }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            style={{ position: 'absolute', zIndex: 30, height: '9rem', transform: 'translateY(-6rem)', borderRadius: '9999px', background: '#22d3ee', filter: 'blur(1.5rem)' }}
          />
          {/* Bright cyan line */}
          <motion.div
            initial={{ width: '15rem' }}
            animate={{ width: '30rem' }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            style={{ position: 'absolute', zIndex: 50, height: '2px', transform: 'translateY(-7rem)', background: '#67e8f9' }}
          />
          {/* Dark mask below lamp */}
          <div style={{ position: 'absolute', zIndex: 40, height: '11rem', width: '100%', transform: 'translateY(-12.5rem)', background: '#020617' }} />
        </div>
      </div>

      {/* ── STARS ── */}
      <StarField />

      {/* ── MAIN HERO CONTENT ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0' }}>

        {/* PFP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22,1,0.36,1] }}
          style={{ position: 'relative', marginBottom: '2rem' }}
        >
          {/* Glow ring behind pfp */}
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,.25) 0%, transparent 70%)', pointerEvents: 'none' }}
          />
          {/* Arc ring */}
          <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', border: '1px solid rgba(34,211,238,.3)', pointerEvents: 'none' }} />
          {/* PFP image */}
          <motion.img
            src="/talha.jpg"
            alt="Talha"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              width: 'clamp(140px, 16vw, 220px)',
              height: 'clamp(140px, 16vw, 220px)',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center top',
              filter: 'contrast(1.08) brightness(0.92)',
              boxShadow: '0 0 0 2px rgba(34,211,238,.4)',
              display: 'block',
            }}
            onError={e => { e.target.src = 'https://placehold.co/220x220/22D3EE/050505?text=T'; }}
          />
          {/* Floating dots */}
          <motion.div animate={{ y: [0,-10,0], opacity:[0.4,1,0.4] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut', delay:2.2 }}
            style={{ position:'absolute', top:'10%', right:'-5%', width:8, height:8, borderRadius:'50%', background:'#22D3EE', boxShadow:'0 0 14px #22D3EE' }} />
          <motion.div animate={{ y: [0,8,0], opacity:[0.2,0.7,0.2] }} transition={{ duration:4.5, repeat:Infinity, ease:'easeInOut', delay:2.8 }}
            style={{ position:'absolute', bottom:'15%', left:'-8%', width:5, height:5, borderRadius:'50%', background:'#3B82F6', boxShadow:'0 0 10px #3B82F6' }} />
        </motion.div>

        {/* Big heading */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: 'easeInOut' }}
          style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(3.5rem,9vw,9rem)', lineHeight: .88, textAlign: 'center', color: '#F8FAFC', margin: 0, letterSpacing: '-.01em' }}
        >
          <span style={{ background: 'linear-gradient(to bottom right, #cbd5e1, #64748b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CREATE</span>
          <br />
          <span style={{ background: 'linear-gradient(to bottom right, #cbd5e1, #64748b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>IMPACT.</span>
          <span style={{ color: '#22D3EE', textShadow: '0 0 40px rgba(34,211,238,.6)', WebkitTextFillColor: '#22D3EE' }}>▪</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: 'easeInOut' }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(.75rem,1.5vw,.9rem)', color: 'rgba(209,213,219,.6)', textAlign: 'center', marginTop: '1.2rem', letterSpacing: '.04em', maxWidth: 420 }}
        >
          Creative editor, digital strategist, and visual storyteller crafting content that moves people and builds brands.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a href="#portfolio" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '.75rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'linear-gradient(135deg,#3B82F6,#22D3EE)', color: '#050505', padding: '.7rem 2rem', borderRadius: '100px', textDecoration: 'none', fontWeight: 700 }}>View Work</a>
          <a href="#contact" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '.75rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#22D3EE', padding: '.7rem 2rem', borderRadius: '100px', textDecoration: 'none', border: '1px solid rgba(34,211,238,.35)' }}>Let's Talk</a>
        </motion.div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100, padding: '1.5rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '1.2rem' }}>
          {[
            { href:'https://instagram.com', Icon: Instagram },
            { href:'https://youtube.com', Icon: Youtube },
            { href:'https://twitter.com', Icon: Twitter },
            { href:'https://linkedin.com', Icon: Linkedin },
          ].map(({ href, Icon }, i) => (
            <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: 1.4 + i*0.08 }}
              style={{ color: 'rgba(209,213,219,.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'color .3s' }}
              onMouseEnter={e => e.currentTarget.style.color='#22D3EE'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(209,213,219,.4)'}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
        <motion.span
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.7 }}
          style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'.7rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(209,213,219,.4)' }}
        >Pakistan</motion.span>
      </div>
    </div>
  );
}

function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    delay: Math.random() * 4,
  }));
  return (
    <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }}>
      {stars.map(s => (
        <motion.div key={s.id}
          animate={{ opacity: [s.opacity, s.opacity * 2.5, s.opacity] }}
          transition={{ duration: 2 + Math.random()*3, repeat: Infinity, delay: s.delay, ease:'easeInOut' }}
          style={{ position:'absolute', left:`${s.x}%`, top:`${s.y}%`, width:s.size, height:s.size, borderRadius:'50%', background:'white' }}
        />
      ))}
    </div>
  );
}
