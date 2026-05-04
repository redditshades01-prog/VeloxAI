'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYSTEM_PROMPT =
  "You are a helpful assistant for 'EduPeak Coaching Institute'. You help students with course inquiries for UPSC, IELTS, and MBA prep. Keep answers short, friendly, and always ask for their name and phone number to have a counsellor call back.";

const STARTER_MESSAGES = [
  {
    role: 'assistant',
    content:
      "Hi! 👋 Welcome to EduPeak Coaching Institute. I can help you with UPSC, IELTS, and MBA prep courses. What are you looking to achieve?",
  },
];

export default function ChatbotDemo({ compact = false }) {
  const [messages, setMessages] = useState(STARTER_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const token = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      if (!token) throw new Error('GROQ_API_KEY not set');

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
              ...next.map((m) => ({ role: m.role, content: m.content })),
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );

      if (!res.ok) {
        if (res.status === 503) throw new Error('Model warming up — try again in a moment.');
        const err = await res.json().catch(() => ({}));
        console.log('Groq error:', JSON.stringify(err));
        throw new Error(err.error?.message || `API ${res.status}`);
        throw new Error(err.error?.message || err.error || `API ${res.status}`);
      }

      const data = await res.json();
      let reply = data.choices?.[0]?.message?.content ?? null;

      if (!reply) throw new Error('Empty response');

      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: `Sorry, quick hiccup! (${err.message}) Please try again or call us at +91 98765 43210.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0c0c18',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 12,
            color: '#fff',
            flexShrink: 0,
          }}
        >
          EP
        </div>
        <div>
          <div
            style={{ fontWeight: 700, fontSize: 13, color: '#fff', fontFamily: 'var(--font-heading)' }}
          >
            EduPeak Assistant
          </div>
          <div
            style={{ fontSize: 11, color: '#3ECF8E', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                background: '#3ECF8E',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
            Online · Powered by AI
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#00D4FF',
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 5,
              padding: '2px 7px',
            }}
          >
            LIVE AI
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 14 : -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: '9px 13px',
                  borderRadius:
                    msg.role === 'user' ? '14px 14px 3px 14px' : '14px 14px 14px 3px',
                  background:
                    msg.role === 'user'
                      ? 'linear-gradient(135deg, rgba(0,212,255,0.9), rgba(0,180,220,0.9))'
                      : 'rgba(255,255,255,0.07)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  color: msg.role === 'user' ? '#000' : 'rgba(255,255,255,0.9)',
                  fontSize: 13,
                  lineHeight: 1.55,
                  fontWeight: msg.role === 'user' ? 500 : 400,
                }}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex' }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '14px 14px 14px 3px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  gap: 4,
                }}
              >
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '10px 12px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          gap: 8,
          background: 'rgba(255,255,255,0.02)',
          flexShrink: 0,
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          disabled={loading}
          placeholder="Ask about UPSC, IELTS, MBA..."
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: '8px 12px',
            fontSize: 13,
            color: '#fff',
            outline: 'none',
            fontFamily: 'var(--font-body)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            background: '#00D4FF',
            color: '#000',
            border: 'none',
            borderRadius: 8,
            padding: '8px 14px',
            fontWeight: 700,
            fontSize: 13,
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.15s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}