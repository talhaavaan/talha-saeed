import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const NavLink = ({ href, children, delay }) => (
  <motion.a
    href={href}
    className="nav-link-mini"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.a>
);

const SocialIcon = ({ href, icon: Icon, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-mini-icon"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.2, color: '#22D3EE' }}
  >
    <Icon size={18} />
  </motion.a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}) => {
  const containerRef = useRef(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const imgX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const imgY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const circleX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const circleY = useTransform(springY, [-0.5, 0.5], [6, -6]);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className={`minimalist-hero-wrap ${className || ''}`}>

      {/* Header */}
      <header className="mh-header">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mh-logo"
        >
          {logoText}
        </motion.div>

        <div className="mh-nav">
          {navLinks.map((link, i) => (
            <NavLink key={link.label} href={link.href} delay={0.1 + i * 0.07}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mh-hamburger"
          aria-label="Open menu"
        >
          <span /><span /><span />
        </motion.button>
      </header>

      {/* Main content */}
      <div className="mh-content">

        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mh-left"
        >
          <p className="mh-main-text">{mainText}</p>
          <motion.a
            href={readMoreLink}
            className="mh-read-more"
            whileHover={{ letterSpacing: '0.18em' }}
            transition={{ duration: 0.3 }}
          >
            Read More
          </motion.a>
        </motion.div>

        {/* Center — photo with animations */}
        <div className="mh-center">

          {/* Outer glow ring — slow pulse */}
          <motion.div
            className="mh-glow-ring"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.15, 0.28, 0.15],
            }}
            transition={{
              scale: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 },
              opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 },
            }}
          />

          {/* Circle bg — parallax + entrance */}
          <motion.div
            className="mh-circle"
            style={{ x: circleX, y: circleY }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Decorative arc */}
          <motion.svg
            className="mh-arc"
            viewBox="0 0 300 300"
            fill="none"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.circle
              cx="150" cy="150" r="140"
              stroke="url(#arcGrad)" strokeWidth="1"
              strokeDasharray="880"
              initial={{ strokeDashoffset: 880 }}
              animate={{ strokeDashoffset: 220 }}
              transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="arcGrad" x1="0" y1="0" x2="300" y2="300" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Photo — cinematic entrance + float + parallax */}
          <motion.div
            className="mh-photo-wrap"
            style={{ x: imgX, y: imgY }}
            initial={{ opacity: 0, y: 80, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Subtle continuous float */}
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className="mh-portrait"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x600/22D3EE/050505?text=TALHA';
              }}
            />
            {/* Bottom fade not needed for circle */}
          </motion.div>

          {/* Floating dot accents */}
          <motion.div
            className="mh-dot mh-dot-1"
            animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
          />
          <motion.div
            className="mh-dot mh-dot-2"
            animate={{ y: [0, 10, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2.8 }}
          />
        </div>

        {/* Right big text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mh-right"
        >
          <h1 className="mh-big-text">
            {overlayText.part1.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.5 + i * 0.04 }}
                style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
            <br />
            {overlayText.part2.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.7 + i * 0.05 }}
                style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
                className={i === overlayText.part2.length - 1 ? 'mh-text-glow' : ''}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </h1>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mh-footer">
        <div className="mh-socials">
          {socialLinks.map((link, i) => (
            <SocialIcon key={i} href={link.href} icon={link.icon} delay={1.6 + i * 0.08} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="mh-location"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
