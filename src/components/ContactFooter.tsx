import type { Profile } from "../types/resume";

interface ContactFooterProps {
  profile: Profile;
}

export function ContactFooter({ profile }: ContactFooterProps) {
  return (
    <footer className="contact-footer">
      <div>
        <p className="contact-footer__label">{profile.tagline}</p>
        <h2>{profile.name}</h2>
      </div>

      <div className="contact-footer__links">
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
