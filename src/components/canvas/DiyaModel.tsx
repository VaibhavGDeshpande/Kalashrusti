'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const DiyaModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const flameRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const { mouse } = useThree();

  // Procedural brass diya structure
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating bob
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.08 - 0.2;

      // Cursor follow & gentle tilt
      const targetRotX = (mouse.y * 0.2) + 0.35; // Slight top-down viewing angle
      const targetRotY = (mouse.x * 0.4) + Math.sin(t * 0.4) * 0.08;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }

    if (flameRef.current) {
      // Flame flicker micro-transformations
      const flickerScale = 1 + Math.sin(t * 14) * 0.08 + Math.cos(t * 22) * 0.04;
      flameRef.current.scale.set(flickerScale * 0.9, flickerScale * 1.15, flickerScale * 0.9);
      flameRef.current.position.x = Math.sin(t * 18) * 0.015;
    }

    if (lightRef.current) {
      // Dynamic warm flame light intensity
      lightRef.current.intensity = 2.4 + Math.sin(t * 16) * 0.45;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.4, 1.4, 1.4]}>
      {/* 1. Base pedestal (Brass) */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.7, 0.95, 0.18, 32]} />
        <meshStandardMaterial
          color="#C9A24B"
          metalness={0.88}
          roughness={0.25}
        />
      </mesh>

      {/* 2. Diya main oil bowl */}
      <mesh position={[0, -0.22, 0]}>
        <sphereGeometry args={[0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial
          color="#B88A2E"
          metalness={0.85}
          roughness={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Diya rim & spout (Beveled mouth) */}
      <mesh position={[0, -0.2, 0]}>
        <torusGeometry args={[0.85, 0.07, 16, 48]} />
        <meshStandardMaterial
          color="#DFC47F"
          metalness={0.92}
          roughness={0.18}
        />
      </mesh>

      {/* 4. Pure Brass decorative floral ridges */}
      <mesh position={[0, -0.38, 0]}>
        <torusGeometry args={[0.55, 0.05, 12, 32]} />
        <meshStandardMaterial
          color="#A5802E"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* 5. Ghee / Oil surface in reservoir */}
      <mesh position={[0, -0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial
          color="#6B1D2A"
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* 6. Cotton wick tip */}
      <mesh position={[0.42, -0.14, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.025, 0.035, 0.16, 12]} />
        <meshStandardMaterial color="#2B1A12" roughness={0.9} />
      </mesh>

      {/* 7. Golden Flame */}
      <mesh ref={flameRef} position={[0.46, 0.04, 0]}>
        <coneGeometry args={[0.11, 0.38, 16]} />
        <meshBasicMaterial color="#FFB020" />
      </mesh>

      {/* 8. Inner white-hot flame core */}
      <mesh position={[0.46, -0.02, 0]}>
        <coneGeometry args={[0.055, 0.2, 16]} />
        <meshBasicMaterial color="#FFFEEA" />
      </mesh>

      {/* 9. Warm point light cast by the flame */}
      <pointLight
        ref={lightRef}
        position={[0.46, 0.15, 0]}
        color="#F5A623"
        intensity={2.5}
        distance={6}
        decay={2}
      />
    </group>
  );
};
