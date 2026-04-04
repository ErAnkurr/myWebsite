import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";
import "./style.css";

interface JobNodeProps {
  label: string;
  nodeColor: string;
  nodeGlow: string;
  hovered: boolean;
  selected: boolean;
  onHover: (hovered: boolean) => void;
  onSelect: () => void;
}

export function JobNode({
  label,
  nodeColor,
  nodeGlow,
  hovered,
  selected,
  onHover,
  onSelect,
}: JobNodeProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }
    const targetScale = hovered ? 1.2 : selected ? 1.08 : 1;
    const currentScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
    groupRef.current.scale.setScalar(nextScale);

    const targetZ = hovered ? 0.4 : selected ? 0.16 : 0;
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.08,
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        onHover(false);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <mesh>
        <sphereGeometry args={[0.17, 32, 32]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeGlow}
          emissiveIntensity={hovered ? 3.8 : selected ? 2.5 : 1.7}
          metalness={0.06}
          roughness={0.22}
        />
      </mesh>

      <mesh scale={hovered ? 2.05 : selected ? 1.55 : 1.28}>
        <sphereGeometry args={[0.22, 28, 28]} />
        <meshBasicMaterial
          color={nodeGlow}
          transparent
          opacity={hovered ? 0.28 : selected ? 0.18 : 0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={0.52}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshBasicMaterial
          color="#ffe4bd"
          transparent
          opacity={hovered ? 0.96 : 0.78}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <Html
        position={[0, 0.52, 0]}
        center
        transform
        sprite
        distanceFactor={11}
        zIndexRange={[20, 0]}
      >
        <div
          className={[
            "job-node-tooltip",
            hovered ? "is-visible" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}
