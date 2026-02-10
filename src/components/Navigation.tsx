import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#philosophy', label: t('nav.philosophy') },
    { href: '#model', label: t('nav.model') },
    { href: '#pillars', label: t('nav.pillars') },
    { href: '#ai', label: t('nav.ai') },
    { href: '#business', label: t('nav.business') },
    { href: '#journey', label: t('nav.journey') },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">🐉</span>
            <span
              className="text-xl font-bold dragon-gradient-text hidden sm:block"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              DRAGON
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-white/70 hover:text-white transition-colors text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4D00] to-[#FF9D00] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Language Button & CTA */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10"
              title={t('nav.language')}
            >
              <Globe size={18} />
              <span className="hidden sm:inline">{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('#cta')}
              className="hidden lg:block dragon-button-primary text-sm py-2 px-6"
            >
              {language === 'en' ? 'Join Now' : 'انضم الآن'}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className={`section-padding py-6 flex flex-col gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-white/70 hover:text-white transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#cta')}
            className="dragon-button-primary text-sm py-3 mt-4 w-full"
          >
            {language === 'en' ? 'Join Now' : 'انضم الآن'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
