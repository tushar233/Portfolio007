import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

function SunIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="4"  />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2"  y1="12" x2="4"  y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
    </svg>
  );
}

function MoonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

interface Props {
  size?: 'sm' | 'md';
  className?: string;
}

export default function ThemeToggle({ size = 'md', className = '' }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [spinning, setSpinning] = useState(false);

  const iconSize = size === 'sm' ? 14 : 16;
  const btnSize  = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';

  const handleToggle = () => {
    setSpinning(true);
    toggleTheme();
    window.setTimeout(() => setSpinning(false), 550);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={[
        btnSize,
        'relative flex items-center justify-center rounded-lg overflow-hidden',
        'cursor-pointer shrink-0',
        'bg-[var(--interactive-default)]',
        'text-[var(--text-secondary)]',
        'hover:bg-[var(--interactive-hover)] hover:text-[var(--text-primary)]',
        'focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]',
        'focus-visible:outline-offset-2',
        spinning ? 'theme-toggle-spin' : '',
        className,
      ].join(' ')}
    >
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'scale(1) rotate(0deg)' : 'scale(0.4) rotate(180deg)',
        }}
      >
        <MoonIcon size={iconSize} />
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'scale(0.4) rotate(-180deg)' : 'scale(1) rotate(0deg)',
        }}
      >
        <SunIcon size={iconSize} />
      </span>
    </button>
  );
}
