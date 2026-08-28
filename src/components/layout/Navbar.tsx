import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { mainTabs } from '../../data/navigation';
import ThemeToggle from '../ui/ThemeToggle';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef    = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  /* ── Focus trap ── */
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const firstFocusable = drawer.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
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
      {/* ════════════════════════════════════════
          HEADER  — 72px tall, breathing room
      ════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 w-full z-50 flex justify-center transition-all duration-300"
        style={{
          height: '72px',
          backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid var(--nav-border)'
            : '1px solid transparent',
          boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="portfolio-container flex items-center justify-between h-full">

          {/* ── Brand ── */}
          <button
            onClick={() => handleTabClick('overview')}
            className="flex items-center gap-3 group shrink-0 rounded-xl"
            style={{ outlineColor: 'var(--border-focus)' }}
            aria-label="Go to overview — Tushar, Lead Salesforce Architect"
          >
            {/* Logo mark — slightly larger at 40px */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base shrink-0 group-hover:scale-105 transition-transform duration-200"
              style={{
                background: 'var(--gradient-brand)',
                boxShadow: 'var(--shadow-brand)',
              }}
              aria-hidden="true"
            >
              T
            </div>

            {/* Brand text */}
            <div className="hidden min-[480px]:flex flex-col justify-center leading-none gap-0.5">
              <div className="flex items-center gap-2">
                <span
                  className="text-[14px] font-black tracking-widest uppercase"
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
                className="text-[10.5px] uppercase tracking-[0.12em] font-semibold"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Lead SFDC Architect
              </span>
            </div>
          </button>

          {/* ── Desktop nav (md+) ──
              Clean underline-style, no pill/box container.
              Feels like a premium product nav.           */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center"
            style={{ gap: '0.125rem' }}
          >
            {mainTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative px-3.5 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1"
                  style={{
                    color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    outlineColor: 'var(--border-focus)',
                    letterSpacing: '0.005em',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)';
                  }}
                >
                  {tab.name}

                  {/* Animated active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] rounded-full"
                      style={{ background: 'var(--brand-primary)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 42 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2.5 shrink-0">
            <ThemeToggle />

            {/* Hire Me — clean, not pill-shaped */}
            <button
              onClick={() => handleTabClick('contact')}
              className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: 'var(--gradient-brand)',
                boxShadow: 'var(--shadow-brand)',
                minHeight: '38px',
                outlineColor: 'var(--border-focus)',
              }}
            >
              Hire Me
            </button>

            {/* Hamburger — mobile only */}
            <button
              ref={hamburgerRef}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border transition-colors duration-150"
              style={{
                backgroundColor: 'var(--interactive-default)',
                borderColor: 'var(--border-default)',
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

      {/* ════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-40 md:hidden"
            role="presentation"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(4px)' }}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Panel */}
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
              className="absolute top-0 right-0 bottom-0 w-72 max-w-[85vw] flex flex-col pt-20 pb-8 px-6"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderLeft: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <button
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-lg border"
                style={{
                  backgroundColor: 'var(--interactive-default)',
                  borderColor: 'var(--border-default)',
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
                      className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] font-medium text-left transition-all duration-150 border"
                      style={
                        isActive
                          ? {
                              background: 'var(--brand-primary-tint)',
                              borderColor: 'var(--brand-primary-border)',
                              color: 'var(--text-primary)',
                            }
                          : {
                              backgroundColor: 'transparent',
                              borderColor: 'transparent',
                              color: 'var(--text-secondary)',
                            }
                      }
                    >
                      <Icon
                        size={16}
                        aria-hidden="true"
                        style={{ color: isActive ? 'var(--brand-primary)' : 'var(--text-muted)', flexShrink: 0 }}
                      />
                      <span>{tab.name}</span>
                      {isActive && (
                        <span
                          className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: 'var(--brand-primary)' }}
                          aria-hidden="true"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom */}
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
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background: 'var(--gradient-brand)',
                    boxShadow: 'var(--shadow-brand)',
                    outlineColor: 'var(--border-focus)',
                  }}
                >
                  Get In Touch
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
