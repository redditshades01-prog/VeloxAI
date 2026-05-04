'use client';

import { motion } from 'framer-motion';

const techBadges = [
  { label: 'Next.js', color: '#fff' },
  { label: 'Supabase', color: '#3ECF8E' },
  { label: 'Vercel', color: '#fff' },
  { label: 'HuggingFace', color: '#FFD21E' },
  { label: 'Claude AI', color: '#CC785C' },
  { label: 'Tailwind', color: '#38BDF8' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const codeSnippet = `// veloxai-chatbot.js
import { VeloxAI } from '@veloxai/sdk';

const bot = new VeloxAI({
  business: 'EduPeak Institute',
  tone: 'friendly',
  goals: ['qualify_leads', 'answer_faqs'],
});

// Handles 1000+ queries/day
const response = await bot.chat({
  message: userInput,
  context: businessData,
});

// Auto-qualify & notify your CRM
if (response.isLead) {
  await bot.notifyCRM(response.data);
}`;

export default function Hero() {
  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 88,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '60px 24px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 48,
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left: Text */}
        <div style={{ maxWidth: 680 }}>
          {/* Label */}
          <motion.div {...fadeUp(0.05)} className="section-label" style={{ marginBottom: 20 }}>
            <span className="pulse-dot" />
            AI Development Agency · Based in India
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.15)}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 6vw, 72px)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: 24,
            }}
          >
            We Build{' '}
            <span
              style={{
                color: 'var(--cyan)',
                textShadow: '0 0 30px rgba(0,212,255,0.4)',
              }}
            >
              AI-Powered
            </span>
            <br />
            Business Systems
          </motion.h1>

          {/* Subheading */}
          <motion.p
            {...fadeUp(0.25)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: 36,
              maxWidth: 560,
              fontWeight: 400,
            }}
          >
            Custom websites, chatbots &amp; automations — delivered in days,
            owned by you forever.{' '}
            <span style={{ color: 'rgba(240,240,255,0.6)' }}>
              No monthly fees. No lock-in.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.35)}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}
          >
            <button
              onClick={() => handleScroll('#demo-chatbot')}
              className="btn-cyan"
              style={{ padding: '14px 28px', fontSize: 15 }}
            >
              See Live Demos ↓
            </button>
            <button
              onClick={() => handleScroll('#pricing')}
              className="btn-ghost"
              style={{ padding: '14px 28px', fontSize: 15 }}
            >
              View Pricing
            </button>
          </motion.div>

          {/* Trust Bar */}
          <motion.div {...fadeUp(0.45)}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 14,
              }}
            >
              Built With
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              {techBadges.map((badge) => (
                <span
                  key={badge.label}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: badge.color,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 6,
                    padding: '5px 12px',
                    letterSpacing: '0.02em',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = `rgba(0, 212, 255, 0.3)`;
                    e.target.style.background = 'rgba(0, 212, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.target.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Code Card (desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="code-card-desktop"
          style={{
            width: 360,
            flexShrink: 0,
            position: 'relative',
          }}
        >
          {/* Glow behind card */}
          <div
            style={{
              position: 'absolute',
              inset: -20,
              background: 'radial-gradient(circle at center, rgba(0,212,255,0.08) 0%, transparent 70%)',
              borderRadius: 24,
              zIndex: 0,
            }}
          />
          <div className="code-block" style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div className="code-header">
              <span className="code-dot" style={{ background: '#FF5F57' }} />
              <span className="code-dot" style={{ background: '#FEBC2E' }} />
              <span className="code-dot" style={{ background: '#28C840' }} />
              <span
                style={{
                  marginLeft: 8,
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: '#8888AA',
                }}
              >
                veloxai-chatbot.js
              </span>
            </div>
            {/* Code */}
            <pre
              style={{
                padding: '20px',
                overflowX: 'auto',
                fontSize: 12,
                lineHeight: 1.75,
              }}
            >
              {codeSnippet.split('\n').map((line, i) => (
                <div key={i}>
                  <span style={{ color: '#444' }}>{String(i + 1).padStart(2, ' ')} </span>
                  <CodeLine line={line} />
                </div>
              ))}
            </pre>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: -18,
              right: -12,
              background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
              borderRadius: 10,
              padding: '8px 14px',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 700,
              color: '#fff',
              boxShadow: '0 4px 20px rgba(0,212,255,0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            ✦ Live in 7 days
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .code-card-desktop { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function CodeLine({ line }) {
  if (line.startsWith('//')) {
    return <span style={{ color: '#6A9955' }}>{line}</span>;
  }
  return (
    <span>
      {line
        .replace(/(import|const|await|if|async|from)/g, '\x00KEYWORD\x00$1\x00END\x00')
        .replace(/('[^']*')/g, '\x00STRING\x00$1\x00END\x00')
        .replace(/(\/\/.+)/g, '\x00COMMENT\x00$1\x00END\x00')
        .split('\x00')
        .map((part, i) => {
          if (i === 0 || part === '') return part;
          const prev = line.split('\x00')[i - 1];
          if (prev === 'KEYWORD') return <span key={i} style={{ color: '#C586C0' }}>{part}</span>;
          if (prev === 'STRING') return <span key={i} style={{ color: '#CE9178' }}>{part}</span>;
          if (prev === 'COMMENT') return <span key={i} style={{ color: '#6A9955' }}>{part}</span>;
          if (part === 'END') return null;
          return <span key={i} style={{ color: '#D4D4D4' }}>{part}</span>;
        })}
    </span>
  );
}
