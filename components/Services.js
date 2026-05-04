'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Static Business Website',
    desc: 'A fast, modern, SEO-ready website that represents your brand 24/7. Built with Next.js for blazing performance and top search rankings.',
    tag: 'From ₹10,000',
    tabIndex: 0,
    delay: 0,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'AI Chatbot Integration',
    desc: 'A smart chatbot trained on your business that qualifies leads and answers questions automatically. Works 24/7 without human intervention.',
    tag: 'Included from ₹25,000',
    tabIndex: 1,
    delay: 0.1,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Business Automations',
    desc: 'Connect your forms, CRM, WhatsApp, email and Google Sheets — zero manual work. Let AI handle repetitive tasks while you focus on growth.',
    tag: 'Included from ₹55,000',
    tabIndex: 2,
    delay: 0.2,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
        <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Custom AI Web App',
    desc: 'Full-stack AI-powered applications tailored to your exact workflow. From dashboards to SaaS tools — built to scale with your business.',
    tag: 'From ₹1,00,000',
    tabIndex: 3,
    delay: 0.3,
  },
];

function handleDemoClick(tabIndex) {
  // Set URL param
  const url = new URL(window.location.href);
  url.searchParams.set('demo', tabIndex);
  window.history.replaceState({}, '', url.toString());

  // Dispatch event to DemosSection to switch tab
  window.dispatchEvent(
    new CustomEvent('veloxai:setDemoTab', { detail: { tab: tabIndex } })
  );

  // Scroll to demos section
  const el = document.getElementById('demos');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="section" ref={ref} style={{ position: 'relative' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>
            <span className="pulse-dot" />
            What I Build
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Everything Your Business Needs
            <br />
            <span style={{ color: 'var(--cyan)' }}>to Compete With AI</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              fontSize: 17,
              maxWidth: 500,
              margin: '0 auto',
            }}
          >
            Four tiers, one agency, zero fluff. Click any demo to see it live.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
          }}
          className="services-grid"
        >
          {services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} inView={inView} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 720px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ svc, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: svc.delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="service-card"
      style={{
        background: 'rgba(15, 15, 28, 0.7)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
        borderRadius: 18,
        padding: '28px 28px 22px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -40,
          left: -40,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      <div
        className="service-icon"
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--cyan)',
          marginBottom: 20,
          transition: 'all 0.25s ease',
          flexShrink: 0,
        }}
      >
        {svc.icon}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 20,
          color: 'var(--text-primary)',
          marginBottom: 10,
          letterSpacing: '-0.02em',
        }}
      >
        {svc.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14.5,
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          marginBottom: 20,
          flex: 1,
        }}
      >
        {svc.desc}
      </p>

      <span
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          fontWeight: 700,
          color: 'var(--cyan)',
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: 6,
          padding: '4px 12px',
          letterSpacing: '0.02em',
          marginBottom: 16,
          alignSelf: 'flex-start',
        }}
      >
        {svc.tag}
      </span>

      {/* Demo button */}
      <button
        onClick={() => handleDemoClick(svc.tabIndex)}
        className="demo-btn"
        style={{
          background: 'transparent',
          border: 'none',
          padding: '0',
          fontFamily: 'var(--font-body)',
          fontSize: 13.5,
          fontWeight: 600,
          color: 'var(--cyan)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          transition: 'gap 0.2s ease',
          alignSelf: 'flex-start',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          textDecorationColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecorationColor = 'rgba(0,212,255,0.5)';
          const arrow = e.currentTarget.querySelector('.arrow');
          if (arrow) arrow.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecorationColor = 'transparent';
          const arrow = e.currentTarget.querySelector('.arrow');
          if (arrow) arrow.style.transform = 'translateX(0)';
        }}
      >
        Try Live Demo
        <span
          className="arrow"
          style={{ display: 'inline-block', transition: 'transform 0.2s ease' }}
        >
          →
        </span>
      </button>

      <style jsx global>{`
        .service-card:hover .service-icon {
          background: rgba(0,212,255,0.15) !important;
          box-shadow: 0 0 20px rgba(0,212,255,0.2) !important;
        }
        .service-card:hover {
          border-color: rgba(0,212,255,0.25) !important;
          box-shadow: 0 8px 32px rgba(0,212,255,0.08) !important;
        }
      `}</style>
    </motion.div>
  );
}
