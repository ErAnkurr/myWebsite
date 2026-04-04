import type { Profile } from "../../shared/types/resume";
import "./style.css";

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-section__intro">
        <p className="contact-section__eyebrow">Contact</p>
        <h2>Let’s build ambitious frontend products with cleaner systems behind them.</h2>
      </div>

      <div className="contact-section__grid">
        <article className="contact-section__card">
          <p className="contact-section__label">Reach out</p>
          <div className="contact-section__details">
            <a className="contact-section__value" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a
              className="contact-section__value"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <span className="contact-section__value">{profile.location}</span>
          </div>
        </article>
      </div>
    </section>
  );
}
