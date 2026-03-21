import type { Profile, SkillsData } from "../types/resume";

interface SkillsSectionProps {
  profile: Profile;
  skills: SkillsData;
}

const skillGroups: Array<{
  key: keyof SkillsData;
  label: string;
}> = [
  { key: "frontend", label: "Frontend" },
  { key: "stateManagement", label: "State Management" },
  { key: "apisAndServices", label: "APIs & Services" },
  { key: "engineering", label: "Engineering" },
  { key: "tools", label: "Tools" },
];

export function SkillsSection({ profile, skills }: SkillsSectionProps) {
  return (
    <section className="content-section" id="skills">
      <div className="content-section__intro">
        <p className="content-section__eyebrow">{profile.tagline}</p>
        <h2>Frontend systems built for scale, quality, and long-term velocity.</h2>
        <p className="content-section__summary">{profile.summary}</p>
      </div>

      <div className="skill-grid">
        {skillGroups.map(({ key, label }) => (
          <article className="skill-card" key={key}>
            <p className="skill-card__title">{label}</p>
            <div className="skill-card__chips">
              {skills[key].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
