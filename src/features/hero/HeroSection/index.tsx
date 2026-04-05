import { track } from '@vercel/analytics';
import { motion } from 'framer-motion';
import type { RefObject } from 'react';

import type { JobEntry, Profile } from '../../shared/types/resume';
import { HeroScene } from '../HeroScene';
import './style.css';

interface HeroSectionProps {
  profile: Profile;
  jobs: JobEntry[];
  selectedId: string | null;
  selectedJob: JobEntry | null;
  motionFactor: number;
  onSelect: (jobId: string) => void;
  onClose: () => void;
  onRevealPanel: () => void;
  ctaRef: RefObject<HTMLButtonElement | null>;
}

export function HeroSection({
  profile,
  jobs,
  selectedId,
  selectedJob,
  motionFactor,
  onSelect,
  onRevealPanel,
  ctaRef,
}: HeroSectionProps) {
  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    track('explore_experience_click', {
      location: 'hero',
      label: 'Explore Experience',
    });

    onRevealPanel();
  };

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

      <button
        ref={ctaRef}
        className="hero-cta"
        onClick={handleCtaClick}
        aria-expanded={Boolean(selectedJob)}
      >
        {profile.cta}
      </button>
    </section>
  );
}
