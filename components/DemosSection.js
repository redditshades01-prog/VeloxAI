'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrowserMockup from '../components/ui/BrowserMockup';
import StaticWebsiteDemo from '../components/demos/StaticWebsiteDemo';
import ChatbotDemo from '../components/demos/ChatbotDemo';
import AutomationsDemo from '../components/demos/AutomationsDemo';
import AIWebAppDemo from '../components/demos/AIWebAppDemo';

const TABS = [
  {
    index: 0,
    emoji: '🌐',
    label: 'Static Website',
    url: 'veloxai.tech/demo/static-website',
    deliveryNote: '⚡ A site like this: 3–5 day delivery · ₹10,000 one-time',
    ctaLabel: 'Get This For My Business →',
    ctaService: 'basic',
    ctaParam: 'Static Website (₹10,000)',
  },
  {
    index: 1,
    emoji: '🤖',
    label: 'AI Chatbot',
    url: 'veloxai.tech/demo/ai-chatbot',
    deliveryNote: '⚡ A chatbot like this: 7 day delivery · included from ₹25,000',
    ctaLabel: 'Add This To My Site →',
    ctaService: 'starter',
    ctaParam: 'AI-Powered Website (₹25,000)',
  },
  {
    index: 2,
    emoji: '⚡',
    label: 'Automations',
    url: 'veloxai.tech/demo/automations',
    deliveryNote: '⚡ 3 custom automations: included from ₹55,000',
    ctaLabel: 'Automate My Business →',
    ctaService: 'growth',
    ctaParam: 'AI Business System (₹55,000)',
  },
  {
    index: 3,
    emoji: '🧠',
    label: 'AI Web App',
    url: 'veloxai.tech/demo/ai-webapp',
    deliveryNote: '⚡ Custom AI tools like this: from ₹1,00,000',
    ctaLabel: 'Build My AI App →',
    ctaService: 'pro',
    ctaParam: 'Custom AI App (₹1,00,000+)',
  },
];

const MOBILE_DEMO_PATHS = [
  '/demo/static',
  '/demo/chatbot',
  '/demo/automations',
  '/demo/webapp',
];

export default function DemosSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Read ?demo= URL param to set active tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demoParam = params.get('demo');
    if (demoParam !== null) {
      const idx = parseInt(demoParam, 10);
      if (!isNaN(idx) && idx >= 0 && idx <= 3) {
        setActiveTab(idx);
      }
    }
  }, []);

  // Listen for custom event from service card buttons
  useEffect(() => {
    const handler = (e) => {
      if (typeof e.detail?.tab === 'number') {
        setActiveTab(e.detail.tab);
      }
    };
    window.addEventListener('veloxai:setDemoTab', handler);
    return () => window.removeEventListener('veloxai:setDemoTab', handler);
  }, []);

  const handleTabClick = (idx) => {
    setActiveTab(idx);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('demo', idx);
    window.history.replaceState({}, '', url.toString());
  };

  const handleCTA = useCallback((tab) => {
    // Set URL param for contact form pre-selection
    const url = new URL(window.location.href);
    url.searchParams.set('service', tab.ctaService);
    window.history.replaceState({}, '', url.toString());

    // Scroll to contact
    const contact = document.querySelector('#contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
      // Dispatch event for ContactForm to pick up
      window.dispatchEvent(
        new CustomEvent('veloxai:setService', { detail: { value: tab.ctaParam } })
      );
    }
  }, []);

  const handleStaticCTA = useCallback(() => handleCTA(TABS[0]), [handleCTA]);

  const activeTabData = TABS[activeTab];

  return (
    <section
      id="demos"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '100px 0 80px',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div
            className="section-label"
            style={{ justifyContent: 'center', marginBottom: 16 }}
          >
            <span className="pulse-dot" />
            Live Demos
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              marginBottom: 14,
            }}
          >
            See It Live.{' '}
            <span style={{ color: 'var(--cyan)' }}>Before You Buy.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              fontSize: 16,
              maxWidth: 460,
              margin: '0 auto',
            }}
          >
            Click any demo. Every feature shown here can be built for your business.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: 24 }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14,
              padding: 6,
            }}
            className="tab-switcher"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.index;
              return (
                <button
                  key={tab.index}
                  onClick={() => handleTabClick(tab.index)}
                  style={{
                    position: 'relative',
                    background: isActive ? 'var(--cyan)' : 'transparent',
                    border: 'none',
                    borderRadius: 9,
                    padding: '10px 12px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 13.5,
                    color: isActive ? '#000' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 7,
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 2px 16px rgba(0,212,255,0.4)' : 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                      e.currentTarget.style.border = '1px solid rgba(0,212,255,0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.border = 'none';
                    }
                  }}
                >
                  <span>{tab.emoji}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Demo content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Desktop: browser mockup */}
            <div className="browser-wrapper">
              <BrowserMockup url={activeTabData.url}>
                {activeTab === 0 && <StaticWebsiteDemo onCTA={handleStaticCTA} />}
                {activeTab === 1 && <ChatbotDemo />}
                {activeTab === 2 && <AutomationsDemo />}
                {activeTab === 3 && <AIWebAppDemo />}
              </BrowserMockup>
            </div>

            {/* Mobile: open in full screen buttons */}
            <div className="mobile-demo-buttons">
              {TABS.map((tab) => (
                <a
                  key={tab.index}
                  href={MOBILE_DEMO_PATHS[tab.index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: activeTab === tab.index ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.03)',
                    border: activeTab === tab.index ? '1px solid rgba(0,212,255,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12,
                    color: activeTab === tab.index ? 'var(--cyan)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 14,
                    transition: 'all 0.2s',
                    marginBottom: 8,
                  }}
                >
                  <span>
                    {tab.emoji} Open {tab.label} Demo
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Below-mockup strip: delivery + CTA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                marginTop: 16,
                padding: '14px 20px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 12,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13.5,
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}
              >
                {activeTabData.deliveryNote}
              </span>
              <button
                onClick={() => handleCTA(activeTabData)}
                style={{
                  background: 'var(--cyan)',
                  color: '#000',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 20px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#33DDFF';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--cyan)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {activeTabData.ctaLabel}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .tab-switcher { grid-template-columns: repeat(2, 1fr) !important; }
          .tab-label { font-size: 12px !important; }
          .browser-wrapper { display: none !important; }
          .mobile-demo-buttons { display: block !important; }
        }
        @media (min-width: 769px) {
          .browser-wrapper { display: block !important; }
          .mobile-demo-buttons { display: none !important; }
        }
        .mobile-demo-buttons { display: none; }
      `}</style>
    </section>
  );
}
