'use client';

export default function BrowserMockup({ children, url = 'veloxai.tech/demo' }) {
  return (
    <div
      style={{
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid rgba(0, 212, 255, 0.18)',
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.5), 0 0 40px rgba(0,212,255,0.07)',
        background: '#0d0d1a',
        display: 'flex',
        flexDirection: 'column',
        height: 500,
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          background: '#1a1a2e',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
          userSelect: 'none',
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#FF5F57',
              display: 'block',
            }}
          />
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#FEBC2E',
              display: 'block',
            }}
          />
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#28C840',
              display: 'block',
            }}
          />
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 7,
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            maxWidth: 400,
            margin: '0 auto',
          }}
        >
          {/* Lock icon */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3ECF8E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {url}
          </span>
        </div>

        {/* Spacer to balance dots */}
        <div style={{ width: 50, flexShrink: 0 }} />
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          background: '#fff',
        }}
      >
        {children}
      </div>
    </div>
  );
}
