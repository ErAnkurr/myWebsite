import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";
import * as THREE from "three";
import "./style.css";

interface BackgroundParticlesProps {
  motionFactor: number;
}

export function BackgroundParticles({
  motionFactor,
}: BackgroundParticlesProps) {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(1400 * 3);

    for (let index = 0; index < 1400; index += 1) {
      const stride = index * 3;
      const radius = THREE.MathUtils.randFloat(15, 40);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));

      values[stride] = radius * Math.sin(phi) * Math.cos(theta);
      values[stride + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[stride + 2] = radius * Math.cos(phi);
    }

    return values;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.0035 * motionFactor;
    pointsRef.current.rotation.x -= delta * 0.0016 * motionFactor;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#b7d7ff"
        size={0.038}
        sizeAttenuation
        transparent
        opacity={0.72}
        depthWrite={false}
      />
    </points>
  );
}
