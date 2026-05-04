import StaticWebsiteDemo from '../../../components/demos/StaticWebsiteDemo';

export const metadata = {
  title: 'Static Website Demo — Veloxai',
};

export default function StaticDemoPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; }
        .back-link {
          position: fixed;
          top: 12px;
          left: 14px;
          z-index: 9999;
          background: rgba(0,0,0,0.7);
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
      `}</style>
      <a href="/" className="back-link">
        ← Back to Veloxai
      </a>
      <div style={{ minHeight: '100vh' }}>
        <StaticWebsiteDemo />
      </div>
    </>
  );
}
