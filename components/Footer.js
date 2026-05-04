'use client';

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

function VeloxaiLogo() {
  return (
    <svg
      viewBox="0 0 120 32"
      width={110}
      height={30}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Veloxai"
    >
      <path
        d="M8 4 L14 16 L10 16 L16 28 L22 16 L18 16 L24 4"
        fill="none"
        stroke="#00D4FF"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 3px rgba(0,212,255,0.6))' }}
      />
      <path
        d="M6 4 L12 16 L8 16 L14 28"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <text x="30" y="22" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="18" fill="white">
        Velox
      </text>
      <text x="80" y="22" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="18" fill="#00D4FF">
        AI
      </text>
    </svg>
  );
}

export default function Footer() {
  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ position: 'relative', paddingTop: 1 }}>
      {/* Top glow line */}
      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.5) 40%, rgba(124,58,237,0.4) 60%, transparent 100%)',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '48px 24px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 40,
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          {/* Left: Logo + tagline */}
          <div style={{ flex: '1 1 220px' }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ display: 'inline-block', textDecoration: 'none', marginBottom: 10 }}
            >
              <VeloxaiLogo />
            </a>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13.5,
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth: 260,
              }}
            >
              AI-Powered Business Systems.
              <br />
              Built Fast. Owned Forever.
            </p>
          </div>

          {/* Center: Links */}
          <div
            style={{
              flex: '0 0 auto',
              display: 'flex',
              gap: 32,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--text-secondary)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: 20,
            paddingBottom: 28,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-muted)' }}>
            © 2025 Veloxai. Built with AI. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-muted)' }}>
            <a
              href="mailto:hello@veloxai.tech"
              style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--cyan)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
            >
              hello@veloxai.tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
