import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { mainTabs } from '../../data/navigation';
import ThemeToggle from '../ui/ThemeToggle';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function HireMeButton({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hire-me-btn btn-primary hidden lg:inline-flex"
      style={{ outlineColor: 'var(--border-focus)' }}
    >
      Hire Me
    </button>
  );
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef    = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const firstFocusable = drawer.querySelector<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeMobileMenu(); return; }
      if (e.key !== 'Tab') return;
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.closest('[hidden]'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    requestAnimationFrame(() => hamburgerRef.current?.focus());
  }, []);

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setActiveTab]);

  return (
    <>
      <header className="nav-glass">
        <div className="portfolio-container h-full grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-4">

          {/* ── Left: Avatar + Name + Role ── */}
          <button
            onClick={() => handleTabClick('overview')}
            className="flex items-center gap-3 group shrink-0 rounded-lg justify-self-start focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ outlineColor: 'var(--border-focus)' }}
            aria-label="Go to overview — Tushar, Lead Salesforce Architect"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-on-brand font-black text-base shrink-0 group-hover:scale-105 transition-transform duration-200"
              style={{
                background: 'var(--gradient-brand)',
                boxShadow: 'var(--shadow-brand)',
              }}
              aria-hidden="true"
            >
              T
            </div>

            <div className="hidden min-[480px]:flex flex-col justify-center leading-none gap-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-[13px] font-black tracking-[0.14em] uppercase"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Tushar
                </span>
                <span
                  className="w-[7px] h-[7px] rounded-full shrink-0 animate-pulse"
                  style={{ backgroundColor: 'var(--brand-emerald)' }}
                  aria-hidden="true"
                />
              </div>
              <span
                className="text-[10px] uppercase tracking-[0.14em] font-semibold"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Lead SFDC Architect
              </span>
            </div>
          </button>

          {/* ── Center: Clean horizontal nav (desktop) ── */}
          <nav
            aria-label="Main navigation"
            className="nav-bar-menu hidden lg:flex justify-self-center"
          >
            {mainTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`nav-bar-link focus-visible:outline-2 focus-visible:outline-offset-2${isActive ? ' nav-bar-link-active' : ''}`}
                  style={{ outlineColor: 'var(--border-focus)' }}
                >
                  <span>{tab.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="nav-bar-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── Right: Theme toggle + Hire Me + Mobile menu ── */}
          <div className="flex items-center gap-3 shrink-0 justify-self-end">
            <ThemeToggle />
            <HireMeButton onClick={() => handleTabClick('contact')} />

            <button
              ref={hamburgerRef}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-150"
              style={{
                backgroundColor: 'var(--interactive-default)',
                color: 'var(--text-primary)',
              }}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-40 lg:hidden"
            role="presentation"
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(4px)' }}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            <motion.nav
              id="mobile-nav-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 38 }}
              className="absolute top-0 right-0 bottom-0 w-72 max-w-[85vw] flex flex-col pt-24 pb-8 px-6"
              style={{
                backgroundColor: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <button
                className="absolute top-6 right-5 w-9 h-9 flex items-center justify-center rounded-lg"
                style={{
                  backgroundColor: 'var(--interactive-default)',
                  color: 'var(--text-secondary)',
                }}
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
              >
                <X size={17} aria-hidden="true" />
              </button>

              <p className="text-label mb-5 px-1" style={{ color: 'var(--text-muted)' }}>
                Navigation
              </p>

              <div className="flex flex-col gap-1 flex-grow">
                {mainTabs.map((tab, i) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.20 }}
                      onClick={() => handleTabClick(tab.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`mobile-nav-link text-[15px] font-medium text-left transition-all duration-150${isActive ? ' mobile-nav-link-active' : ''}`}
                    >
                      <Icon
                        size={16}
                        aria-hidden="true"
                        className="relative z-10 shrink-0"
                        style={{ color: isActive ? 'var(--brand-primary)' : 'var(--text-muted)' }}
                      />
                      <span className="relative z-10">{tab.name}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div
                className="pt-5 mt-auto border-t flex flex-col gap-3"
                style={{ borderTopColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    Appearance
                  </span>
                  <ThemeToggle size="sm" />
                </div>
                <button
                  onClick={() => handleTabClick('contact')}
                  className="hire-me-btn btn-primary w-full"
                  style={{ outlineColor: 'var(--border-focus)' }}
                >
                  Hire Me
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
