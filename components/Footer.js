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

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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

          {/* Right: Social icons */}
          <div style={{ flex: '0 0 auto', display: 'flex', gap: 10, alignItems: 'center' }}>
            {[
              { href: 'https://github.com', icon: <GithubIcon />, label: 'GitHub' },
              { href: 'https://linkedin.com', icon: <LinkedinIcon />, label: 'LinkedIn' },
              { href: 'https://wa.me/919XXXXXXXXX', icon: <WhatsappIcon />, label: 'WhatsApp' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                  e.currentTarget.style.color = 'var(--cyan)';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                {social.icon}
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
