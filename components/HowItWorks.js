'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Discovery',
    timeline: 'Day 1',
    desc: 'You fill out a short project brief. We hop on a 15-minute call to confirm scope, timeline, and exactly what you need.',
  },
  {
    number: '02',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'I Build It',
    timeline: 'Days 2–21',
    desc: 'I build your complete system using cutting-edge AI tools and modern tech. You get regular progress updates. No surprises.',
  },
  {
    number: '03',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'You Own It',
    timeline: 'Delivery Day',
    desc: 'Everything is deployed to YOUR accounts. You get full source code and ownership. We part ways — unless you want more.',
  },
];

// Desktop sticky scroll version
function StickyHowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Each step occupies 1/3 of the scroll range
  // step 0: 0 – 0.33, step 1: 0.33 – 0.66, step 2: 0.66 – 1.0
  const step0Opacity = useTransform(scrollYProgress, [0, 0.1, 0.28, 0.38], [0, 1, 1, 0.4]);
  const step1Opacity = useTransform(scrollYProgress, [0.28, 0.38, 0.6, 0.7], [0.3, 1, 1, 0.4]);
  const step2Opacity = useTransform(scrollYProgress, [0.6, 0.7, 1.0], [0.3, 1, 1]);

  const step0Y = useTransform(scrollYProgress, [0, 0.15], [30, 0]);
  const step1Y = useTransform(scrollYProgress, [0.28, 0.42], [30, 0]);
  const step2Y = useTransform(scrollYProgress, [0.6, 0.74], [30, 0]);

  const step0Active = useTransform(scrollYProgress, [0, 0.32], [0, 1]);
  const step1Active = useTransform(scrollYProgress, [0.32, 0.66], [0, 1]);
  const step2Active = useTransform(scrollYProgress, [0.66, 1.0], [0, 1]);

  const stepOpacities = [step0Opacity, step1Opacity, step2Opacity];
  const stepYs = [step0Y, step1Y, step2Y];
  const stepActives = [step0Active, step1Active, step2Active];

  return (
    <section id="how-it-works" style={{ position: 'relative' }}>
      {/* Tall scroll container — 300vh gives scroll room */}
      <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
        {/* Sticky panel */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 24px',
          }}
        >
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>
              <span className="pulse-dot" />
              Process
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(26px, 4vw, 48px)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
              }}
            >
              Simple Process.{' '}
              <span style={{ color: 'var(--cyan)' }}>Zero Confusion.</span>
            </h2>
          </div>

          {/* Steps row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 0,
              maxWidth: 900,
              width: '100%',
            }}
          >
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                <motion.div
                  style={{ opacity: stepOpacities[i], y: stepYs[i], flex: 1, padding: '0 20px' }}
                >
                  {/* Icon + number */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <motion.div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: stepActives[i].get() > 0.5
                          ? 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.1))'
                          : 'rgba(255,255,255,0.04)',
                        border: stepActives[i].get() > 0.5
                          ? '1px solid rgba(0,212,255,0.3)'
                          : '1px solid rgba(255,255,255,0.08)',
                        color: 'var(--cyan)',
                      }}
                    >
                      {step.icon}
                    </motion.div>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: 42,
                        color: 'rgba(255,255,255,0.04)',
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--cyan)',
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.15)',
                      borderRadius: 5,
                      padding: '3px 10px',
                      marginBottom: 12,
                    }}
                  >
                    {step.timeline}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: 22,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      marginBottom: 10,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14.5,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                    }}
                  >
                    {step.desc}
                  </p>
                </motion.div>

                {i < steps.length - 1 && (
                  <div
                    style={{
                      height: 2,
                      width: 60,
                      background: 'linear-gradient(90deg, var(--cyan), var(--violet))',
                      opacity: 0.3,
                      marginTop: 28,
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Callout */}
          <div
            style={{
              textAlign: 'center',
              marginTop: 56,
              padding: '22px 28px',
              background: 'rgba(0,212,255,0.04)',
              border: '1px solid rgba(0,212,255,0.12)',
              borderRadius: 16,
              maxWidth: 700,
              width: '100%',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(15px, 2.5vw, 20px)',
                color: 'var(--cyan)',
                letterSpacing: '-0.01em',
              }}
            >
              No monthly fees. No hosting lock-in. No dependency on me.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mobile version — standard stacked layout
function MobileHowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="how-it-works" ref={ref} className="section" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>
            <span className="pulse-dot" />
            Process
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(26px, 4vw, 48px)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
            }}
          >
            Simple Process.{' '}
            <span style={{ color: 'var(--cyan)' }}>Zero Confusion.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                background: 'rgba(15,15,28,0.6)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    background: 'rgba(0,212,255,0.1)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--cyan)',
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: 36,
                    color: 'rgba(255,255,255,0.05)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {step.number}
                </span>
              </div>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--cyan)',
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.15)',
                  borderRadius: 5,
                  padding: '3px 10px',
                  marginBottom: 10,
                }}
              >
                {step.timeline}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 20,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: 8,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14.5,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            textAlign: 'center',
            marginTop: 40,
            padding: '22px',
            background: 'rgba(0,212,255,0.04)',
            border: '1px solid rgba(0,212,255,0.12)',
            borderRadius: 16,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 16,
              color: 'var(--cyan)',
            }}
          >
            No monthly fees. No hosting lock-in. No dependency on me.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MobileHowItWorks /> : <StickyHowItWorks />;
}
