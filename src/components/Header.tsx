import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const LOGO_URL = 'https://theclosecode.co.ke/wp-content/uploads/2025/09/thecloselogo-1.png';

const NAV_ITEMS = [
  { label: 'Home', href: 'https://theclosecode.co.ke/?utm_source=menu_home&utm_medium=menuclick&utm_campaign=navigation' },
  { label: 'Shop', href: 'https://theclosecode.co.ke/shop/?utm_source=menu_shop&utm_medium=menuclick&utm_campaign=navigation' },
  { label: 'Courses', href: 'https://theclosecode.co.ke/courses/?utm_source=menu_courses&utm_medium=menuclick&utm_campaign=navigation' },
  { label: 'Blog', href: 'https://theclosecode.co.ke/blog/' },
  { label: 'About Us', href: 'https://theclosecode.co.ke/about-us/?utm_source=menu_aboutme&utm_medium=menuclick&utm_campaign=navigation' },
  { label: 'Contact', href: 'https://theclosecode.co.ke/contact-us/?utm_source=menu_contact_us&utm_medium=menuclick&utm_campaign=navigation' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Append keyframe styles for wave animation if not already present
    if (!document.head.querySelector('#header-wave-styles')) {
      const styleElement = document.createElement('style');
      styleElement.setAttribute('id', 'header-wave-styles');
      styleElement.innerHTML = `
        @keyframes wave-translate { 0% { transform: translateX(-4%);} 50% { transform: translateX(4%);} 100% { transform: translateX(-4%);} }
        .animate-wave { animation: wave-translate 6s linear infinite; transform-origin: center; }
      `;
      document.head.appendChild(styleElement);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Outer background change applied only when scrolled */}
      <div className={`transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : ''}`}>
        {/* Inner container which will visually expand/shrink */}
        <div
          style={{
            borderBottomLeftRadius: scrolled ? 0 : '20%',
            borderBottomRightRadius: scrolled ? 0 : '20%',
          }}
          className={`mx-4 md:mx-12 transition-all duration-300 ${scrolled ? 'py-3 md:py-4 rounded-none' : 'py-8 md:py-12'}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <a href="https://theclosecode.co.ke/?utm_source=menu_home&utm_medium=menuclick&utm_campaign=navigation" className="flex items-center gap-3">
                <img src={LOGO_URL} alt="The Close Code" className="h-8"/>
              </a>

              <nav className="hidden md:flex items-center gap-6">
                {NAV_ITEMS.map((item) => (
                  <a key={item.href} href={item.href} className="text-sm font-medium text-slate-900 hover:text-[#ff5c35] transition-colors">
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="md:hidden">
                <button onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Toggle menu" className="p-2 rounded-md bg-white/80 backdrop-blur-md shadow-md">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Curve (hidden when scrolled) */}
      {!scrolled && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -mb-1 overflow-hidden">
          <svg className="w-full h-10 md:h-12" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="curveGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#ff5c35" stopOpacity="0.07" />
                <stop offset="50%" stopColor="#215c9a" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#ff5c35" stopOpacity="0.07" />
              </linearGradient>
            </defs>
            <path className="animate-wave transition-all duration-700" fill="url(#curveGradient)" d="M0,60 C360,10 720,110 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
          <div className="px-4 py-3 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="block text-base font-semibold text-slate-900 py-2 hover:text-[#ff5c35]">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// animation styles are injected inside useEffect at runtime


