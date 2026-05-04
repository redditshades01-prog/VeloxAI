import ChatbotDemo from '../../components/demos/ChatbotDemo';

export const metadata = {
  title: 'AI Chatbot Demo — Veloxai',
};

export default function ChatbotDemoPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --font-heading: 'DM Sans', sans-serif;
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
        .typing-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8888AA;
          animation: typingBounce 1.2s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
      <a href="/" className="back-link">
        ← Back to Veloxai
      </a>
      <div
        style={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 48,
        }}
      >
        <ChatbotDemo />
      </div>
    </>
  );
}
