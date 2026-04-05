import { Line, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Group, Mesh } from 'three';
import * as THREE from 'three';
import './style.css';

interface ReactCoreProps {
  motionFactor: number;
}

export function ReactCore({ motionFactor }: ReactCoreProps) {
  const groupRef = useRef<Group>(null);
  const pulseRef = useRef<Mesh>(null);
  const orbitalPaths = useMemo(
    () => [
      {
        id: 'orbit-a',
        rotation: [Math.PI / 2.75, 0.02, 0] as [number, number, number],
        points: createEllipsePoints(3.65, 0.44),
      },
      {
        id: 'orbit-b',
        rotation: [Math.PI / 2.75, 0.18, Math.PI / 3] as [number, number, number],
        points: createEllipsePoints(3.65, 0.44),
      },
      {
        id: 'orbit-c',
        rotation: [Math.PI / 2.75, -0.14, -Math.PI / 3] as [number, number, number],
        points: createEllipsePoints(3.65, 0.44),
      },
    ],
    [],
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.018 * motionFactor;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.11) * 0.03;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.09) * 0.015;
    }

    if (pulseRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.65) * 0.018;
      pulseRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.92, 48, 48]} />
        <meshBasicMaterial
          color="#7ddaff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.4, 48, 48]} />
        <meshStandardMaterial
          color="#ddf4ff"
          emissive="#61dafb"
          emissiveIntensity={1.8}
          metalness={0.1}
          roughness={0.18}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[3.22, 48, 48]} />
        <meshBasicMaterial
          color="#3e8ef7"
          wireframe
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>

      {orbitalPaths.map((orbitalPath) => (
        <group key={orbitalPath.id} rotation={orbitalPath.rotation}>
          <Line
            points={orbitalPath.points}
            color="#e6f8ff"
            transparent
            opacity={0.92}
            lineWidth={0.72}
          />
          <Line
            points={orbitalPath.points}
            color="#5cc9ff"
            transparent
            opacity={0.12}
            lineWidth={1.12}
          />
        </group>
      ))}

      <Sparkles
        count={18}
        scale={[6.6, 6.6, 6.6]}
        size={1.25}
        speed={0.03 * motionFactor}
        color="#8bd3ff"
        opacity={0.36}
      />
    </group>
  );
}

function createEllipsePoints(radius: number, yScale: number) {
  return Array.from({ length: 180 }, (_, index) => {
    const theta = (index / 179) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius * yScale, 0);
  });
}
