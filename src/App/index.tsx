import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import { IntroSection } from "../components/IntroSection";
import { ContactSection } from "../components/ContactSection";
import { HeroSection } from "../components/HeroSection";
import { SkillsSection } from "../components/SkillsSection";
import { resumeData } from "../data/resumeData";
import "./style.css";

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
        panelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }
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
        panelRef={panelRef}
        ctaRef={ctaRef}
      />
      <IntroSection profile={resumeData.profile} education={resumeData.education} />
      <ContactSection
        profile={resumeData.profile}
      />
      <SkillsSection profile={resumeData.profile} skills={resumeData.skills} />
    </div>
  );
}
