import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, DoorOpen, Flame, Sword, Crown, Star } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

gsap.registerPlugin(ScrollTrigger);

interface JourneyStage {
  icon: React.ElementType;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  color: string;
}

const journeyStages: JourneyStage[] = [
  {
    icon: User,
    title: 'الغريب',
    titleEn: 'The Stranger',
    description: 'يسمع عن الأسطورة',
    descriptionEn: 'Hears the legend',
    color: '#666666',
  },
  {
    icon: DoorOpen,
    title: 'المتقدم',
    titleEn: 'The Applicant',
    description: 'يقف عند البوابة',
    descriptionEn: 'Stands at the gate',
    color: '#FF4D00',
  },
  {
    icon: Flame,
    title: 'المبتدئ (Ember)',
    titleEn: 'Ember',
    description: 'يبني الـ PDP وينضم لأكاديمية',
    descriptionEn: 'Builds PDP and joins academy',
    color: '#FF6B00',
  },
  {
    icon: Sword,
    title: 'المحارب',
    titleEn: 'The Warrior',
    description: 'يركب القطار ويدخل المعسكرات',
    descriptionEn: 'Rides the Express and enters camps',
    color: '#FF9D00',
  },
  {
    icon: Crown,
    title: 'التنين',
    titleEn: 'The Dragon',
    description: 'يبيع مشاريعه ويتوظف',
    descriptionEn: 'Sells projects and gets hired',
    color: '#FFD700',
  },
  {
    icon: Star,
    title: 'الأسطورة',
    titleEn: 'The Legend',
    description: 'يصبح Creator أو Mentor',
    descriptionEn: 'Becomes Creator or Mentor',
    color: '#00C6FF',
  },
];

const UserJourney = () => {
  const { isRTL } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.journey-title',
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

      // Path drawing animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.journey-path',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      }

      // Stage cards animation
      gsap.fromTo(
        '.stage-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.journey-stages',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#1a0a00] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4D00]/5 rounded-full blur-[150px]" />
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="journey-title inline-block text-[#FF9D00] text-xs md:text-sm font-medium tracking-wider uppercase mb-4">
              {isRTL ? 'رحلة التحول' : 'Journey of Transformation'}
            </span>
            <h2 className="journey-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-white">{isRTL ? 'من ' : 'From '}</span>
              <span className="text-white/50">{isRTL ? 'الغريب' : 'Stranger'}</span>
              <span className="text-white">{isRTL ? '... إلى ' : '... To '}</span>
              <span className="dragon-gradient-text">{isRTL ? 'الأسطورة' : 'Legend'}</span>
            </h2>
            <p className="journey-title text-base md:text-xl text-white/60 max-w-3xl mx-auto px-4">
              {isRTL ? 'رحلة ست مراحل تأخذك من لا شيء إلى كل شيء' : 'Six stages that take you from nothing to everything'}
            </p>
          </div>

          {/* Journey Visual */}
          <div className="journey-stages relative">
            {/* Desktop: Horizontal Timeline */}
            <div className="hidden lg:block">
              {/* Path SVG */}
              <div className="journey-path absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <path
                    ref={pathRef}
                    d="M 0 8 Q 150 8, 200 8 T 400 8 T 600 8 T 800 8 T 1000 8 T 1200 8"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#666666" />
                      <stop offset="20%" stopColor="#FF4D00" />
                      <stop offset="40%" stopColor="#FF6B00" />
                      <stop offset="60%" stopColor="#FF9D00" />
                      <stop offset="80%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#00C6FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Stages */}
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4 relative">
                {journeyStages.map((stage, index) => (
                  <div
                    key={index}
                    className="stage-card flex flex-col items-center text-center"
                  >
                    {/* Icon Circle */}
                    <div
                      className="w-12 lg:w-20 h-12 lg:h-20 rounded-full flex items-center justify-center mb-2 lg:mb-4 border-2 lg:border-4 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: `${stage.color}20`,
                        borderColor: stage.color,
                      }}
                    >
                      <stage.icon className="w-5 lg:w-8 h-5 lg:h-8" style={{ color: stage.color }} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xs lg:text-lg font-bold text-white mb-0.5 lg:mb-1">{isRTL ? stage.title : stage.titleEn}</h3>
                    <p className="text-xs lg:text-sm text-white/50 line-clamp-2">{isRTL ? stage.description : stage.descriptionEn}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Vertical Timeline */}
            <div className="lg:hidden space-y-6">
              {journeyStages.map((stage, index) => (
                <div
                  key={index}
                  className="stage-card flex items-start gap-3 md:gap-4"
                >
                  {/* Icon */}
                  <div
                    className="w-10 md:w-16 h-10 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                    style={{
                      backgroundColor: `${stage.color}20`,
                      borderColor: stage.color,
                    }}
                  >
                    <stage.icon className="w-4 md:w-6 h-4 md:h-6" style={{ color: stage.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                      <span
                        className="w-5 md:w-6 h-5 md:h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: stage.color, color: '#000' }}
                      >
                        {index + 1}
                      </span>
                      <h3 className="text-sm md:text-lg font-bold text-white">{isRTL ? stage.title : stage.titleEn}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-white/50">{isRTL ? stage.description : stage.descriptionEn}</p>
                  </div>

                  {/* Connector */}
                  {index < journeyStages.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-[#FF4D00] to-[#FF9D00]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="mt-12 md:mt-20 text-center px-4">
            <div className="inline-block p-6 md:p-8 bg-gradient-to-r from-[#FF4D00]/10 via-[#FF9D00]/10 to-[#FFD700]/10 border border-white/10 rounded-2xl md:rounded-3xl">
              <p className="text-lg md:text-3xl text-white/90 italic leading-relaxed">
                {isRTL ? (
                  <>
                    "كل رحلة تبدأ بخطوة... 
                    <span className="dragon-gradient-text font-bold">خطوتك تبدأ الآن</span>"
                  </>
                ) : (
                  <>
                    "Every journey starts with a step... 
                    <span className="dragon-gradient-text font-bold">Your step starts now</span>"
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserJourney;
