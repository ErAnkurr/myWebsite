import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ContactSection } from "./components/ContactSection";
import { ContactFooter } from "./components/ContactFooter";
import { HeroScene } from "./components/HeroScene";
import { JobDetailPanel } from "./components/JobDetailPanel";
import { SkillsSection } from "./components/SkillsSection";
import { resumeData } from "./data/resumeData";

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const motionFactor = prefersReducedMotion ? 0.28 : 1;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const deferredSelectedId = useDeferredValue(selectedId);

  const selectedJob = useMemo(() => {
    return resumeData.jobs.find((job) => job.id === deferredSelectedId) ?? null;
  }, [deferredSelectedId]);

  useEffect(() => {
    if (!selectedId) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (target && panelRef.current?.contains(target)) {
        return;
      }

      if (target && ctaRef.current?.contains(target)) {
        return;
      }

      setSelectedId(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId]);

  const revealPanel = () => {
    const nextId = selectedId ?? resumeData.jobs[0].id;
    handleSelect(nextId);
  };

  const handleSelect = (jobId: string) => {
    startTransition(() => {
      setSelectedId(jobId);
    });

    if (window.matchMedia("(max-width: 960px)").matches) {
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  return (
    <div className="app-shell">
      <section className="hero-layout">
        <div className="hero-copy">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            {resumeData.profile.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            {resumeData.profile.title}
          </motion.p>
        </div>

        <HeroScene
          jobs={resumeData.jobs}
          selectedId={selectedId}
          onSelect={handleSelect}
          motionFactor={motionFactor}
        />

        <motion.button
          ref={ctaRef}
          className="hero-cta"
          onClick={revealPanel}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.99 }}
          aria-expanded={Boolean(selectedJob)}
        >
          {resumeData.profile.cta}
        </motion.button>

        <JobDetailPanel
          job={selectedJob}
          panelRef={panelRef}
          onClose={handleClose}
        />
      </section>

      <SkillsSection profile={resumeData.profile} skills={resumeData.skills} />
      <ContactSection
        profile={resumeData.profile}
        education={resumeData.education}
      />
      <ContactFooter profile={resumeData.profile} />
    </div>
  );
}
