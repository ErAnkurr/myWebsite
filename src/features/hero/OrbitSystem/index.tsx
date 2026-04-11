import type { JobEntry } from '../../shared/types/resume';
import { OrbitRing } from '../OrbitRing';
import './style.css';

interface OrbitSystemProps {
  jobs: JobEntry[];
  selectedId: string | null;
  motionFactor: number;
  onSelect: (jobId: string) => void;
}

const orbitVisuals = [
  {
    radius: 7.6,
    speed: 0.082,
    offset: 0.2,
    tilt: [0.34, 0.42, 0.12] as [number, number, number],
    nodeColor: '#ff9f52',
    nodeGlow: '#ff6d1e',
  },
  {
    radius: 9.8,
    speed: 0.064,
    offset: 2.1,
    tilt: [0.96, 0.14, 0.18] as [number, number, number],
    nodeColor: '#ffad63',
    nodeGlow: '#ff7a28',
  },
  {
    radius: 8.8,
    speed: 0.072,
    offset: 4.2,
    tilt: [0.7, 0.76, 0.36] as [number, number, number],
    nodeColor: '#ff9450',
    nodeGlow: '#ff641a',
  },
  {
    radius: 11.7,
    speed: 0.052,
    offset: 5.5,
    tilt: [0.2, 1.06, 0.02] as [number, number, number],
    nodeColor: '#ffb86f',
    nodeGlow: '#ff8a33',
  },
  {
    radius: 13.3,
    speed: 0.044,
    offset: 1.15,
    tilt: [1.08, 0.36, 0.58] as [number, number, number],
    nodeColor: '#ffcc82',
    nodeGlow: '#ff9b3f',
  },
];

export function OrbitSystem({ jobs, selectedId, motionFactor, onSelect }: OrbitSystemProps) {
  return (
    <>
      {jobs.map((job) => {
        const visual = orbitVisuals[job.orbitOrder - 1] ?? orbitVisuals[0];

        return (
          <OrbitRing
            key={job.id}
            job={job}
            visual={visual}
            selected={job.id === selectedId}
            motionFactor={motionFactor}
            onSelect={onSelect}
          />
        );
      })}
    </>
  );
}
