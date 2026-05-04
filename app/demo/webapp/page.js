import AIWebAppDemo from '../components/demos/AIWebAppDemo';

export const metadata = {
  title: 'AI Web App Demo — Veloxai',
};

export default function WebAppDemoPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --font-heading: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
          --cyan: #00D4FF;
          --text-primary: #F0F0FF;
          --text-secondary: #8888AA;
          --text-muted: #55556A;
        }
        body { background: #0a0a14; }
        .back-link {
          position: fixed;
          top: 12px;
          left: 14px;
          z-index: 9999;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0,212,255,0.3);
          border-radius: 8px;
          padding: 6px 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #00D4FF;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        @keyframes shimmer {
          from { background-position: -200% 0; }
          to { background-position: 200% 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <a href="/" className="back-link">
        ← Back to Veloxai
      </a>
      <div
        style={{
          minHeight: '100dvh',
          paddingTop: 48,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AIWebAppDemo />
      </div>
    </>
  );
}
