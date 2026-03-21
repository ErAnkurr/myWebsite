import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { BufferAttribute, BufferGeometry, Group, LineBasicMaterial } from "three";
import * as THREE from "three";
import type { JobEntry } from "../../types/resume";
import { JobNode } from "../JobNode";
import "./style.css";

interface OrbitVisualConfig {
  radius: number;
  speed: number;
  offset: number;
  tilt: [number, number, number];
  nodeColor: string;
  nodeGlow: string;
}

interface OrbitRingProps {
  job: JobEntry;
  visual: OrbitVisualConfig;
  selected: boolean;
  motionFactor: number;
  onSelect: (jobId: string) => void;
}

const ELLIPSE_HEIGHT = 0.6;

export function OrbitRing({
  job,
  visual,
  selected,
  motionFactor,
  onSelect,
}: OrbitRingProps) {
  const groupRef = useRef<Group>(null);
  const orbitRef = useRef<Group>(null);
  const connectorGeometryRef = useRef<BufferGeometry>(null);
  const connectorMaterialRef = useRef<LineBasicMaterial>(null);
  const angleRef = useRef(visual.offset);
  const [hovered, setHovered] = useState(false);

  const ringPoints = useMemo(() => {
    return Array.from({ length: 101 }, (_, index) => {
      const theta = (index / 100) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(theta) * visual.radius,
        Math.sin(theta) * visual.radius * ELLIPSE_HEIGHT,
        0,
      );
    });
  }, [visual.radius]);

  useFrame((state, delta) => {
    if (!groupRef.current || !orbitRef.current || !connectorGeometryRef.current) {
      return;
    }

    const slowdown = hovered ? 0.012 : selected ? 0.28 : 1;
    angleRef.current +=
      delta * visual.speed * slowdown * Math.max(motionFactor, 0.12);

    const drift = Math.sin(state.clock.elapsedTime * 0.22 + visual.offset * 2.4) * 0.18;
    const depthDrift =
      Math.cos(state.clock.elapsedTime * 0.18 + visual.offset * 4.2) * 0.08;
    const localX = Math.cos(angleRef.current) * visual.radius;
    const localY = Math.sin(angleRef.current) * visual.radius * ELLIPSE_HEIGHT + drift;
    const targetZ = (hovered ? 0.52 : selected ? 0.22 : 0) + depthDrift;

    groupRef.current.rotation.z += delta * 0.005 * motionFactor;

    orbitRef.current.position.x = localX;
    orbitRef.current.position.y = localY;
    orbitRef.current.position.z = THREE.MathUtils.lerp(
      orbitRef.current.position.z,
      targetZ,
      0.1,
    );

    const attribute = connectorGeometryRef.current.getAttribute(
      "position",
    ) as BufferAttribute;
    attribute.setXYZ(0, 0, 0, 0);
    attribute.setXYZ(1, localX, localY, 0);
    attribute.needsUpdate = true;

    if (connectorMaterialRef.current) {
      connectorMaterialRef.current.opacity = hovered ? 0.74 : selected ? 0.46 : 0.14;
    }
  });

  return (
    <group ref={groupRef} rotation={visual.tilt}>
      <Line
        points={ringPoints}
        color={selected ? "#84dcff" : "#5878ab"}
        transparent
        opacity={selected ? 0.22 : 0.08}
        lineWidth={selected ? 0.7 : 0.48}
      />

      <line>
        <bufferGeometry ref={connectorGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(6), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={connectorMaterialRef}
          color={hovered || selected ? "#d6f2ff" : "#6f93c5"}
          transparent
          opacity={selected ? 0.46 : 0.14}
        />
      </line>

      <group ref={orbitRef}>
        <JobNode
          label={job.company}
          nodeColor={visual.nodeColor}
          nodeGlow={visual.nodeGlow}
          hovered={hovered}
          selected={selected}
          onHover={setHovered}
          onSelect={() => onSelect(job.id)}
        />
      </group>
    </group>
  );
}
