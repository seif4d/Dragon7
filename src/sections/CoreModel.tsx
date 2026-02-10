import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Gamepad2, Users, Brain, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

gsap.registerPlugin(ScrollTrigger);

const CoreModel = () => {
  const { isRTL } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.model-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.model-card',
        { opacity: 0, y: 60, rotateY: -15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.model-grid',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.model-diagram',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.model-diagram',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const elements = [
    {
      icon: Layers,
      title: isRTL ? 'النظام' : 'System',
      description: isRTL ? 'بنية تحتية متكاملة تحكم كل شيء' : 'Integrated infrastructure that controls everything',
      color: '#FF4D00',
    },
    {
      icon: Gamepad2,
      title: isRTL ? 'اللعبة' : 'Game',
      description: isRTL ? 'XP، Ranks، Challenges، Rewards' : 'XP, Ranks, Challenges, Rewards',
      color: '#FF9D00',
    },
    {
      icon: Users,
      title: isRTL ? 'المجتمع' : 'Community',
      description: isRTL ? 'Clans، Teams، Competitions' : 'Clans, Teams, Competitions',
      color: '#FFD700',
    },
    {
      icon: Brain,
      title: isRTL ? 'الذكاء الاصطناعي' : 'AI',
      description: isRTL ? 'Mentor، Shadow، Guardian' : 'Mentor, Shadow, Guardian',
      color: '#8E2DE2',
    },
  ];

  return (
    <section
      id="model"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF4D00]/5 to-transparent" />

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="model-title inline-block text-[#FF4D00] text-xs md:text-sm font-medium tracking-wider uppercase mb-4">
              {isRTL ? 'نموذج العمل الجوهري' : 'Core Business Model'}
            </span>
            <h2 className="model-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-white">{isRTL ? 'لست أكاديمية...' : 'Not an Academy...'}</span>
              <br />
              <span className="dragon-gradient-text">{isRTL ? 'أنا أرض الأكاديميات' : 'I\'m the Platform for Academies'}</span>
            </h2>
            <p className="model-title text-base md:text-xl text-white/60 max-w-3xl mx-auto px-4">
              {isRTL ? 'بدلًا من منافسة صناع المحتوى، DRAGON هي المنصة التي تحتضنهم' : 'Instead of competing with creators, DRAGON is the platform that nurtures them'}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            {/* Left: Cards */}
            <div className="model-grid grid grid-cols-2 gap-3 md:gap-4">
              {elements.map((element, index) => (
                <div
                  key={index}
                  className="model-card dragon-card p-4 md:p-6 rounded-xl md:rounded-2xl group relative overflow-hidden"
                  style={{ perspective: '1000px' }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 md:w-14 h-10 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${element.color}20` }}
                  >
                    <element.icon className="w-5 md:w-7 h-5 md:h-7" style={{ color: element.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">{element.title}</h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">{element.description}</p>

                  {/* Glow Effect */}
                  <div
                    className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
                    style={{ backgroundColor: element.color }}
                  />
                </div>
              ))}
            </div>

            {/* Right: Diagram */}
            <div className="model-diagram relative">
              <div className="relative bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-sm">
                {/* Center */}
                <div className="flex flex-col items-center mb-6 md:mb-8">
                  <div className="w-16 md:w-24 h-16 md:h-24 rounded-full dragon-gradient-bg flex items-center justify-center mb-3 md:mb-4 animate-pulse-slow">
                    <span className="text-2xl md:text-4xl">🐉</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">DRAGON</h3>
                  <p className="text-white/50 text-xs md:text-sm">{isRTL ? 'المنصة الأم' : 'Main Platform'}</p>
                </div>

                {/* Arrows */}
                <div className="flex justify-center mb-6 md:mb-8">
                  <ArrowLeft className="w-5 md:w-6 h-5 md:h-6 text-[#FF4D00] rotate-90" />
                </div>

                {/* Creators */}
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {[
                    isRTL ? 'الزيرو' : 'Creator 1',
                    isRTL ? 'مبدع 2' : 'Creator 2',
                    isRTL ? 'مبدع 3' : 'Creator 3'
                  ].map((creator, index) => (
                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:border-[#FF4D00]/50 transition-colors"
                    >
                      <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-gradient-to-br from-[#FF4D00] to-[#FF9D00] mx-auto mb-1 md:mb-2 flex items-center justify-center">
                        <span className="text-sm md:text-lg font-bold text-white">
                          {creator[0]}
                        </span>
                      </div>
                      <p className="text-white text-xs md:text-sm font-medium">{creator}</p>
                      <p className="text-white/40 text-xs">{isRTL ? 'أكاديمية' : 'Academy'}</p>
                    </div>
                  ))}
                </div>

                {/* Label */}
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 px-3 md:px-4 py-1 bg-[#050505] border border-white/20 rounded-full">
                  <span className="text-xs text-white/70">{isRTL ? 'نحن نبني' : 'We Build'}</span>
                </div>
                <div className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 px-3 md:px-4 py-1 bg-[#050505] border border-white/20 rounded-full">
                  <span className="text-xs text-white/70">{isRTL ? 'المبدعون يبنون' : 'Creators Build'}</span>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -top-4 -right-4 w-20 md:w-24 h-20 md:h-24 border border-[#FF4D00]/30 rounded-full animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-12 md:w-16 h-12 md:h-16 border border-[#FF9D00]/30 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="text-center mt-12 md:mt-16 px-4">
            <p className="text-xl md:text-3xl text-white/80 italic max-w-4xl mx-auto leading-relaxed">
              {isRTL ? (
                <>
                  "نحن نوفر لهم <span className="dragon-gradient-text font-bold">Hogwarts</span>، 
                  وهم <span className="text-white font-bold">رؤساء المنازل</span> والمعلمون"
                </>
              ) : (
                <>
                  "We provide them <span className="dragon-gradient-text font-bold">Hogwarts</span>, 
                  and they are the <span className="text-white font-bold">House Masters</span> and Teachers"
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreModel;
