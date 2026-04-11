import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import type { Group } from 'three';
import * as THREE from 'three';

import type { JobEntry } from '../../shared/types/resume';
import { BackgroundParticles } from '../BackgroundParticles';
import { OrbitSystem } from '../OrbitSystem';
import { ReactCore } from '../ReactCore';
import './style.css';

interface HeroSceneProps {
  jobs: JobEntry[];
  selectedId: string | null;
  onSelect: (jobId: string) => void;
  motionFactor: number;
}

export function HeroScene({ jobs, selectedId, onSelect, motionFactor }: HeroSceneProps) {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        dpr={[1.2, 2]}
        camera={{ position: [0, 0.2, 15.8], fov: 33 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#03060d']} />
        <fog attach="fog" args={['#03060d', 18, 44]} />

        <ambientLight intensity={0.48} />
        <directionalLight position={[6, 8, 4]} intensity={0.78} color="#dff4ff" />
        <pointLight position={[0, 0, 0]} intensity={13.5} color="#59d5ff" distance={22} />
        <pointLight position={[4.5, -4.5, -2]} intensity={4.2} color="#ff8f2a" distance={20} />

        <Suspense fallback={null}>
          <BackgroundParticles motionFactor={motionFactor} />
          <SceneRig motionFactor={motionFactor}>
            <ReactCore motionFactor={motionFactor} />
            <OrbitSystem
              jobs={jobs}
              selectedId={selectedId}
              motionFactor={motionFactor}
              onSelect={onSelect}
            />
          </SceneRig>
        </Suspense>
      </Canvas>
    </div>
  );
}

interface SceneRigProps {
  children: React.ReactNode;
  motionFactor: number;
}

function SceneRig({ children, motionFactor }: SceneRigProps) {
  const rigRef = useRef<Group>(null);
  const { pointer, viewport } = useThree();

  useFrame((state) => {
    if (!rigRef.current) {
      return;
    }

    const maxRadius = 11.6;
    const wideLayout = viewport.width > 11;
    const safeMarginX = wideLayout ? 1.05 : 0.72;
    const safeMarginY = wideLayout ? 1.1 : 0.82;
    const fitScale = Math.min(
      1,
      (viewport.width * 0.5 - safeMarginX) / maxRadius,
      (viewport.height * 0.5 - safeMarginY) / (maxRadius * 0.72),
    );
    const scaledRadiusX = maxRadius * fitScale;
    const scaledRadiusY = maxRadius * 0.72 * fitScale;
    const clampRangeX = Math.max(viewport.width * 0.5 - scaledRadiusX - 0.25, 0.18);
    const clampRangeY = Math.max(viewport.height * 0.5 - scaledRadiusY - 0.34, 0.14);
    const pointerFactor = wideLayout ? 0.22 : 0.1;
    const baseX = wideLayout ? -1.15 : 0;
    const baseY = wideLayout ? -0.42 : -0.12;
    const targetPosition = new THREE.Vector3(
      THREE.MathUtils.clamp(baseX + pointer.x * pointerFactor, -clampRangeX, clampRangeX),
      THREE.MathUtils.clamp(baseY + pointer.y * 0.12, -clampRangeY, clampRangeY),
      0,
    );

    rigRef.current.position.lerp(targetPosition, 0.035);
    const nextScale = THREE.MathUtils.lerp(rigRef.current.scale.x, Math.max(fitScale, 0.78), 0.06);
    rigRef.current.scale.setScalar(nextScale);
    rigRef.current.rotation.x = THREE.MathUtils.lerp(
      rigRef.current.rotation.x,
      -pointer.y * 0.04 * motionFactor,
      0.03,
    );
    rigRef.current.rotation.y = THREE.MathUtils.lerp(
      rigRef.current.rotation.y,
      pointer.x * 0.06 * motionFactor,
      0.03,
    );
    rigRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.14) * 0.0008 * motionFactor;
  });

  return <group ref={rigRef}>{children}</group>;
}
