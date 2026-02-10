import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Briefcase, Target, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const { isRTL } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animations
      gsap.fromTo(
        '.philosophy-title',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.philosophy-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      gsap.fromTo(
        '.philosophy-card',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.philosophy-cards',
            start: 'top 80%',
          },
        }
      );

      // Image parallax
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Brain,
      title: isRTL ? 'صلب من الداخل' : 'Strong Inside',
      subtitle: isRTL ? 'العقل والروح' : 'Mind & Soul',
      description: isRTL ? 'عقل قوي، روح متزنة، إرادة حديدية' : 'Strong mind, balanced soul, iron will',
      color: '#FF4D00',
    },
    {
      icon: Briefcase,
      title: isRTL ? 'محترف من الخارج' : 'Professional Outside',
      subtitle: isRTL ? 'المهارات والمشاريع' : 'Skills & Projects',
      description: isRTL ? 'مهارات تقنية، مشاريع عملية، خبرة حقيقية' : 'Technical skills, practical projects, real experience',
      color: '#FF9D00',
    },
    {
      icon: Target,
      title: isRTL ? 'مؤثر في الواقع' : 'Impact the Reality',
      subtitle: isRTL ? 'العمل والمال' : 'Jobs & Money',
      description: isRTL ? 'وظيفة مرموقة، دخل مستقر، تأثير ملموس' : 'Prestigious job, stable income, tangible impact',
      color: '#FFD700',
    },
  ];

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-1/2 h-full opacity-20`}>
        <div
          ref={imageRef}
          className="absolute inset-0"
        >
          <img
            src="/dragon-eye.jpg"
            alt="Dragon Eye"
            className={`w-full h-full object-cover rounded-${isRTL ? 'r' : 'l'}-full`}
          />
          <div className={`absolute inset-0 bg-gradient-to-${isRTL ? 'l' : 'r'} from-[#050505] via-[#050505]/50 to-transparent`} />
        </div>
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
        {/* Section Header */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#FF4D00]" />
              <span className="text-[#FF4D00] text-xs md:text-sm font-medium tracking-wider uppercase">
                {isRTL ? 'الرؤية والفلسفة' : 'Vision & Philosophy'}
              </span>
            </div>
            <h2 className="philosophy-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-white">{isRTL ? 'من ' : 'From '}</span>
              <span className="text-white/50 line-through">{isRTL ? 'الفوضى' : 'Chaos'}</span>
              <span className="text-white">{isRTL ? '... إلى ' : '... To '}</span>
              <span className="dragon-gradient-text">{isRTL ? 'النظام' : 'System'}</span>
            </h2>
            <p className="philosophy-text text-base md:text-xl text-white/70 max-w-2xl leading-relaxed">
              {isRTL ? 'نحن لا نعلّمك كيف تبدو عظيمًا... نحن نعيد صياغتك لتكون عظيمًا.' : 'We don\'t teach you how to look great... we rebuild you to be great.'}
            </p>
          </div>

          {/* Quote */}
          <div className={`philosophy-text relative mb-12 md:mb-16 p-6 md:p-12 bg-gradient-to-${isRTL ? 'l' : 'r'} from-white/5 to-transparent border-${isRTL ? 'l' : 'r'}-4 border-[#FF4D00] rounded-${isRTL ? 'l' : 'r'}-2xl`}>
            <span className={`absolute top-4 ${isRTL ? 'left-8' : 'right-8'} text-6xl text-[#FF4D00]/20 font-serif`}>{isRTL ? '״' : '"'}</span>
            <p className="text-xl md:text-3xl text-white/90 italic leading-relaxed relative z-10">
              {isRTL ? 'العالم مليء بالكورسات، لكنه يفتقر إلى التحول.' : 'The world is full of courses, but it lacks transformation.'}
            </p>
            <p className="text-base md:text-lg text-white/50 mt-4">
              {isRTL ? 'المدارس التقليدية تعطيك "قشرة" المعرفة... DRAGON هي بنية تحتية ومنظومة حياة' : 'Traditional schools give you the "shell" of knowledge... DRAGON is infrastructure and a lifestyle system.'}
            </p>
          </div>

          {/* Three Pillars */}
          <div className="philosophy-cards grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="philosophy-card dragon-card p-8 rounded-2xl group"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${pillar.color}20` }}
                >
                  <pillar.icon className="w-8 h-8" style={{ color: pillar.color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-white/50 mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {pillar.subtitle}
                </p>
                <p className="text-white/70 leading-relaxed">{pillar.description}</p>
                
                {/* Hover Effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${pillar.color}20, transparent 70%)`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Bottom Text */}
          <div className="philosophy-text mt-12 md:mt-16 text-center">
            <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto px-4">
              {isRTL ? (
                <>
                  هدفنا أخذ الإنسان من حالة التشتت والهشاشة، وصهره في فرن من الانضباط، 
                  والعلم، والعمل الجماعي، ليخرج <span className="dragon-gradient-text font-bold">تنينًا</span>
                </>
              ) : (
                <>
                  Our goal is to take the individual from a state of distraction and fragility, 
                  melt them in a furnace of discipline, knowledge, and teamwork, to emerge a <span className="dragon-gradient-text font-bold">Dragon</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
