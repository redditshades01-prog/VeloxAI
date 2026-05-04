'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NODES = [
  { id: 0, label: 'Customer\nFills Form', icon: '📋', short: 'Form received' },
  { id: 1, label: 'AI Qualifies\nLead', icon: '🤖', short: 'AI analysing...' },
  { id: 2, label: 'WhatsApp\nNotification', icon: '💬', short: 'WhatsApp sent ✓' },
  { id: 3, label: 'Google Sheet\nUpdated', icon: '📊', short: 'Sheet updated ✓' },
  { id: 4, label: 'Follow-up\nEmail Sent', icon: '📧', short: 'Email triggered ✓' },
];

function AutoFlowDiagram({ activeNode }) {
  return (
    <div
      style={{
        padding: '18px 12px',
        overflowX: 'auto',
        background: 'rgba(0,0,0,0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          minWidth: 520,
          justifyContent: 'center',
        }}
      >
        {NODES.map((node, i) => (
          <div key={node.id} style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              animate={{
                opacity: activeNode === null ? 1 : activeNode === i ? 1 : activeNode > i ? 0.5 : 0.3,
                scale: activeNode === i ? 1.06 : 1,
              }}
              transition={{ duration: 0.35 }}
              style={{
                background:
                  activeNode === i
                    ? 'rgba(0,212,255,0.18)'
                    : 'rgba(255,255,255,0.04)',
                border:
                  activeNode === i
                    ? '1px solid rgba(0,212,255,0.6)'
                    : activeNode !== null && activeNode > i
                    ? '1px solid rgba(0,212,255,0.25)'
                    : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: '10px 10px 8px',
                textAlign: 'center',
                minWidth: 80,
                boxShadow:
                  activeNode === i ? '0 0 20px rgba(0,212,255,0.25)' : 'none',
                transition: 'box-shadow 0.35s',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{node.icon}</div>
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: activeNode === i ? '#00D4FF' : 'rgba(255,255,255,0.7)',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.3,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {node.label}
              </div>
            </motion.div>

            {i < NODES.length - 1 && (
              <div
                style={{
                  width: 32,
                  height: 24,
                  position: 'relative',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg width="32" height="16" viewBox="0 0 32 16" style={{ overflow: 'visible' }}>
                  <defs>
                    <marker
                      id={`arrow-${i}`}
                      markerWidth="6"
                      markerHeight="6"
                      refX="3"
                      refY="3"
                      orient="auto"
                    >
                      <path d="M0,0 L6,3 L0,6" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.7" />
                    </marker>
                  </defs>
                  <line
                    x1="2"
                    y1="8"
                    x2="28"
                    y2="8"
                    stroke={
                      activeNode !== null && activeNode > i
                        ? '#00D4FF'
                        : 'rgba(255,255,255,0.12)'
                    }
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    markerEnd={`url(#arrow-${i})`}
                    style={{ transition: 'stroke 0.4s' }}
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AutomationsDemo() {
  const [form, setForm] = useState({ name: '', email: '', interest: '' });
  const [running, setRunning] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);
  const logRef = useRef(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [log]);

  const runSimulation = async () => {
    if (running || !form.name || !form.email) return;
    setRunning(true);
    setDone(false);
    setLog([]);
    setActiveNode(null);

    const steps = [
      { node: 0, message: '📋 Form submission received from ' + form.name, delay: 400 },
      { node: 1, message: '🤖 AI analysing lead quality... interest: ' + (form.interest || 'general'), delay: 800 },
      { node: 2, message: '💬 WhatsApp notification sent to sales team!', delay: 800 },
      { node: 3, message: '📊 Lead added to Google Sheet — Row 47', delay: 800 },
      { node: 4, message: '📧 Follow-up email triggered for ' + form.email, delay: 800 },
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, steps[i].delay));
      setActiveNode(steps[i].node);
      setLog((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          msg: steps[i].message,
        },
      ]);
    }

    await new Promise((r) => setTimeout(r, 600));
    setDone(true);
    setRunning(false);
  };

  const reset = () => {
    setActiveNode(null);
    setLog([]);
    setDone(false);
    setForm({ name: '', email: '', interest: '' });
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
        }}
      >
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>
          Business Automation Flow
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
          Fill the form below and watch the automation run in real time
        </div>
      </div>

      {/* Flow diagram */}
      <AutoFlowDiagram activeNode={activeNode} />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
          overflow: 'hidden',
        }}
      >
        {/* Left: form */}
        <div
          style={{
            padding: '14px',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            overflowY: 'auto',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: '#00D4FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
            Trigger: Lead Form
          </div>

          {[
            { key: 'name', placeholder: 'Full Name', label: 'Name' },
            { key: 'email', placeholder: 'Email Address', label: 'Email' },
            { key: 'interest', placeholder: 'e.g. Product pricing', label: 'Interest' },
          ].map((f) => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
                {f.label}
              </label>
              <input
                type={f.key === 'email' ? 'email' : 'text'}
                value={form[f.key]}
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                disabled={running}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 7,
                  padding: '8px 10px',
                  fontSize: 13,
                  color: '#fff',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.45)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>
          ))}

          {!done ? (
            <button
              onClick={runSimulation}
              disabled={running || !form.name || !form.email}
              style={{
                background: running ? 'rgba(0,212,255,0.3)' : '#00D4FF',
                color: '#000',
                border: 'none',
                borderRadius: 8,
                padding: '10px',
                fontWeight: 700,
                fontSize: 13,
                cursor: running || !form.name || !form.email ? 'not-allowed' : 'pointer',
                opacity: !form.name || !form.email ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                marginTop: 4,
                fontFamily: 'var(--font-body)',
              }}
            >
              {running ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-9-9" />
                  </svg>
                  Running...
                </>
              ) : (
                'Submit & Watch Automation →'
              )}
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div
                style={{
                  background: 'rgba(62,207,142,0.1)',
                  border: '1px solid rgba(62,207,142,0.3)',
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: 12,
                  color: '#3ECF8E',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                ✅ All 5 steps completed!
              </div>
              <button
                onClick={reset}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8,
                  padding: '8px',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Run Again
              </button>
            </div>
          )}
        </div>

        {/* Right: log */}
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#00D4FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Live Automation Log
          </div>
          <div
            ref={logRef}
            style={{
              flex: 1,
              background: 'rgba(0,0,0,0.35)',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '10px',
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: 11.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {log.length === 0 && (
              <div style={{ color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>
                Waiting for automation trigger...
              </div>
            )}
            <AnimatePresence>
              {log.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'flex', gap: 8, lineHeight: 1.4 }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>[{entry.time}]</span>
                  <span style={{ color: 'rgba(255,255,255,0.85)' }}>{entry.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
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