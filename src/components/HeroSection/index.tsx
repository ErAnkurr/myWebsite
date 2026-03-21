import { motion } from "framer-motion";
import type { RefObject } from "react";
import type { JobEntry, Profile } from "../../types/resume";
import { HeroScene } from "../HeroScene";
import { JobDetailPanel } from "../JobDetailPanel";
import "./style.css";

interface HeroSectionProps {
  profile: Profile;
  jobs: JobEntry[];
  selectedId: string | null;
  selectedJob: JobEntry | null;
  motionFactor: number;
  onSelect: (jobId: string) => void;
  onClose: () => void;
  onRevealPanel: () => void;
  panelRef: RefObject<HTMLElement>;
  ctaRef: RefObject<HTMLButtonElement>;
}

export function HeroSection({
  profile,
  jobs,
  selectedId,
  selectedJob,
  motionFactor,
  onSelect,
  onClose,
  onRevealPanel,
  panelRef,
  ctaRef,
}: HeroSectionProps) {
  return (
    <section className="hero-layout">
      <div className="hero-copy">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          {profile.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
        >
          {profile.title}
        </motion.p>
      </div>

      <HeroScene
        jobs={jobs}
        selectedId={selectedId}
        onSelect={onSelect}
        motionFactor={motionFactor}
      />

      <motion.button
        ref={ctaRef}
        className="hero-cta"
        onClick={onRevealPanel}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.99 }}
        aria-expanded={Boolean(selectedJob)}
      >
        {profile.cta}
      </motion.button>

      <JobDetailPanel
        job={selectedJob}
        panelRef={panelRef}
        onClose={onClose}
      />
    </section>
  );
}
