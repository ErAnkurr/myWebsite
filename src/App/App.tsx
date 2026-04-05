import { useReducedMotion } from 'framer-motion';
import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';

import { ContactSection } from '../features/contact/ContactSection';
import { ExperienceCarousel } from '../features/experience/ExperienceCarousel';
import { HeroSection } from '../features/hero/HeroSection';
import { IntroSection } from '../features/intro/IntroSection';
import { resumeData } from '../features/shared/data/resumeData';
import { SkillsSection } from '../features/skills/SkillsSection';
import './style.css';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const motionFactor = prefersReducedMotion ? 0.28 : 1;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const deferredSelectedId = useDeferredValue(selectedId);

  const selectedJob = useMemo(() => {
    return resumeData.jobs.find((job) => job.id === deferredSelectedId) ?? null;
  }, [deferredSelectedId]);

  useEffect(() => {
    if (!selectedId) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  return (
    <div className="app-shell">
      <HeroSection
        profile={resumeData.profile}
        jobs={resumeData.jobs}
        selectedId={selectedId}
        selectedJob={selectedJob}
        motionFactor={motionFactor}
        onSelect={handleSelect}
        onClose={handleClose}
        onRevealPanel={revealPanel}
        ctaRef={ctaRef}
      />
      <IntroSection profile={resumeData.profile} education={resumeData.education} />
      <ContactSection profile={resumeData.profile} />
      <SkillsSection profile={resumeData.profile} skills={resumeData.skills} />
      <ExperienceCarousel
        jobs={resumeData.jobs}
        selectedId={selectedId}
        onSelect={handleSelect}
        onClose={handleClose}
      />
    </div>
  );
}
