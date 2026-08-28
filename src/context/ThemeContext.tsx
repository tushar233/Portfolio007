import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

/* ─────────────────────────────────────────────
   Context
───────────────────────────────────────────── */
const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const STORAGE_KEY = 'portfolio-theme';

function getInitialTheme(): Theme {
  // 1. User's previously persisted preference wins
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // localStorage unavailable (SSR / privacy mode) — continue
  }
  // 2. OS/browser preference
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    return 'light';
  }
  // 3. Default to dark
  return 'dark';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  // data-theme attribute drives CSS custom property overrides
  root.setAttribute('data-theme', theme);
  // Update meta theme-color so browser chrome matches
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      'content',
      theme === 'light' ? '#f7f5f1' : '#080b14',
    );
  }
}

/* ─────────────────────────────────────────────
   Provider
───────────────────────────────────────────── */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Apply theme to DOM on every state change
  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore write failures
    }
  }, [theme]);

  // Listen for OS preference changes so we stay in sync
  // (only if user has NOT manually set a preference)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onOsChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        // Only follow OS if user never set an explicit preference
        if (!stored) setThemeState(e.matches ? 'light' : 'dark');
      } catch {
        setThemeState(e.matches ? 'light' : 'dark');
      }
    };
    mq.addEventListener('change', onOsChange);
    return () => mq.removeEventListener('change', onOsChange);
  }, []);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  );

  return (
    <ThemeContext value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext>
  );
}

/* ─────────────────────────────────────────────
   Hook
───────────────────────────────────────────── */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}
