'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const options = [
  { value: '', label: 'Select a service...', disabled: true },
  { value: 'Static Website (₹10,000)', label: 'Static Website (₹10,000)', param: 'basic' },
  { value: 'AI-Powered Website (₹25,000)', label: 'AI-Powered Website (₹25,000)', param: 'starter' },
  { value: 'AI Business System (₹55,000)', label: 'AI Business System (₹55,000)', param: 'growth' },
  { value: 'Custom AI App (₹1,00,000+)', label: 'Custom AI App (₹1,00,000+)', param: 'pro' },
  { value: "Not sure — let's talk", label: "Not sure — let's talk", param: 'other' },
];

export const paramToValue = {
  basic: 'Static Website (₹10,000)',
  starter: 'AI-Powered Website (₹25,000)',
  growth: 'AI Business System (₹55,000)',
  pro: 'Custom AI App (₹1,00,000+)',
  other: "Not sure — let's talk",
};

export default function CustomSelect({ value, onChange, highlighted = false }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Click outside closes
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const selectedOption = options.find((o) => o.value === value && !o.disabled);
  const displayLabel = selectedOption ? selectedOption.label : 'Select a service...';

  // Mobile: native select with custom CSS
  if (isMobile) {
    return (
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${highlighted ? 'rgba(0,212,255,0.6)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 10,
            padding: '12px 40px 12px 14px',
            fontFamily: 'var(--font-body)',
            fontSize: 14.5,
            color: value ? 'var(--text-primary)' : 'var(--text-muted)',
            outline: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
            boxShadow: highlighted ? '0 0 0 2px rgba(0,212,255,0.15)' : 'none',
          }}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              style={{ background: '#0f0f1a', color: '#fff' }}
            >
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(136,136,170,1)"
          strokeWidth="2"
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    );
  }

  // Desktop: custom dropdown
  return (
    <div ref={containerRef} style={{ position: 'relative', zIndex: 50 }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${
            highlighted
              ? 'rgba(0,212,255,0.6)'
              : open
              ? 'rgba(0,212,255,0.45)'
              : 'rgba(255,255,255,0.1)'
          }`,
          borderRadius: 10,
          padding: '12px 14px',
          fontFamily: 'var(--font-body)',
          fontSize: 14.5,
          color: selectedOption ? 'var(--text-primary)' : 'var(--text-muted)',
          outline: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          textAlign: 'left',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: highlighted
            ? '0 0 0 2px rgba(0,212,255,0.15), 0 0 16px rgba(0,212,255,0.1)'
            : 'none',
        }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayLabel}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          style={{ display: 'flex', flexShrink: 0 }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(136,136,170,1)"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              background: '#0f0f1a',
              border: '1px solid rgba(0,212,255,0.18)',
              borderLeft: '2px solid rgba(0,212,255,0.5)',
              borderRadius: 10,
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
              transformOrigin: 'top',
              zIndex: 100,
            }}
          >
            {options
              .filter((o) => !o.disabled)
              .map((opt) => {
                const isSelected = value === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    style={{
                      width: '100%',
                      background: isSelected ? 'rgba(0,212,255,0.12)' : 'transparent',
                      border: 'none',
                      padding: '11px 14px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: isSelected ? 'var(--cyan)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      textAlign: 'left',
                      transition: 'background 0.15s, color 0.15s',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(0,212,255,0.07)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--cyan)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
