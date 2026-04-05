import type { EducationEntry } from '../../shared/types/resume';
import './style.css';

interface EducationSummaryProps {
  education: EducationEntry[];
}

export function EducationSummary({ education }: EducationSummaryProps) {
  return (
    <div className="education-summary" aria-label="Education">
      {education?.map((item) => (
        <p className="education-summary__item" key={`${item.degree}-${item.school}`}>
          <span className="education-summary__degree">{item.degree}</span>
          <span className="education-summary__meta">
            {item.school} · {item.start} - {item.end}
          </span>
        </p>
      ))}
    </div>
  );
}
