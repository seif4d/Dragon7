import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Eye, Shield, MessageCircle, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

gsap.registerPlugin(ScrollTrigger);

interface AICharacter {
  icon: React.ElementType;
  name: string;
  nameAr: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  color: string;
  gradient: string;
}

const aiCharacters: AICharacter[] = [
  {
    icon: GraduationCap,
    name: 'Mentor',
    nameAr: 'المرشد',
    description: 'يوجهك أكاديميًا ومهنيًا',
    descriptionEn: 'Guides you academically and professionally',
    features: [
      'يخطط لك مسارك التعليمي',
      'يشرح لك المفاهيم الصعبة',
      'يجيب على أسئلتك 24/7',
      'يوصيك بالمصادر المناسبة',
    ],
    featuresEn: [
      'Plans your learning path',
      'Explains difficult concepts',
      'Answers your questions 24/7',
      'Recommends appropriate resources',
    ],
    color: '#FF4D00',
    gradient: 'from-[#FF4D00] to-[#FF9D00]',
  },
  {
    icon: Eye,
    name: 'Shadow',
    nameAr: 'الظل',
    description: 'يواجهك بعيوبك النفسية',
    descriptionEn: 'Confronts you with your psychological flaws',
    features: [
      'يكشف لك أعذارك الوهمية',
      'يواجهك بضعفك الحقيقي',
      'يذكرك بأهدافك عند التخاذل',
      'يتحدىك للخروج من منطقة الراحة',
    ],
    featuresEn: [
      'Reveals your false excuses',
      'Confronts your real weakness',
      'Reminds you of your goals when slacking',
      'Challenges you to leave your comfort zone',
    ],
    color: '#8E2DE2',
    gradient: 'from-[#8E2DE2] to-[#4A00E0]',
  },
  {
    icon: Shield,
    name: 'Guardian',
    nameAr: 'الحارس',
    description: 'يراقب التزامك وينبهك',
    descriptionEn: 'Monitors your commitment and alerts you',
    features: [
      'يتتبع عاداتك اليومية',
      'ينبهك عند الانحراف عن المسار',
      'يحتفل بإنجازاتك',
      'يحاسبك على تقصيرك',
    ],
    featuresEn: [
      'Tracks your daily habits',
      'Alerts you when you deviate from course',
      'Celebrates your achievements',
      'Holds you accountable for shortcomings',
    ],
    color: '#00C6FF',
    gradient: 'from-[#00C6FF] to-[#0072FF]',
  },
];

const DragonAI = () => {
  const { isRTL } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeChar, setActiveChar] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ai-title',
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
        '.ai-card',
        { opacity: 0, y: 60, rotateY: -20 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ai-cards',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.ai-visual',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ai-visual',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate characters
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChar((prev) => (prev + 1) % aiCharacters.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="ai"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0d0d1a] to-[#050505]" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#8E2DE2]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF4D00]/10 rounded-full blur-[150px]" />
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-[#8E2DE2]" />
              <span className="ai-title inline-block text-[#8E2DE2] text-xs md:text-sm font-medium tracking-wider uppercase">
                {isRTL ? 'الذكاء الاصطناعي' : 'Artificial Intelligence'}
              </span>
            </div>
            <h2 className="ai-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-white">{isRTL ? 'عقل ' : 'The Mind of '}</span>
              <span className="dragon-gradient-text">{isRTL ? 'التنين' : 'the Dragon'}</span>
            </h2>
            <p className="ai-title text-base md:text-xl text-white/60 max-w-3xl mx-auto px-4">
              {isRTL ? 'نظام AI متكامل يلعب أدوارًا متعددة في رحلتك' : 'An integrated AI system that plays multiple roles in your journey'}
            </p>
          </div>

          {/* Main Content */}
          <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            {/* Left: Visual */}
            <div className="ai-visual relative order-2 lg:order-1">
              <div className="relative aspect-square max-w-xs md:max-w-lg mx-auto">
                {/* Central Brain */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 md:w-48 h-32 md:h-48 rounded-full bg-gradient-to-br from-[#FF4D00]/20 to-[#8E2DE2]/20 border border-white/10 flex items-center justify-center animate-pulse-slow">
                      <img
                        src="/pillar-mind.jpg"
                        alt="Dragon Mind"
                        className="w-28 md:w-40 h-28 md:h-40 rounded-full object-cover"
                      />
                    </div>
                    
                    {/* Orbiting Icons */}
                    {aiCharacters.map((char, index) => {
                      const angle = (index * 120 - 90) * (Math.PI / 180);
                      const radius = Math.min(110, window.innerWidth > 768 ? 140 : 90);
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      
                      return (
                        <div
                          key={index}
                          className={`absolute w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
                            activeChar === index
                              ? 'scale-125 z-10'
                              : 'scale-100 opacity-60'
                          }`}
                          style={{
                            backgroundColor: `${char.color}30`,
                            borderColor: char.color,
                            borderWidth: '2px',
                            transform: `translate(${x}px, ${y}px)`,
                            left: '50%',
                            top: '50%',
                            marginLeft: '-24px',
                            marginTop: '-24px',
                          }}
                          onClick={() => setActiveChar(index)}
                        >
                          <char.icon className="w-5 md:w-7 h-5 md:h-7" style={{ color: char.color }} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Decorative Rings */}
                <div className="absolute inset-0 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-8 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                <div className="absolute inset-16 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
              </div>
            </div>

            {/* Right: Cards */}
            <div className="ai-cards space-y-3 md:space-y-4 order-1 lg:order-2">
              {aiCharacters.map((char, index) => (
                <div
                  key={index}
                  className={`ai-card dragon-card p-4 md:p-6 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-500 ${
                    activeChar === index ? 'border-[#FF4D00]/50 bg-white/5' : ''
                  }`}
                  onClick={() => setActiveChar(index)}
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    {/* Icon */}
                    <div
                      className={`w-10 md:w-14 h-10 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        activeChar === index ? 'scale-110' : ''
                      }`}
                      style={{ backgroundColor: `${char.color}20` }}
                    >
                      <char.icon className="w-5 md:w-7 h-5 md:h-7" style={{ color: char.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 md:mb-2 flex-wrap">
                        <h3 className="text-base md:text-xl font-bold text-white">{isRTL ? char.nameAr : char.name}</h3>
                        <span
                          className="text-xs md:text-sm px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: `${char.color}20`, color: char.color }}
                        >
                          {isRTL ? char.name : char.nameAr}
                        </span>
                      </div>
                      <p className="text-white/60 text-xs md:text-base mb-2 md:mb-3">{isRTL ? char.description : char.descriptionEn}</p>
                      
                      {/* Features - Show when active */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          activeChar === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <ul className="space-y-1.5 md:space-y-2">
                          {(isRTL ? char.features : char.featuresEn).map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-2 text-xs md:text-sm text-white/70">
                              <MessageCircle className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" style={{ color: char.color }} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl">
              <Sparkles className="w-6 h-6 text-[#FFD700]" />
              <p className="text-lg text-white/80">
                ثلاث شخصيات AI تعمل معًا لضمان نجاح رحلتك
              </p>
              <Sparkles className="w-6 h-6 text-[#FFD700]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DragonAI;
