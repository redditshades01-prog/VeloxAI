'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const plans = [
  {
    name: 'Basic',
    price: '₹10,000',
    desc: 'Static Business Website',
    delivery: '3–5 days',
    popular: false,
    features: [
      { text: 'Up to 5 pages', included: true },
      { text: 'Mobile responsive', included: true },
      { text: 'Contact form', included: true },
      { text: 'Deployed to your domain', included: true },
      { text: 'SEO basics', included: true },
      { text: 'AI features', included: false },
    ],
    cta: 'Get Started',
    ctaHref: '#contact',
  },
  {
    name: 'Starter',
    price: '₹25,000',
    desc: 'AI-Powered Website',
    delivery: '7 days',
    popular: false,
    features: [
      { text: 'Everything in Basic', included: true },
      { text: 'AI FAQ Chatbot', included: true },
      { text: '1 automation (form → WhatsApp/email)', included: true },
      { text: 'Admin dashboard (basic)', included: true },
      { text: '1 week post-delivery support', included: true },
    ],
    cta: 'Get Started',
    ctaHref: '#contact',
  },
  {
    name: 'Growth',
    price: '₹55,000',
    desc: 'AI Business System',
    delivery: '14 days',
    popular: true,
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'AI Lead Qualification Bot', included: true },
      { text: '3 custom automations', included: true },
      { text: 'CRM-style admin dashboard', included: true },
      { text: 'Google Sheets / Notion integration', included: true },
      { text: '2 week post-delivery support', included: true },
    ],
    cta: 'Get Started',
    ctaHref: '#contact',
  },
  {
    name: 'Pro',
    price: '₹1,00,000+',
    desc: 'Custom AI Web Application',
    delivery: '21–30 days',
    popular: false,
    features: [
      { text: 'Full-stack custom web app', included: true },
      { text: 'Multiple AI features', included: true },
      { text: 'User authentication', included: true },
      { text: 'Database + API integrations', included: true },
      { text: 'Full documentation', included: true },
      { text: '3 week post-delivery support', included: true },
    ],
    cta: "Let's Talk",
    ctaHref: '#contact',
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" ref={ref} className="section grid-bg" style={{ position: 'relative' }}>
      <div className="container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>
            <span className="pulse-dot" />
            Pricing
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(26px, 4vw, 48px)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}
          >
            Clear Pricing.{' '}
            <span style={{ color: 'var(--cyan)' }}>No Surprises.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              fontSize: 16,
            }}
          >
            One-time payment. Delivered. Done.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            alignItems: 'start',
          }}
          className="pricing-grid"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: plan.popular
                  ? 'linear-gradient(160deg, rgba(0,212,255,0.08), rgba(124,58,237,0.06))'
                  : 'rgba(14, 14, 26, 0.8)',
                border: plan.popular
                  ? '1px solid rgba(0,212,255,0.35)'
                  : '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                borderRadius: 18,
                padding: '28px 22px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: plan.popular ? '0 0 40px rgba(0,212,255,0.1)' : 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              whileHover={{ y: -4, boxShadow: plan.popular ? '0 8px 48px rgba(0,212,255,0.2)' : '0 8px 24px rgba(0,0,0,0.3)' }}
              className="pricing-card"
            >
              {/* Top glow for popular */}
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                  }}
                />
              )}

              {/* Popular badge */}
              {plan.popular && (
                <div style={{ marginBottom: 12 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#000',
                      background: 'var(--cyan)',
                      borderRadius: 5,
                      padding: '3px 10px',
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: plan.popular ? 'var(--cyan)' : 'var(--text-muted)',
                  marginBottom: 6,
                }}
              >
                {plan.name}
              </div>

              {/* Price */}
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(22px, 2.5vw, 28px)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                  marginBottom: 4,
                }}
              >
                {plan.price}
              </div>

              {/* Desc */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13.5,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}
              >
                {plan.desc}
              </div>

              {/* Delivery */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Delivered in {plan.delivery}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: plan.popular
                    ? 'rgba(0,212,255,0.15)'
                    : 'rgba(255,255,255,0.05)',
                  marginBottom: 20,
                }}
              />

              {/* Features */}
              <ul style={{ listStyle: 'none', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 9,
                      fontFamily: 'var(--font-body)',
                      fontSize: 13.5,
                      color: f.included ? 'var(--text-secondary)' : 'var(--text-muted)',
                      opacity: f.included ? 1 : 0.5,
                      textDecoration: f.included ? 'none' : 'line-through',
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        flexShrink: 0,
                        marginTop: 2,
                        color: f.included ? '#3ECF8E' : 'var(--text-muted)',
                      }}
                    >
                      {f.included ? (
                        <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      )}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleScroll(plan.ctaHref)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 10,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  background: plan.popular ? 'var(--cyan)' : 'transparent',
                  color: plan.popular ? '#000' : 'var(--text-primary)',
                }}
                onMouseEnter={(e) => {
                  if (plan.popular) {
                    e.target.style.background = '#33DDFF';
                    e.target.style.boxShadow = '0 0 24px rgba(0,212,255,0.5)';
                  } else {
                    e.target.style.borderColor = 'rgba(0,212,255,0.3)';
                    e.target.style.color = 'var(--cyan)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (plan.popular) {
                    e.target.style.background = 'var(--cyan)';
                    e.target.style.boxShadow = 'none';
                  } else {
                    e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.target.style.color = 'var(--text-primary)';
                  }
                }}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: 13.5,
            color: 'var(--text-muted)',
            marginTop: 32,
            lineHeight: 1.7,
          }}
        >
          All prices in INR. USD pricing available for international clients.
          <br />
          Payments via Razorpay / PayPal / Wise.
        </motion.p>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
