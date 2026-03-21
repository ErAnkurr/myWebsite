import type { EducationEntry, Profile } from "../types/resume";

interface ContactSectionProps {
  profile: Profile;
  education: EducationEntry[];
}

export function ContactSection({
  profile,
  education,
}: ContactSectionProps) {
  return (
    <section className="content-section content-section--contact" id="contact">
      <div className="content-section__intro">
        <p className="content-section__eyebrow">Contact</p>
        <h2>Let’s build ambitious frontend products with cleaner systems behind them.</h2>
      </div>

      <div className="contact-grid">
        <article className="contact-card">
          <p className="contact-card__label">Reach out</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span>{profile.location}</span>
        </article>

        <article className="contact-card">
          <p className="contact-card__label">Education</p>
          <div className="education-list">
            {education.map((item) => (
              <div key={`${item.degree}-${item.school}`}>
                <strong>{item.degree}</strong>
                <span>{item.school}</span>
                <small>
                  {item.start} - {item.end}
                </small>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
