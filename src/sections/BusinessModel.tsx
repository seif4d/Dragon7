import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Cloud, ShoppingCart, Coins, TrendingUp } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

gsap.registerPlugin(ScrollTrigger);

interface RevenueStream {
  icon: React.ElementType;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  details: string[];
  detailsEn: string[];
  color: string;
}

const revenueStreams: RevenueStream[] = [
  {
    icon: Users,
    title: 'اشتراكات الأعضاء',
    titleEn: 'Member Subscriptions',
    description: 'شهرية/سنوية',
    descriptionEn: 'Monthly/Yearly',
    details: [
      'الوصول لأدوات Dragon Mind',
      'المجتمع والتواصل',
      'المعسكرات الحصرية',
      'محتوى premium',
    ],
    detailsEn: [
      'Access to Dragon Mind tools',
      'Community and network',
      'Exclusive camps',
      'Premium content',
    ],
    color: '#FF4D00',
  },
  {
    icon: Cloud,
    title: 'اشتراكات المبدعين',
    titleEn: 'Creator Subscriptions',
    description: 'SaaS للصناع',
    descriptionEn: 'SaaS for Creators',
    details: [
      'استضافة الأكاديمية',
      'أدوات إدارة الطلاب',
      'نظام الـ XP والRanks',
      'تحليلات متقدمة',
    ],
    detailsEn: [
      'Academy hosting',
      'Student management tools',
      'XP and Ranks system',
      'Advanced analytics',
    ],
    color: '#FF9D00',
  },
  {
    icon: ShoppingCart,
    title: 'عمولة السوق',
    titleEn: 'Marketplace Fees',
    description: 'نسبة من المبيعات',
    descriptionEn: 'Revenue share',
    details: [
      'مبيعات الـ Marketplace',
      'عقود الـ Dragon Hunt',
      'خدمات الأعضاء',
      'المنتجات الرقمية',
    ],
    detailsEn: [
      'Marketplace sales',
      'Dragon Hunt contracts',
      'Member services',
      'Digital products',
    ],
    color: '#FFD700',
  },
  {
    icon: Coins,
    title: 'العملة الرقمية',
    titleEn: 'Digital Currency',
    description: 'Dragon Coins',
    descriptionEn: 'Dragon Coins',
    details: [
      'مميزات تجميلية للـ Realm',
      'أدوات إضافية',
      'شراء XP boosters',
      'هدايا للأعضاء',
    ],
    detailsEn: [
      'Cosmetic realm features',
      'Additional tools',
      'XP boosters',
      'Member rewards',
    ],
    color: '#00FF88',
  },
];

const BusinessModel = () => {
  const { isRTL } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.business-title',
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
        '.revenue-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.revenue-grid',
            start: 'top 80%',
          },
        }
      );

      // Counter animation
      gsap.fromTo(
        '.stat-number',
        { textContent: 0 },
        {
          textContent: 100,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="business"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a1a0a] to-[#050505]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00FF88]/5 rounded-full blur-[150px]" />
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-[#00FF88]" />
              <span className="business-title inline-block text-[#00FF88] text-xs md:text-sm font-medium tracking-wider uppercase">
                {isRTL ? 'نموذج العمل' : 'Business Model'}
              </span>
            </div>
            <h2 className="business-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-white">{isRTL ? 'اقتصاد ' : 'Economy of '}</span>
              <span className="dragon-gradient-text">{isRTL ? 'الإمبراطورية' : 'the Empire'}</span>
            </h2>
            <p className="business-title text-base md:text-xl text-white/60 max-w-3xl mx-auto px-4">
              {isRTL ? 'مصادر متعددة للدخل تضمان استدامة المنصة ونموها' : 'Multiple income streams ensure platform sustainability and growth'}
            </p>
          </div>

          {/* Revenue Streams Grid */}
          <div className="revenue-grid grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
            {revenueStreams.map((stream, index) => (
              <div
                key={index}
                className="revenue-card dragon-card p-4 md:p-6 rounded-xl md:rounded-2xl group relative overflow-hidden"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon */}
                <div
                  className="w-12 md:w-16 h-12 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${stream.color}20` }}
                >
                  <stream.icon className="w-6 md:w-8 h-6 md:h-8" style={{ color: stream.color }} />
                </div>

                {/* Content */}
                <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">{isRTL ? stream.title : stream.titleEn}</h3>
                <p className="text-white/50 text-xs md:text-sm mb-3 md:mb-4">{isRTL ? stream.description : stream.descriptionEn}</p>

                {/* Details - Show on hover */}
                <ul
                  className={`space-y-1.5 md:space-y-2 transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
                  } overflow-hidden`}
                >
                  {(isRTL ? stream.details : stream.detailsEn).map((detail, dIndex) => (
                    <li key={dIndex} className="flex items-center gap-2 text-xs md:text-sm text-white/70">
                      <div
                        className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: stream.color }}
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Glow Effect */}
                <div
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                  style={{ backgroundColor: stream.color }}
                />
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="stats-section grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl">
            {[
              { value: '10K+', label: isRTL ? 'عضو متوقع' : 'Expected Members' },
              { value: '50+', label: isRTL ? 'مبدع' : 'Creators' },
              { value: '12', label: isRTL ? 'ركيزة' : 'Pillars' },
              { value: '3', label: isRTL ? 'شخصيات AI' : 'AI Characters' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="stat-number text-2xl md:text-4xl lg:text-5xl font-bold dragon-gradient-text mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 md:mt-16 text-center px-4">
            <p className="text-base md:text-lg text-white/60 mb-6">
              {isRTL ? 'هل أنت مستثمر أو مبدع مهتم بالانضمام لرحلتنا؟' : 'Are you an investor or creator interested in joining our journey?'}
            </p>
            <button className="dragon-button-primary">
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;
