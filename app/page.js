'use client';

import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import DemosSection from '../components/DemosSection';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function HomePage() {
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);

  // Change 2: Auto-scroll to #demos after 1.2s on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Custom cursor glow (desktop only)
  useEffect(() => {
    const cursor = cursorRef.current;
    const outer = cursorOuterRef.current;
    if (!cursor || !outer) return;

    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateOuter = () => {
      outerX += (mouseX - outerX) * 0.12;
      outerY += (mouseY - outerY) * 0.12;
      outer.style.left = `${outerX}px`;
      outer.style.top = `${outerY}px`;
      rafId = requestAnimationFrame(animateOuter);
    };

    const onEnter = () => {
      cursor.style.width = '32px';
      cursor.style.height = '32px';
      outer.style.width = '60px';
      outer.style.height = '60px';
      outer.style.borderColor = 'rgba(0,212,255,0.6)';
    };

    const onLeave = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      outer.style.width = '40px';
      outer.style.height = '40px';
      outer.style.borderColor = 'rgba(0,212,255,0.3)';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateOuter);

    const interactives = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"]'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />
      <div ref={cursorOuterRef} className="cursor-glow-outer" aria-hidden="true" />

      {/* Background mesh */}
      <div className="gradient-mesh" aria-hidden="true">
        <div className="gradient-mesh-extra" />
      </div>

      <Navbar />

      <main>
        <Hero />

        <div className="container">
          <hr className="glow-line" />
        </div>

        <Services />

        <div className="container">
          <hr className="glow-line" />
        </div>

        {/* NEW unified Demos Section */}
        <DemosSection />

        <div className="container">
          <hr className="glow-line" />
        </div>

        <HowItWorks />

        <div className="container">
          <hr className="glow-line" />
        </div>

        <Pricing />

        <div className="container">
          <hr className="glow-line" />
        </div>

        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
