'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const SYSTEM_PROMPT =
  "You are a helpful assistant for 'EduPeak Coaching Institute'. You help students with course inquiries for UPSC, IELTS, and MBA prep. Keep answers short, friendly, and always ask for their name and phone number to have a counsellor call back.";

const STARTER_MESSAGES = [
  { role: 'assistant', content: "Hi! 👋 Welcome to EduPeak Coaching Institute. I'm here to help you with course info for UPSC, IELTS, and MBA prep. What are you looking to achieve?" },
];

export default function ChatbotDemo() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [messages, setMessages] = useState(STARTER_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const token = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      if (!token) throw new Error('HF_TOKEN not configured');

      // Build prompt in Mistral instruction format
      const conversationHistory = newMessages
        .map((m) => (m.role === 'user' ? `[INST] ${m.content} [/INST]` : m.content))
        .join('\n');

      const prompt = `<s>[INST] ${SYSTEM_PROMPT} [/INST]\n${conversationHistory}`;

      const res = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userMessage }
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
          
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (res.status === 503) {
          throw new Error('Model is loading. Please wait a moment and try again.');
        }
        throw new Error(errData.error || `API error ${res.status}`);
      }

      const data = await res.json();
      let reply = data.choices?.[0]?.message?.content ?? null;

      if (!reply) throw new Error('No response from model');

      // Clean up any residual prompt artifacts
      reply = reply.replace(/\[INST\].*?\[\/INST\]/gs, '').trim();

      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: `Sorry, I'm having a brief hiccup (${err.message}). Please try again in a moment, or contact us directly at +91 98765 43210.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section
      id="demo-chatbot"
      ref={sectionRef}
      className="section grid-bg"
      style={{ position: 'relative' }}
    >
      <div className="container">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 12 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="pulse-dot" />
            Live Demo
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(26px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: 14,
            }}
          >
            This Is What Your Customers
            <br />
            <span style={{ color: 'var(--cyan)' }}>Will Experience</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              fontSize: 16,
              maxWidth: 500,
              margin: '0 auto',
            }}
          >
            Every chatbot I build is trained on your business. This demo uses a sample
            coaching institute persona.
          </p>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
          style={{ maxWidth: 680, margin: '0 auto' }}
        >
          <div
            style={{
              background: 'rgba(12, 12, 24, 0.85)',
              border: '1px solid rgba(0,212,255,0.15)',
              backdropFilter: 'blur(20px)',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(0,212,255,0.06)',
            }}
          >
            {/* Chat Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                EP
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 15,
                    color: 'var(--text-primary)',
                  }}
                >
                  EduPeak Assistant
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: '#3ECF8E',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#3ECF8E',
                      display: 'inline-block',
                    }}
                  />
                  Online · Powered by AI
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--cyan)',
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    borderRadius: 6,
                    padding: '3px 8px',
                  }}
                >
                  LIVE AI
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                height: 360,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 16 : -16, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '78%',
                        padding: '10px 14px',
                        borderRadius:
                          msg.role === 'user'
                            ? '16px 16px 4px 16px'
                            : '16px 16px 16px 4px',
                        background:
                          msg.role === 'user'
                            ? 'linear-gradient(135deg, rgba(0,212,255,0.9), rgba(0,180,220,0.9))'
                            : 'rgba(255,255,255,0.06)',
                        border:
                          msg.role === 'user'
                            ? 'none'
                            : '1px solid rgba(255,255,255,0.08)',
                        color: msg.role === 'user' ? '#000' : 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        lineHeight: 1.55,
                        fontWeight: msg.role === 'user' ? 500 : 400,
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                  >
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: '16px 16px 16px 4px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        gap: 5,
                        alignItems: 'center',
                      }}
                    >
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: '14px 16px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                gap: 10,
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about UPSC, IELTS, MBA prep..."
                disabled={loading}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="btn-cyan"
                style={{
                  padding: '10px 18px',
                  fontSize: 14,
                  borderRadius: 10,
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  minWidth: 52,
                }}
              >
                {loading ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ animation: 'spin 1s linear infinite' }}
                  >
                    <path d="M21 12a9 9 0 1 1-9-9" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Footer note */}
          <p
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--text-muted)',
              marginTop: 16,
            }}
          >
            🔴 Live AI — powered by HuggingFace.{' '}
            <span style={{ color: 'var(--text-secondary)' }}>
              Your chatbot will be trained on YOUR business.
            </span>
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
