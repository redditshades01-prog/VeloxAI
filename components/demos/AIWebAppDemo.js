'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ShimmerCard() {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        padding: '14px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.07) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.4s infinite',
        }}
      />
      <div style={{ height: 14, background: 'rgba(255,255,255,0.06)', borderRadius: 4, width: '60%', marginBottom: 8 }} />
      <div style={{ height: 11, background: 'rgba(255,255,255,0.04)', borderRadius: 4, width: '85%' }} />
      <style jsx global>{`
        @keyframes shimmer {
          from { background-position: -200% 0; }
          to { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

function NameCard({ item, index }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(item.name).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      style={{
        background: 'rgba(0,212,255,0.04)',
        border: '1px solid rgba(0,212,255,0.15)',
        borderRadius: 10,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 15,
            color: '#fff',
            marginBottom: 3,
          }}
        >
          {item.name}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
          {item.tagline}
        </div>
      </div>
      <button
        onClick={copy}
        style={{
          background: copied ? 'rgba(62,207,142,0.15)' : 'rgba(255,255,255,0.06)',
          border: copied ? '1px solid rgba(62,207,142,0.4)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: 7,
          padding: '5px 10px',
          fontSize: 11,
          fontWeight: 600,
          color: copied ? '#3ECF8E' : 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          flexShrink: 0,
          fontFamily: 'var(--font-body)',
        }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </motion.div>
  );
}

export default function AIWebAppDemo() {
  const [industry, setIndustry] = useState('');
  const [city, setCity] = useState('');
  const [vibe, setVibe] = useState('Modern');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!industry.trim() || !city.trim() || loading) return;
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const token = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      if (!token) throw new Error('GROQ_API_KEY not configured');

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'user',
              content: `Generate 5 unique business names for a ${industry.trim()} in ${city.trim()} with a ${vibe} brand feel.
For each name write one short tagline under 8 words.
Reply in this exact format, nothing else:
Name: [name] | Tagline: [tagline]
Name: [name] | Tagline: [tagline]
Name: [name] | Tagline: [tagline]
Name: [name] | Tagline: [tagline]
Name: [name] | Tagline: [tagline]`,
            },
          ],
          max_tokens: 500,
          temperature: 0.85,
        }),
      });

      if (!res.ok) {
        if (res.status === 503) throw new Error('Model loading — try again in ~30 seconds.');
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error?.message || e.error || `API error ${res.status}`);
      }

      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content ?? null;

      if (!raw) throw new Error('No response received. Please try again.');

      const parsed = [];

      // Primary: parse "Name: X | Tagline: Y" format
      const lines = raw.split('\n').filter((l) => l.includes('|'));
      for (const line of lines) {
        const parts = line.split('|');
        if (parts.length >= 2) {
          const name = parts[0].replace(/Name:/i, '').replace(/^\d+[\.\)]\s*/, '').trim();
          const tagline = parts[1].replace(/Tagline:/i, '').trim();
          if (name && tagline) parsed.push({ name, tagline });
        }
      }

      // Fallback: numbered list with dash/colon separator
      if (parsed.length === 0) {
        const allLines = raw.split('\n').filter(Boolean);
        for (const line of allLines) {
          const clean = line.replace(/^\d+[\.\)]\s*/, '').trim();
          const sep = clean.match(/[-–—:]/);
          if (sep) {
            const idx = clean.indexOf(sep[0]);
            const name = clean.slice(0, idx).trim();
            const tagline = clean.slice(idx + 1).trim();
            if (name && tagline) parsed.push({ name, tagline });
          } else if (clean.length > 3) {
            parsed.push({ name: clean, tagline: `Premium ${industry} in ${city}` });
          }
        }
      }

      if (parsed.length === 0) throw new Error('Could not parse results. Please try again.');
      setResults(parsed.slice(0, 5));
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter') generate();
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: '9px 12px',
    fontSize: 13,
    color: '#fff',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0a0a14',
        fontFamily: 'var(--font-body)',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}
        >
          🧠
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 13 }}>
            AI Business Name Generator
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            Powered by Llama 3
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          overflow: 'hidden',
        }}
      >
        {/* Left: inputs */}
        <div
          style={{
            padding: '14px 12px',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            overflowY: 'auto',
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: 10.5, color: 'rgba(255,255,255,0.4)', marginBottom: 5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              onKeyDown={onKey}
              placeholder="dental clinic"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.45)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 10.5, color: 'rgba(255,255,255,0.4)', marginBottom: 5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={onKey}
              placeholder="Mumbai"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.45)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 10.5, color: 'rgba(255,255,255,0.4)', marginBottom: 5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Brand Vibe
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {['Modern', 'Traditional', 'Playful', 'Premium'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVibe(v)}
                  style={{
                    background: vibe === v ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)',
                    border: vibe === v ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 7,
                    padding: '7px 10px',
                    fontSize: 12.5,
                    color: vibe === v ? '#00D4FF' : 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    fontWeight: vibe === v ? 600 : 400,
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.15s',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading || !industry.trim() || !city.trim()}
            style={{
              background: loading ? 'rgba(0,212,255,0.3)' : '#00D4FF',
              color: '#000',
              border: 'none',
              borderRadius: 8,
              padding: '10px',
              fontWeight: 700,
              fontSize: 12.5,
              cursor: loading || !industry.trim() || !city.trim() ? 'not-allowed' : 'pointer',
              opacity: !industry.trim() || !city.trim() ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              marginTop: 4,
              fontFamily: 'var(--font-body)',
            }}
          >
            {loading ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-9-9" />
                </svg>
                Generating...
              </>
            ) : (
              'Generate Names →'
            )}
          </button>
        </div>

        {/* Right: results */}
        <div
          style={{
            padding: '14px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {!loading && results.length === 0 && !error && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.2)',
                textAlign: 'center',
                gap: 10,
                padding: 20,
              }}
            >
              <div style={{ fontSize: 36 }}>✨</div>
              <div style={{ fontSize: 13 }}>
                Enter your industry, city, and vibe to generate 5 AI-crafted business names.
              </div>
            </div>
          )}

          {loading && [0, 1, 2, 3, 4].map((i) => <ShimmerCard key={i} />)}

          {error && (
            <div
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 10,
                padding: '12px 14px',
                fontSize: 12.5,
                color: '#FDA4AF',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <AnimatePresence>
            {results.map((item, i) => (
              <NameCard key={i} item={item} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}