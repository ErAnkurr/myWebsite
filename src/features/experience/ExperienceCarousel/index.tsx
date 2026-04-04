import { AnimatePresence, motion } from "framer-motion";
import type { JobEntry } from "../../shared/types/resume";
import { Modal } from "../../shared/ui/Modal";
import "./style.css";

interface ExperienceCarouselProps {
  jobs: JobEntry[];
  selectedId: string | null;
  onSelect: (jobId: string) => void;
  onClose: () => void;
}

export function ExperienceCarousel({
  jobs,
  selectedId,
  onSelect,
  onClose,
}: ExperienceCarouselProps) {
  const index = selectedId ? jobs.findIndex((job) => job.id === selectedId) : -1;
  const current = index >= 0 ? jobs[index] : null;

  if (!current) {
    return null;
  }

  const goPrev = () => {
    const prevIndex = (index - 1 + jobs.length) % jobs.length;
    onSelect(jobs[prevIndex].id);
  };

  const goNext = () => {
    const nextIndex = (index + 1) % jobs.length;
    onSelect(jobs[nextIndex].id);
  };

  return (
    <AnimatePresence>
      <Modal isOpen onClose={onClose} ariaLabel="Experience carousel">
        <motion.div
          key={current.id}
          className="experience-modal"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            className="experience-close"
            type="button"
            aria-label="Close experience carousel"
            onClick={onClose}
          >
            ×
          </button>

          <div className="experience-header">
            <div className="experience-meta">
              <p className="experience-eyebrow">{current.location}</p>
              <p className="experience-dates">{formatDateRange(current.start, current.end)}</p>
            </div>
            <h2 className="experience-title">{current.role}</h2>
            <p className="experience-company">{current.company}</p>
            <p className="experience-summary">{current.summary}</p>
          </div>

          <div className="experience-body">
            <ul className="experience-bullets">
              {current.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="experience-stack">
              <p className="experience-stack-label">Tech stack</p>
              <div className="experience-tags">
                {current.techStack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="experience-nav">
            <button className="nav-btn" type="button" onClick={goPrev} aria-label="Previous role">
              ‹
            </button>
            <div className="nav-index">
              {index + 1} / {jobs.length}
            </div>
            <button className="nav-btn" type="button" onClick={goNext} aria-label="Next role">
              ›
            </button>
          </div>
        </motion.div>
      </Modal>
    </AnimatePresence>
  );
}

function formatDateRange(start: string, end: string) {
  return `${formatMonth(start)} – ${end === "Present" ? "Present" : formatMonth(end)}`;
}

function formatMonth(value: string) {
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}
