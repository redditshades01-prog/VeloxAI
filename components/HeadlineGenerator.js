'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SYSTEM_PROMPT =
  'You are an expert copywriter. Write homepage copy for businesses. Be professional and persuasive. Output ONLY valid JSON with no extra text, no markdown, no backticks. Format: {"headline":"...","subheadline":"...","cta":"...","paragraph":"..."}';

export default function HeadlineGenerator() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const [bizName, setBizName] = useState('');
  const [bizDesc, setBizDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!bizName.trim() || !bizDesc.trim() || loading) return;
    setLoading(true);
    setError('');
    setOutput(null);

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
            { role: 'system', content: SYSTEM_PROMPT },
            {
              role: 'user',
              content: `Write homepage copy for a business called "${bizName.trim()}" that offers "${bizDesc.trim()}". Return only the JSON object.`,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        if (res.status === 503) throw new Error('Model warming up — try again in a moment.');
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `API error ${res.status}`);
      }

      const data = await res.json();
      const rawText = data.choices?.[0]?.message?.content ?? null;

      if (!rawText) throw new Error('No response received from model');

      // Extract JSON from response
      const jsonMatch = rawText.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) {
        // Fallback: structured text parsing
        const lines = rawText.split('\n').filter(Boolean);
        setOutput({
          headline: lines[0] || `Transform Your ${bizName} Business`,
          subheadline: lines[1] || `Professional ${bizDesc} — delivered with excellence.`,
          cta: lines[2] || 'Get Started Today',
          paragraph:
            lines.slice(3).join(' ') ||
            `At ${bizName}, we specialize in ${bizDesc}. Our proven approach delivers results that matter.`,
        });
        return;
      }

      const parsed = JSON.parse(jsonMatch[0]);
      setOutput(parsed);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') generate();
  };

  return (
    <section id="demo-copy" ref={sectionRef} className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Label + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>
            <span className="pulse-dot" />
            Live Demo
          </div>
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
            Instant AI Copywriting —
            <br />
            <span style={{ color: 'var(--cyan)' }}>Built Into Your Site</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              fontSize: 16,
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            Type your business info and watch AI write your homepage copy in seconds.
          </p>
        </motion.div>

        {/* Tool */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
          style={{ maxWidth: 620, margin: '0 auto' }}
        >
          {/* Inputs */}
          <div
            style={{
              background: 'rgba(15, 15, 28, 0.8)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(16px)',
              borderRadius: 18,
              padding: '28px',
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  Your Business Name
                </label>
                <input
                  type="text"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="e.g. Sharma Dental Clinic"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    padding: '11px 14px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14.5,
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  What You Do
                </label>
                <input
                  type="text"
                  value={bizDesc}
                  onChange={(e) => setBizDesc(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="e.g. affordable dental care in Mumbai"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    padding: '11px 14px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14.5,
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              <button
                onClick={generate}
                disabled={loading || !bizName.trim() || !bizDesc.trim()}
                className="btn-cyan"
                style={{
                  width: '100%',
                  padding: '13px',
                  fontSize: 15,
                  borderRadius: 10,
                  opacity: loading || !bizName.trim() || !bizDesc.trim() ? 0.55 : 1,
                  gap: 10,
                }}
              >
                {loading ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ animation: 'spin 1s linear infinite' }}
                    >
                      <path d="M21 12a9 9 0 1 1-9-9" />
                    </svg>
                    Generating Copy...
                  </>
                ) : (
                  'Generate My Copy →'
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 12,
                padding: '14px 18px',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: '#FDA4AF',
                marginBottom: 16,
              }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Output */}
          {output && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'rgba(0, 212, 255, 0.03)',
                border: '1px solid rgba(0,212,255,0.2)',
                backdropFilter: 'blur(16px)',
                borderRadius: 18,
                padding: '28px',
              }}
            >
              {/* Headline */}
              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--cyan)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Headline
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: 'clamp(20px, 3vw, 28px)',
                    color: 'var(--text-primary)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {output.headline}
                </p>
              </div>

              {/* Subheadline */}
              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--violet)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Subheadline
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                  }}
                >
                  {output.subheadline}
                </p>
              </div>

              {/* CTA */}
              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  CTA Button
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'var(--cyan)',
                    color: '#000',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: 14,
                    borderRadius: 8,
                    padding: '9px 20px',
                  }}
                >
                  {output.cta}
                </span>
              </div>

              {/* Paragraph */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  Value Proposition
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14.5,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                  }}
                >
                  {output.paragraph}
                </p>
              </div>
            </motion.div>
          )}

          {/* Note */}
          <p
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--text-muted)',
              marginTop: 16,
            }}
          >
            This exact feature can be built into your website.
          </p>
        </motion.div>
      </div>
    </section>
  );
}