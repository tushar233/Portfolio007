import { Award } from 'lucide-react';
import { getOrderedCertifications } from '../../data/expertise';

export default function CertTicker() {
  const certs = getOrderedCertifications();
  const track = [...certs, ...certs];

  return (
    <div
      className="cert-ticker-wrap"
      aria-label="Salesforce certifications marquee"
      role="region"
    >
      <div className="cert-ticker-fade cert-ticker-fade-left" aria-hidden="true" />
      <div className="cert-ticker-fade cert-ticker-fade-right" aria-hidden="true" />

      <div className="cert-ticker-track">
        {track.map((cert, i) => (
          <article
            key={`${cert.title}-${i}`}
            className="cert-ticker-card backdrop-blur-sm"
            aria-hidden={i >= certs.length ? true : undefined}
          >
            <div className={`cert-ticker-icon bg-gradient-to-tr ${cert.badgeColor}`}>
              <Award size={14} aria-hidden="true" />
            </div>
            <p className="cert-ticker-card-title">{cert.title}</p>
            <span className="cert-ticker-card-category">{cert.category}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
