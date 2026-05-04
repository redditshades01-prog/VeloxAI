'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

function VeloxaiLogo({ width = 120, height = 32 }) {
  return (
    <svg
      viewBox="0 0 120 32"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Veloxai"
    >
      {/* Bolt icon: primary */}
      <path
        d="M8 4 L14 16 L10 16 L16 28 L22 16 L18 16 L24 4"
        fill="none"
        stroke="#00D4FF"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.7))' }}
      />
      {/* Bolt icon: secondary violet shadow */}
      <path
        d="M6 4 L12 16 L8 16 L14 28"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.6"
      />
      {/* Wordmark */}
      <text
        x="30"
        y="22"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="18"
        fill="white"
      >
        Velox
      </text>
      <text
        x="80"
        y="22"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="18"
        fill="#00D4FF"
      >
        AI
      </text>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(10, 10, 15, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(0, 212, 255, 0.08)'
            : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            aria-label="Veloxai home"
          >
            <VeloxaiLogo width={120} height={32} />
          </a>

          {/* Desktop Links */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 32 }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--cyan)',
                textDecoration: 'none',
                border: '1px solid rgba(0, 212, 255, 0.4)',
                borderRadius: 8,
                padding: '8px 18px',
                transition: 'all 0.2s ease',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 212, 255, 0.1)';
                e.target.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                e.target.style.borderColor = 'rgba(0, 212, 255, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)';
              }}
            >
              Get a Free Quote
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="hamburger-btn"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  background: menuOpen ? 'var(--cyan)' : 'var(--text-primary)',
                  borderRadius: 2,
                  transition: 'all 0.25s ease',
                  transform:
                    i === 0 && menuOpen
                      ? 'rotate(45deg) translate(5px, 5px)'
                      : i === 2 && menuOpen
                      ? 'rotate(-45deg) translate(5px, -5px)'
                      : 'none',
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="mobile-menu"
            style={{
              position: 'fixed',
              top: 68,
              left: 0,
              right: 0,
              zIndex: 999,
              background: 'rgba(10, 10, 20, 0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
              padding: '16px 24px 24px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '13px 0',
                  borderBottom: '1px solid var(--border)',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              style={{
                display: 'block',
                marginTop: 16,
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                fontWeight: 600,
                color: '#000',
                textDecoration: 'none',
                background: 'var(--cyan)',
                borderRadius: 8,
                padding: '12px 18px',
                textAlign: 'center',
              }}
            >
              Get a Free Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
