'use client';

export default function StaticWebsiteDemo({ onCTA }) {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
        background: '#fff',
        color: '#1a1a2a',
        minHeight: '100%',
        fontSize: 14,
      }}
    >
      {/* Mini Navbar */}
      <nav
        style={{
          background: '#fff',
          borderBottom: '1px solid #e8edf2',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 16,
            color: '#0a7c82',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8 2 5 5 5 9c0 2.5 1.2 4.7 3 6.1V18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.9c1.8-1.4 3-3.6 3-6.1 0-4-3-7-7-7z"
              fill="#0a7c82"
              opacity="0.2"
            />
            <path
              d="M8.5 9.5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5"
              stroke="#0a7c82"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          PeakSmile
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#555' }}>
          {['Services', 'About', 'Reviews'].map((l) => (
            <span key={l} style={{ cursor: 'pointer' }}>{l}</span>
          ))}
          <button
            style={{
              background: '#0a7c82',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Book Now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f0fafa 0%, #e8f5f6 100%)',
          padding: '40px 24px 32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(10,124,130,0.08)',
            border: '1px solid rgba(10,124,130,0.2)',
            borderRadius: 20,
            padding: '4px 14px',
            fontSize: 11,
            fontWeight: 600,
            color: '#0a7c82',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          🦷 Trusted by 2,000+ Patients in Mumbai
        </div>
        <h1
          style={{
            fontSize: 'clamp(22px, 4vw, 32px)',
            fontWeight: 800,
            color: '#111827',
            marginBottom: 10,
            lineHeight: 1.2,
          }}
        >
          Your Best Smile
          <br />
          <span style={{ color: '#0a7c82' }}>Starts Here</span>
        </h1>
        <p style={{ color: '#556', fontSize: 14, marginBottom: 20, maxWidth: 360, margin: '0 auto 20px' }}>
          Advanced dental care with a gentle touch. Affordable prices, experienced doctors, same-day appointments.
        </p>
        <button
          onClick={onCTA}
          style={{
            background: '#0a7c82',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '11px 24px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(10,124,130,0.35)',
          }}
        >
          Book Free Consultation →
        </button>
      </div>

      {/* Services */}
      <div style={{ padding: '28px 20px' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 700,
            color: '#111827',
            marginBottom: 20,
          }}
        >
          Our Services
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}
        >
          {[
            { icon: '✨', name: 'Teeth Whitening', price: '₹3,500', desc: 'Professional laser whitening in 60 mins' },
            { icon: '😁', name: 'Braces & Aligners', price: '₹18,000', desc: 'Metal, ceramic & Invisalign options' },
            { icon: '🦷', name: 'Root Canal', price: '₹5,000', desc: 'Painless single-visit RCT available' },
          ].map((svc) => (
            <div
              key={svc.name}
              style={{
                background: '#f8fbfc',
                border: '1px solid #e2eef0',
                borderRadius: 10,
                padding: '16px 12px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{svc.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#111', marginBottom: 4 }}>{svc.name}</div>
              <div style={{ fontSize: 12, color: '#0a7c82', fontWeight: 600, marginBottom: 4 }}>{svc.price}</div>
              <div style={{ fontSize: 11, color: '#777', lineHeight: 1.4 }}>{svc.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ background: '#f0fafa', padding: '20px', borderTop: '1px solid #e2eef0' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 700,
            color: '#111',
            marginBottom: 14,
          }}
        >
          What Our Patients Say
        </h2>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { name: 'Priya S.', text: 'Best dental clinic in Mumbai! Dr. Mehta fixed my smile perfectly.', stars: 5 },
            { name: 'Rahul K.', text: 'Painless root canal treatment. Very professional staff!', stars: 5 },
            { name: 'Anita R.', text: 'Affordable and excellent service. Highly recommend!', stars: 5 },
          ].map((t) => (
            <div
              key={t.name}
              style={{
                background: '#fff',
                border: '1px solid #dde8ea',
                borderRadius: 10,
                padding: '12px 14px',
                minWidth: 180,
                flex: '0 0 auto',
              }}
            >
              <div style={{ color: '#f59e0b', fontSize: 12, marginBottom: 6 }}>
                {'★'.repeat(t.stars)}
              </div>
              <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5, marginBottom: 8 }}>
                "{t.text}"
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0a7c82' }}>— {t.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: '#0a7c82',
          color: '#fff',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
          fontSize: 12,
        }}
      >
        <div>
          <div style={{ fontWeight: 700, marginBottom: 2 }}>PeakSmile Dental Clinic</div>
          <div style={{ opacity: 0.8 }}>📍 42 Linking Road, Bandra West, Mumbai 400050</div>
        </div>
        <div style={{ opacity: 0.9 }}>📞 +91 98765 43210</div>
      </div>
    </div>
  );
}
