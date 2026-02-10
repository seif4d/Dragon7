import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

gsap.registerPlugin(ScrollTrigger);

interface Pillar {
  number: string;
  nameAr: string;
  nameEn: string;
  description: string;
  fullDescription: string;
  image: string;
}

const pillars: Pillar[] = [
  {
    number: 'I',
    nameAr: 'بوابة التنين',
    nameEn: 'Dragon Gate',
    description: 'الفلترة والتصنيف الذكي',
    fullDescription: 'لا دخول عشوائي. تحليل شخصية (DNA) + مقابلة ذكية لتحديد نقاط القوة والضعف، وتوجيه المستخدم لأفضل Clan أو مسار.',
    image: '/pillar-gate.jpg',
  },
  {
    number: 'II',
    nameAr: 'عقل التنين',
    nameEn: 'Dragon Mind',
    description: 'نظام تشغيل حياتك',
    fullDescription: 'PDP ديناميكي، Habit Tracker، Focus Timers، Journaling - كل ما تحتاجه لبناء انضباطك اليومي.',
    image: '/pillar-mind.jpg',
  },
  {
    number: 'III',
    nameAr: 'أكاديميات المبدعين',
    nameEn: 'Creator Clans',
    description: 'التعليم التقني والمهاري',
    fullDescription: 'كل صانع محتوى له أكاديمية داخل DRAGON. طلابه يدخلون في نظام الـ XP, Ranks, Projects الكامل.',
    image: '/pillar-academy.jpg',
  },
  {
    number: 'IV',
    nameAr: 'قطار التنين',
    nameEn: 'Dragon Express',
    description: 'الطقس النفسي قبل التعلم',
    fullDescription: 'تجربة غامرة لمدة دقيقة تهيئك نفسيًا، تفصلك عن العالم، وتدخلك في "مود" التركيز مع رفاقك.',
    image: '/pillar-express.jpg',
  },
  {
    number: 'V',
    nameAr: 'المعسكرات',
    nameEn: 'Dragon Camps',
    description: 'التدريب المكثف',
    fullDescription: 'برامج قصيرة (14-30 يوم) مغلقة على عدد معين: معسكر الانضباط الحديدي، معسكر بناء المنتج.',
    image: '/pillar-camp.jpg',
  },
  {
    number: 'VI',
    nameAr: 'منطقة المشاريع',
    nameEn: 'Forge & Projects',
    description: 'التطبيق العملي الجماعي',
    fullDescription: 'مساحة عمل تشبه Trello/Jira لكن بأسلوب ملحمي. فرق العمل تقسم المهام وتنتج منتجات حقيقية.',
    image: '/pillar-forge.jpg',
  },
  {
    number: 'VII',
    nameAr: 'مملكة التنين',
    nameEn: 'Dragon Realm',
    description: 'الهوية والبروفايل',
    fullDescription: 'ليس سيرة ذاتية مملة، بل "مملكة" بصرية تعرض مشاريعك، أوسمتك، مهاراتك، وتطورك.',
    image: '/pillar-realm.jpg',
  },
  {
    number: 'VIII',
    nameAr: 'ساحة القتال',
    nameEn: 'Dragon Arena',
    description: 'التنافس وإثبات الذات',
    fullDescription: 'مناظرات فكرية، تحديات كود (Coding Battles)، ومسابقات مشاريع (Boss Fights).',
    image: '/pillar-arena.jpg',
  },
  {
    number: 'IX',
    nameAr: 'صيد التنين',
    nameEn: 'Dragon Hunt',
    description: 'التوظيف والفرص',
    fullDescription: 'الشركات تطرح "مهمات" (Quests). من ينجز المهمة يحصل على المقابلة أو العقد مباشرة.',
    image: '/pillar-hunt.jpg',
  },
  {
    number: 'X',
    nameAr: 'استوديو التنين',
    nameEn: 'Dragon Studio',
    description: 'صناعة المحتوى الشخصي',
    fullDescription: 'يوتيوب داخلي للأعضاء لتوثيق رحلتهم، شرح ما تعلموه، وبناء براند شخصي.',
    image: '/pillar-studio.jpg',
  },
  {
    number: 'XI',
    nameAr: 'السوق',
    nameEn: 'Dragon Store',
    description: 'الاقتصاد الداخلي',
    fullDescription: 'بيع مشاريع الـ Forge، خدمات الأعضاء، منتجات رقمية، أو Merch خاص بالمنصة.',
    image: '/pillar-store.jpg',
  },
  {
    number: 'XII',
    nameAr: 'سجن التنين',
    nameEn: 'Dragon Jail',
    description: 'الردع والتهذيب',
    fullDescription: 'نظام تقويم صارم للمتخاذلين: مهام شاقة، حرمان من الرفاهيات حتى يستعيد الشرف.',
    image: '/pillar-jail.jpg',
  },
];

const Pillars = () => {
  const { isRTL } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pillars-title',
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
        '.pillar-item',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pillars-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pillars"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF4D00]/5 rounded-full blur-[150px]" />
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="pillars-title inline-block text-[#FF4D00] text-xs md:text-sm font-medium tracking-wider uppercase mb-4">
              {isRTL ? 'هيكل الإمبراطورية' : 'Empire Structure'}
            </span>
            <h2 className="pillars-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              <span className="dragon-gradient-text">{isRTL ? 'الـ 12 ركيزة' : 'The 12 Pillars'}</span>
            </h2>
            <p className="pillars-title text-base md:text-xl text-white/60 max-w-3xl mx-auto px-4">
              {isRTL ? 'المكونات الأساسية لمنظومة DRAGON المتكاملة' : 'The core components of the integrated DRAGON system'}
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="pillars-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="pillar-item group relative cursor-pointer"
                onClick={() => setSelectedPillar(pillar)}
              >
                <div className="dragon-card rounded-2xl overflow-hidden h-full">
                  {/* Image */}
                  <div className="relative h-32 md:h-48 overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.nameAr}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                    
                    {/* Number */}
                    <div className="absolute top-2 md:top-4 right-2 md:right-4 w-8 md:w-10 h-8 md:h-10 rounded-full bg-[#FF4D00]/20 border border-[#FF4D00]/50 flex items-center justify-center">
                      <span className="text-[#FF4D00] font-bold text-xs md:text-sm" style={{ fontFamily: 'Cinzel, serif' }}>
                        {pillar.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-5">
                    <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-[#FF4D00] transition-colors">
                      {isRTL ? pillar.nameAr : pillar.nameEn}
                    </h3>
                    <p className="text-xs text-white/40 mb-2 md:mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {isRTL ? pillar.nameEn : pillar.nameAr}
                    </p>
                    <p className="text-xs md:text-sm text-white/60 line-clamp-2">{pillar.description}</p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#FF4D00]/50 transition-colors duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPillar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedPillar(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPillar(null)}
              className="absolute top-3 md:top-4 right-3 md:right-4 z-10 w-8 md:w-10 h-8 md:h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-[#FF4D00]/20 transition-colors"
            >
              <X className="w-4 md:w-5 h-4 md:h-5 text-white" />
            </button>

            {/* Image */}
            <div className="relative h-48 md:h-64">
              <img
                src={selectedPillar.image}
                alt={selectedPillar.nameAr}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              
              {/* Number Badge */}
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 w-12 md:w-16 h-12 md:h-16 rounded-full dragon-gradient-bg flex items-center justify-center">
                <span className="text-lg md:text-2xl font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                  {selectedPillar.number}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{isRTL ? selectedPillar.nameAr : selectedPillar.nameEn}</h3>
              <p className="text-[#FF4D00] text-xs md:text-base mb-3 md:mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {isRTL ? selectedPillar.nameEn : selectedPillar.nameAr}
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">{selectedPillar.fullDescription}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pillars;
