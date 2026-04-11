import type { EducationEntry, Profile } from '../../shared/types/resume';
import { EducationSummary } from '../EducationSummary';
import './style.css';

interface IntroSectionProps {
  profile: Profile;
  education: EducationEntry[];
}

export function IntroSection({ profile, education }: IntroSectionProps) {
  return (
    <div className="Intro-Section">
      <div className="Intro-Section__intro">
        <h2>{profile.name}</h2>
        <p className="Intro-Section__label">{profile.tagline}</p>
        <EducationSummary education={education} />
      </div>

      <div className="Intro-Section__links">
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  );
}
