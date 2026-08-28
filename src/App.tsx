import { Component, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomeOverview from './components/home/HomeOverview';
import AboutView from './components/about/AboutView';
import ProjectsView from './components/projects/ProjectsView';
import ArchitectureView from './components/architecture/ArchitectureView';
import ExperienceView from './components/experience/ExperienceView';
import ContactView from './components/contact/ContactView';

/* ─────────────────────────────────────────────
   Error Boundary
   Prevents one broken component from white-screening the app.
───────────────────────────────────────────── */
interface EBState { hasError: boolean; message: string }

class ErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Portfolio ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            gap: '1rem',
            backgroundColor: 'var(--bg-page)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2.5rem' }}>⚠</div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Something went wrong</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.7 }}>
            An unexpected error occurred. Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              background: 'var(--gradient-brand)',
              color: '#fff',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ─────────────────────────────────────────────
   Page transition variants
   Typed correctly for Framer Motion v13
───────────────────────────────────────────── */
const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.30, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: [0.55, 0.06, 0.68, 0.19] as const },
  },
};

const PAGE_COMPONENTS: Record<string, React.FC<{ setActiveTab: (t: string) => void }>> = {
  overview:     HomeOverview as React.FC<{ setActiveTab: (t: string) => void }>,
  about:        () => <AboutView />,
  projects:     () => <ProjectsView />,
  architecture: () => <ArchitectureView />,
  experience:   () => <ExperienceView />,
  contact:      () => <ContactView />,
};

/* ─────────────────────────────────────────────
   Root application
───────────────────────────────────────────── */
function AppShell() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const PageComponent = PAGE_COMPONENTS[activeTab];

  return (
    /* Root div consumes semantic bg/text tokens — no hardcoded colours */
    <div
      className="w-full min-h-dvh flex flex-col page-atmosphere"
      style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}
    >
      {/* ── Accessibility: skip-to-main-content ── */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/*
        pt-[72px] clears fixed navbar (72px tall).
        No pb hack — footer sits naturally after main content.
      */}
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full flex-1 flex flex-col focus-visible:outline-none"
        style={{ paddingTop: '72px' }}
        aria-label="Main content"
      >
        <div className="portfolio-container w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {PageComponent ? (
                <PageComponent setActiveTab={setActiveTab} />
              ) : (
                <HomeOverview setActiveTab={setActiveTab} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Exported App — wraps everything in providers
───────────────────────────────────────────── */
export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
