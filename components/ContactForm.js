'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import CustomSelect, { paramToValue } from '../components/ui/CustomSelect';

const WHATSAPP_NUMBER = '919XXXXXXXXX';

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    whatsapp: '',
    service: '',
    message: '',
  });
  const [highlighted, setHighlighted] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const applyService = (serviceValue) => {
      if (!serviceValue) return;
      setForm((prev) => ({ ...prev, service: serviceValue }));
      setHighlighted(true);
      setTimeout(() => setHighlighted(false), 2400);
    };

    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam && paramToValue[serviceParam]) {
      applyService(paramToValue[serviceParam]);
    }

    const handler = (e) => {
      if (e.detail?.value) applyService(e.detail.value);
    };
    window.addEventListener('veloxai:setService', handler);
    return () => window.removeEventListener('veloxai:setService', handler);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const emailjs = await import('@emailjs/browser');
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS env vars not configured.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          business_name: form.business,
          from_email: form.email,
          whatsapp: form.whatsapp,
          service_needed: form.service,
          message: form.message,
        },
        publicKey
      );

      setStatus('success');
      setForm({ name: '', business: '', email: '', whatsapp: '', service: '', message: '' });
    } catch (err) {
      setErrorMsg(err?.text || err?.message || 'Something went wrong.');
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '12px 14px',
    fontFamily: 'var(--font-body)',
    fontSize: 14.5,
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 8,
  };

  const fieldFocus = (e) => (e.target.style.borderColor = 'rgba(0,212,255,0.45)');
  const fieldBlur = (e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)');

  return (
    <section id="contact" ref={ref} className="section" style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '40vh',
          background: 'radial-gradient(ellipse at center bottom, rgba(0,212,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', maxWidth: 720 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>
            <span className="pulse-dot" />
            Contact
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(26px, 4vw, 44px)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}
          >
            Tell Me About{' '}
            <span style={{ color: 'var(--cyan)' }}>Your Project</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: 16 }}>
            I'll get back to you within 24 hours.
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(62,207,142,0.06)',
              border: '1px solid rgba(62,207,142,0.25)',
              borderRadius: 20,
              padding: '48px 32px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 24,
                color: 'var(--text-primary)',
                marginBottom: 10,
                letterSpacing: '-0.02em',
              }}
            >
              Message Received!
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                fontSize: 15,
                marginBottom: 28,
                lineHeight: 1.6,
              }}
            >
              I'll reach out within 24 hours. For urgent queries, WhatsApp me directly.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyan"
              style={{
                display: 'inline-flex',
                padding: '12px 24px',
                fontSize: 15,
                borderRadius: 10,
                textDecoration: 'none',
                gap: 8,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Me Now
            </a>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <div
              style={{
                background: 'rgba(14, 14, 26, 0.85)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                borderRadius: 20,
                padding: '36px',
              }}
            >
              <form onSubmit={handleSubmit}>
                <div
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}
                  className="form-row"
                >
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Rahul Sharma" style={inputStyle} onFocus={fieldFocus} onBlur={fieldBlur} />
                  </div>
                  <div>
                    <label style={labelStyle}>Business Name *</label>
                    <input type="text" name="business" required value={form.business} onChange={handleChange} placeholder="Sharma Enterprises" style={inputStyle} onFocus={fieldFocus} onBlur={fieldBlur} />
                  </div>
                </div>

                <div
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}
                  className="form-row"
                >
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="rahul@business.com" style={inputStyle} onFocus={fieldFocus} onBlur={fieldBlur} />
                  </div>
                  <div>
                    <label style={labelStyle}>WhatsApp Number</label>
                    <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} onFocus={fieldFocus} onBlur={fieldBlur} />
                  </div>
                </div>

                <div style={{ marginBottom: 16, position: 'relative' }}>
                  <label style={labelStyle}>
                    What Do You Need? *
                    {highlighted && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2.2, times: [0, 0.1, 0.8, 1] }}
                        style={{
                          marginLeft: 8,
                          fontSize: 11,
                          color: 'var(--cyan)',
                          fontWeight: 600,
                        }}
                      >
                        ✓ Auto-selected
                      </motion.span>
                    )}
                  </label>
                  <CustomSelect
                    value={form.service}
                    onChange={(val) => setForm((prev) => ({ ...prev, service: val }))}
                    highlighted={highlighted}
                  />
                  {/* Ghost input for required validation */}
                  <input
                    required
                    value={form.service}
                    onChange={() => {}}
                    style={{ opacity: 0, height: 0, pointerEvents: 'none', position: 'absolute' }}
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Tell Me About Your Project *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your business, what you need built, and any specific requirements..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                    onFocus={fieldFocus}
                    onBlur={fieldBlur}
                  />
                </div>

                {status === 'error' && (
                  <div
                    style={{
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: '#FDA4AF',
                      marginBottom: 16,
                    }}
                  >
                    ⚠️ {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-cyan"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: 15,
                    borderRadius: 10,
                    opacity: status === 'loading' ? 0.7 : 1,
                    gap: 10,
                    boxShadow: '0 0 30px rgba(0,212,255,0.2)',
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-9-9" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send My Project Brief →'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr !important; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
