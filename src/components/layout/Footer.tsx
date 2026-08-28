import { Mail, Phone, ExternalLink } from 'lucide-react';
import { mainTabs } from '../../data/navigation';

interface FooterProps {
  setActiveTab: (tabId: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const handleTabClick = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full flex justify-center relative"
      aria-label="Site footer"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      {/* Top gradient accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, var(--brand-primary) 40%, var(--brand-secondary) 60%, transparent)' }}
        aria-hidden="true"
      />

      <div className="portfolio-container py-12 sm:py-16">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 mb-10 sm:mb-12">

          {/* Col 1: Brand + tagline */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={() => handleTabClick('overview')}
              className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
              aria-label="Go to overview"
              style={{ outlineColor: 'var(--border-focus)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0 group-hover:scale-105 transition-transform duration-200"
                style={{ background: 'var(--gradient-brand)', boxShadow: 'var(--shadow-brand)' }}
              >
                T
              </div>
              <div className="leading-tight text-left">
                <span
                  className="text-[14px] font-black tracking-widest uppercase block"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Tushar
                </span>
                <span
                  className="text-[10px] uppercase tracking-widest font-bold"
                  style={{ color: 'var(--brand-secondary)' }}
                >
                  Lead SFDC Architect
                </span>
              </div>
            </button>

            <p className="text-[13px] max-w-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              Architecting resilient multi-cloud Salesforce solutions, custom Apex frameworks, and
              high-performance CRM ecosystems for enterprise organisations worldwide.
            </p>

            {/* Status badge — links to contact */}
            <button
              onClick={() => handleTabClick('contact')}
              className="inline-flex items-center gap-2 text-[12px] rounded-full px-3 py-1.5 border transition-colors duration-200 hover:border-[var(--brand-emerald)] focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                color: 'var(--text-secondary)',
                borderColor: 'var(--border-subtle)',
                outlineColor: 'var(--border-focus)',
              }}
              aria-label="Available for new engagements — get in touch"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                style={{ backgroundColor: 'var(--brand-emerald)' }}
                aria-hidden="true"
              />
              Available for new engagements
            </button>
          </div>

          {/* Col 2: Quick navigation */}
          <div className="lg:col-span-4 space-y-4">
            <h3
              className="text-label"
              style={{ color: 'var(--text-primary)' }}
            >
              Quick Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {mainTabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => handleTabClick(tab.id)}
                      className="text-[13px] text-left py-0.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
                      style={{ color: 'var(--text-tertiary)', outlineColor: 'var(--border-focus)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                    >
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3: Direct contact */}
          <div className="lg:col-span-3 space-y-4">
            <h3
              className="text-label"
              style={{ color: 'var(--text-primary)' }}
            >
              Direct Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:devtushar211@gmail.com"
                  className="flex items-start gap-2 text-[13px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
                  style={{ color: 'var(--text-tertiary)', outlineColor: 'var(--border-focus)' }}
                  aria-label="Email devtushar211@gmail.com"
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                >
                  <Mail size={13} className="shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="break-all">devtushar211@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919116312426"
                  className="flex items-center gap-2 text-[13px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
                  style={{ color: 'var(--text-tertiary)', outlineColor: 'var(--border-focus)' }}
                  aria-label="Call +91 9116312426"
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-secondary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                >
                  <Phone size={13} className="shrink-0" aria-hidden="true" />
                  +91 9116312426
                </a>
              </li>
              <li
                className="text-[13px]"
                style={{ color: 'var(--text-muted)' }}
              >
                India · Available Worldwide
              </li>

              {/* External profile links */}
              <li className="pt-1 flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/tushar-salesforce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[12px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
                  style={{ color: 'var(--text-muted)', outlineColor: 'var(--border-focus)' }}
                  aria-label="LinkedIn profile (opens in new tab)"
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  LinkedIn <ExternalLink size={10} aria-hidden="true" />
                </a>
                <a
                  href="https://trailblazer.salesforce.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[12px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
                  style={{ color: 'var(--text-muted)', outlineColor: 'var(--border-focus)' }}
                  aria-label="Salesforce Trailblazer profile (opens in new tab)"
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-secondary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  Trailhead <ExternalLink size={10} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px]"
          style={{ borderTopColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <p>© {year} Tushar. All rights reserved.</p>
          <div className="flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--brand-emerald)' }}
              aria-hidden="true"
            />
            <span>Salesforce Ecosystem Architect</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
