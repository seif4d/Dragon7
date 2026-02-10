import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import CoreModel from './sections/CoreModel';
import Pillars from './sections/Pillars';
import DragonAI from './sections/DragonAI';
import BusinessModel from './sections/BusinessModel';
import UserJourney from './sections/UserJourney';
import CTA from './sections/CTA';
import Navigation from './components/Navigation';
import FireParticles from './components/FireParticles';
import { useI18n } from './i18n/useI18n';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { isRTL } = useI18n();
  useEffect(() => {
    // Smooth scroll behavior
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll('.animate-on-scroll'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Fire Particles Background */}
      <FireParticles />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Philosophy />
        <CoreModel />
        <Pillars />
        <DragonAI />
        <BusinessModel />
        <UserJourney />
        <CTA />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 sm:py-12 border-t border-white/10">
        <div className="section-padding">
          <div className={`flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} justify-between items-center gap-4 sm:gap-6`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">🐉</span>
              <span className="text-xl sm:text-2xl font-bold dragon-gradient-text" style={{ fontFamily: 'Cinzel, serif' }}>
                DRAGON
              </span>
            </div>
            <p className="text-white/50 text-xs sm:text-sm text-center md:text-left">
              {isRTL ? 'نظام تشغيل حياتك' : 'The Operating System of Your Life'}
            </p>
            <div className={`flex gap-4 sm:gap-6 text-white/50 flex-wrap justify-center md:justify-end`}>
              <a href="#" className="hover:text-[#FF4D00] transition-colors text-xs sm:text-sm">
                {isRTL ? 'الخصوصية' : 'Privacy'}
              </a>
              <a href="#" className="hover:text-[#FF4D00] transition-colors text-xs sm:text-sm">
                {isRTL ? 'الشروط' : 'Terms'}
              </a>
              <a href="#" className="hover:text-[#FF4D00] transition-colors text-xs sm:text-sm">
                {isRTL ? 'تواصل معنا' : 'Contact'}
              </a>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 text-center text-white/30 text-xs sm:text-sm">
            © 2025 DRAGON. {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
