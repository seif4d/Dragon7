import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Flame, Send, CheckCircle } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const { isRTL } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({ days: 30, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-title',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.cta-form',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      gsap.fromTo(
        '.cta-countdown',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Fire animation
      gsap.to('.fire-glow', {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#1a0500] to-[#050505]" />
        
        {/* Fire Glow */}
        <div className="fire-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF4D00]/20 rounded-full blur-[200px]" />
        <div className="fire-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9D00]/15 rounded-full blur-[150px]" style={{ animationDelay: '1s' }} />
        
        {/* Particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#FF4D00] rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="cta-title flex justify-center mb-6 md:mb-8">
            <div className="w-16 md:w-24 h-16 md:h-24 rounded-full dragon-gradient-bg flex items-center justify-center animate-pulse-slow">
              <Flame className="w-8 md:w-12 h-8 md:h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="cta-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6">
            <span className="text-white">{isRTL ? 'هل أنت ' : 'Are you '}</span>
            <span className="dragon-gradient-text">{isRTL ? 'مستعد' : 'Ready'}</span>
            <span className="text-white">{isRTL ? ' للتحول؟' : ' to Transform?'}</span>
          </h2>

          {/* Subtitle */}
          <p className="cta-title text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            {isRTL ? 'انضم إلى قائمة الانتظار الآن وكن من أوائل من يدخلون بوابة التنين' : 'Join the waitlist now and be among the first to enter the Dragon Gate'}
          </p>

          {/* Countdown */}
          <div className="cta-countdown flex justify-center gap-2 sm:gap-4 md:gap-8 mb-8 md:mb-12 flex-wrap px-4">
            {[
              { value: countdown.days, label: isRTL ? 'يوم' : 'Days' },
              { value: countdown.hours, label: isRTL ? 'ساعة' : 'Hours' },
              { value: countdown.minutes, label: isRTL ? 'دقيقة' : 'Minutes' },
              { value: countdown.seconds, label: isRTL ? 'ثانية' : 'Seconds' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center bg-white/5 border border-[#FF4D00]/30 rounded-lg md:rounded-xl backdrop-blur-sm">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold dragon-gradient-text">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-white/50 mt-1 md:mt-2">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="cta-form max-w-md mx-auto px-4">
            <div className={`relative ${isRTL ? 'rtl' : 'ltr'}`}>
              <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2`}>
                <Mail className="w-4 md:w-5 h-4 md:h-5 text-white/40" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 md:py-4 bg-white/5 border border-white/20 rounded-lg md:rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/20 transition-all text-sm md:text-base`}
                dir={isRTL ? 'rtl' : 'ltr'}
                disabled={isSubmitted}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitted}
              className={`w-full mt-3 md:mt-4 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-all flex-wrap ${
                isSubmitted
                  ? 'bg-[#00FF88] text-black'
                  : 'dragon-gradient-bg text-white hover:shadow-lg hover:shadow-[#FF4D00]/30'
              }`}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-4 md:w-5 h-4 md:h-5" />
                  <span>{isRTL ? 'تم التسجيل بنجاح!' : 'Successfully Registered!'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 md:w-5 h-4 md:h-5" />
                  <span>{isRTL ? 'انضم إلى القائمة' : 'Join Waitlist'}</span>
                </>
              )}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="cta-form mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-6 text-white/40 text-xs md:text-sm px-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-[#00FF88] flex-shrink-0" />
              <span>{isRTL ? 'لا رسائل مزعجة' : 'No spam'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-[#00FF88] flex-shrink-0" />
              <span>{isRTL ? 'محمي تماماً' : 'Fully Protected'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-[#00FF88] flex-shrink-0" />
              <span>{isRTL ? 'احصل على الفرصة الأولى' : 'Early Access'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00FF88]" />
              <span>{isRTL ? 'إلغاء الاشتراك في أي وقت' : 'Unsubscribe Anytime'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00FF88]" />
              <span>{isRTL ? 'خصوصية تامة' : 'Complete Privacy'}</span>
            </div>
          </div>

          {/* Final Quote */}
          <div className="cta-form mt-20 pt-12 border-t border-white/10">
            <p className="text-2xl md:text-3xl text-white/80 italic leading-relaxed">
              "<span className="dragon-gradient-text font-bold">DRAGON</span> هي نظام تشغيل للمستقبل"
            </p>
            <p className="text-white/50 mt-4">
              نحن نوفر الأرض، القانون، والنار... والشباب يأتون ليتحولوا
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
