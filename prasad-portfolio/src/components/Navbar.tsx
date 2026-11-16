import { Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
  onDownloadResume: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Internship', href: '#internship' },
  { label: 'Projects', href: '#projects' },
];

export function Navbar({ onDownloadResume }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => el !== null
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#1A2F57] bg-[#071124]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8">
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
        >
          Prasad M
        </a>

        {/* Inline nav for Laptop (1024px+) and Desktop (1280px+) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 ${
                  isActive
                    ? 'text-sky-400 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-sky-400'
                    : 'hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onDownloadResume}
            className="hidden sm:inline-flex min-h-10 items-center gap-2 rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-300 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>Download Resume</span>
          </button>

          {/* Drawer toggle for Mobile and Tablet (< 1024px) */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#1E3561] text-slate-200 transition-colors duration-150 hover:bg-[#102142] hover:text-white lg:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[#1A2F57] bg-[#0B1730] px-4 py-4 sm:px-6 lg:hidden">
          <nav aria-label="Mobile and Tablet Navigation" className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {NAV_LINKS.map((item) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-sky-400/15 text-sky-300'
                      : 'text-slate-200 hover:bg-[#132549] hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onDownloadResume();
              }}
              className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-300 sm:hidden cursor-pointer"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download Resume</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
