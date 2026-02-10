import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Flame, Sword, Shield } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

const Hero = () => {
  const { t, isRTL } = useI18n();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState({ days: 30, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power3.out' }
      );

      // Title animation with character stagger
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { opacity: 0, y: 100, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            delay: 0.5,
          }
        );
      }

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.5 }
      );

      // CTA buttons
      gsap.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 2,
        }
      );

      // Floating animation for decorative elements
      gsap.to('.floating-icon', {
        y: -15,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 30;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const titleText = 'DRAGON';

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero-dragon.jpg"
          alt="Dragon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/50 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-1/4 ${isRTL ? 'right-4 sm:right-10' : 'left-4 sm:left-10'} floating-icon opacity-30`}>
        <Flame className="w-8 sm:w-12 h-8 sm:h-12 text-[#FF4D00]" />
      </div>
      <div className={`absolute top-1/3 ${isRTL ? 'left-8 sm:left-16' : 'right-8 sm:right-16'} floating-icon opacity-30`} style={{ animationDelay: '0.5s' }}>
        <Sword className="w-8 sm:w-10 h-8 sm:h-10 text-[#FF9D00]" />
      </div>
      <div className={`absolute bottom-1/4 ${isRTL ? 'right-5 sm:right-20' : 'left-5 sm:left-20'} floating-icon opacity-30`} style={{ animationDelay: '1s' }}>
        <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-[#FFD700]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-padding max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-on-scroll">
          <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
          <span className="text-xs sm:text-sm text-white/70">
            {isRTL ? 'المنصة قيد التطوير' : 'Platform Under Development'}
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 sm:mb-6 tracking-tight leading-tight"
          style={{ fontFamily: 'Cinzel, serif', perspective: '1000px' }}
        >
          {titleText.split('').map((char, index) => (
            <span
              key={index}
              className="char inline-block dragon-gradient-text text-shadow-glow"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-2xl md:text-3xl text-white/80 mb-4 font-light"
          style={{ opacity: 0 }}
        >
          {t('hero.subtitle')}
        </p>
        <p
          className="text-base sm:text-lg text-white/50 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
          style={{ opacity: 0 }}
          ref={(el) => {
            if (el) {
              gsap.to(el, { opacity: 1, duration: 1, delay: 1.8 });
            }
          }}
        >
          {isRTL ? 'من الفوضى إلى النظام... من الضعف إلى القوة... من الإنسان إلى التنين' : 'From Chaos to System... From Weakness to Strength... From Human to Dragon'}
        </p>

        {/* Countdown */}
        <div
          className="flex justify-center gap-2 sm:gap-4 md:gap-8 mb-8 sm:mb-12 flex-wrap px-4"
          style={{ opacity: 0 }}
          ref={(el) => {
            if (el) {
              gsap.to(el, { opacity: 1, duration: 1, delay: 2.2 });
            }
          }}
        >
          {[
            { value: countdown.days, label: isRTL ? 'يوم' : 'Days' },
            { value: countdown.hours, label: isRTL ? 'ساعة' : 'Hours' },
            { value: countdown.minutes, label: isRTL ? 'دقيقة' : 'Minutes' },
            { value: countdown.seconds, label: isRTL ? 'ثانية' : 'Seconds' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                <span className="text-xl sm:text-3xl font-bold dragon-gradient-text">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-white/50 mt-2">{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 mb-12 sm:mb-16">
          <button className="dragon-button-primary text-base sm:text-lg py-3 px-6">
            {isRTL ? 'ادخل البوابة' : 'Enter Portal'}
          </button>
          <button className="dragon-button-secondary text-base sm:text-lg py-3 px-6">
            {isRTL ? 'اكتشف المزيد' : 'Learn More'}
          </button>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 mt-12 sm:mt-16 pt-8 sm:pt-16 border-t border-white/10 px-4"
          style={{ opacity: 0 }}
          ref={(el) => {
            if (el) {
              gsap.to(el, { opacity: 1, duration: 1, delay: 2.5 });
            }
          }}
        >
          {[
            { value: '12', label: isRTL ? 'ركيزة' : 'Pillars' },
            { value: '3', label: isRTL ? 'شخصيات ذكية' : 'AI Characters' },
            { value: '∞', label: isRTL ? 'إمكانيات' : 'Possibilities' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold dragon-gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/30" />
      </div>
    </section>
  );
};

export default Hero;
