import { AnimatePresence, motion } from "framer-motion";
import type { RefObject } from "react";
import type { JobEntry } from "../../shared/types/resume";
import "./style.css";

interface JobDetailPanelProps {
  job: JobEntry | null;
  panelRef: RefObject<HTMLElement>;
  onClose: () => void;
}

export function JobDetailPanel({
  job,
  panelRef,
  onClose,
}: JobDetailPanelProps) {
  return (
    <AnimatePresence>
      {job ? (
        <motion.aside
          ref={panelRef}
          className="job-panel-shell"
          id="experience-panel"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.section
              key={job.id}
              className="job-panel"
              initial={{ opacity: 0, x: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 14, filter: "blur(8px)" }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="job-panel__close"
                onClick={onClose}
                type="button"
                aria-label="Close experience details"
              >
                ×
              </button>

              <div className="job-panel__eyebrow">{job.location}</div>
              <h2>{job.company}</h2>
              <p className="job-panel__role">{job.role}</p>

              <div className="job-panel__date-chip">
                {formatDateRange(job.start, job.end)}
              </div>

              <p className="job-panel__summary">{job.summary}</p>

              <ul className="job-panel__bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div className="job-panel__stack">
                <span className="job-panel__stack-label">Tech stack</span>
                <div className="job-panel__tags">
                  {job.techStack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </motion.section>
          </AnimatePresence>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function formatDateRange(start: string, end: string) {
  return `${formatMonth(start)} - ${end === "Present" ? "Present" : formatMonth(end)}`;
}

function formatMonth(value: string) {
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}
