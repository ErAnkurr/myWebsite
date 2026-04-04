import type { Profile, SkillsData } from "../../shared/types/resume";
import "./style.css";

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
    <section className="skills-section" id="skills">
      <div className="skills-section__intro">
        <p className="skills-section__eyebrow">{profile.tagline}</p>
        <h2>Frontend systems built for scale, quality, and long-term velocity.</h2>
        <p className="skills-section__summary">{profile.summary}</p>
      </div>

      <div className="skills-section__grid">
        {skillGroups.map(({ key, label }) => (
          <article className="skills-section__card" key={key}>
            <p className="skills-section__card-title">{label}</p>
            <div className="skills-section__chips">
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
