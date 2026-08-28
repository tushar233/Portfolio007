import { Mail, Phone, ExternalLink, MapPin } from 'lucide-react';
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
    <footer className="site-footer relative z-10" aria-label="Site footer">
      <div className="site-footer-accent" aria-hidden="true" />

      <div className="portfolio-container site-footer-inner">

        <div className="site-footer-grid">

          {/* Brand column */}
          <div className="site-footer-brand">
            <button
              onClick={() => handleTabClick('overview')}
              className="site-footer-logo group focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
              aria-label="Go to overview"
              style={{ outlineColor: 'var(--border-focus)' }}
            >
              <div
                className="site-footer-avatar group-hover:scale-105 transition-transform duration-200"
                aria-hidden="true"
              >
                T
              </div>
              <div className="leading-tight text-left">
                <span className="site-footer-name">Tushar</span>
                <span className="site-footer-role">Lead SFDC Architect</span>
              </div>
            </button>

            <p className="site-footer-tagline">
              Architecting resilient multi-cloud Salesforce solutions, custom Apex frameworks, and
              high-performance CRM ecosystems for enterprise organisations worldwide.
            </p>

            <button
              onClick={() => handleTabClick('contact')}
              className="site-footer-status focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: 'var(--border-focus)' }}
              aria-label="Available for new engagements — get in touch"
            >
              <span className="site-footer-status-dot" aria-hidden="true" />
              Available for new engagements
            </button>
          </div>

          {/* Navigation */}
          <div className="site-footer-col">
            <h3 className="site-footer-heading">Quick Navigation</h3>
            <nav aria-label="Footer navigation">
              <ul className="site-footer-nav">
                {mainTabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => handleTabClick(tab.id)}
                      className="site-footer-link focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
                      style={{ outlineColor: 'var(--border-focus)' }}
                    >
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact — rightmost column */}
          <div className="site-footer-col site-footer-col-contact">
            <h3 className="site-footer-heading">Direct Contact</h3>
            <ul className="site-footer-contact">
              <li>
                <a
                  href="mailto:devtushar211@gmail.com"
                  className="site-footer-link site-footer-link-row focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
                  style={{ outlineColor: 'var(--border-focus)' }}
                  aria-label="Email devtushar211@gmail.com"
                >
                  <Mail size={14} className="shrink-0" aria-hidden="true" />
                  <span className="break-all">devtushar211@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919116312426"
                  className="site-footer-link site-footer-link-row focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
                  style={{ outlineColor: 'var(--border-focus)' }}
                  aria-label="Call +91 9116312426"
                >
                  <Phone size={14} className="shrink-0" aria-hidden="true" />
                  +91 9116312426
                </a>
              </li>
              <li className="site-footer-link site-footer-link-row site-footer-location">
                <MapPin size={14} className="shrink-0" aria-hidden="true" />
                India · Available Worldwide
              </li>
              <li className="site-footer-socials">
                <a
                  href="https://www.linkedin.com/in/tushar-salesforce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-social focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
                  style={{ outlineColor: 'var(--border-focus)' }}
                  aria-label="LinkedIn profile (opens in new tab)"
                >
                  LinkedIn <ExternalLink size={10} aria-hidden="true" />
                </a>
                <a
                  href="https://trailblazer.salesforce.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-social focus-visible:outline-2 focus-visible:outline-offset-1 rounded"
                  style={{ outlineColor: 'var(--border-focus)' }}
                  aria-label="Salesforce Trailblazer profile (opens in new tab)"
                >
                  Trailhead <ExternalLink size={10} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer-bar">
          <p>© {year} Tushar. All rights reserved.</p>
          <div className="site-footer-badge">
            <span className="site-footer-status-dot" aria-hidden="true" />
            <span>Salesforce Ecosystem Architect</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
