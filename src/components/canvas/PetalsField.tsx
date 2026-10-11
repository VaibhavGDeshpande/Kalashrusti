'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PetalData {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  speed: number;
  rotSpeed: THREE.Vector3;
  scale: number;
  color: THREE.Color;
}

export const PetalsField: React.FC<{ count?: number }> = ({ count = 45 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Marigold petal color palette (golden marigold, rich saffron, warm orange, deep marigold)
  const petalColors = useMemo(
    () => [
      new THREE.Color('#F5A623'),
      new THREE.Color('#FFBD59'),
      new THREE.Color('#D4880D'),
      new THREE.Color('#E67E22'),
      new THREE.Color('#C9A24B'),
    ],
    []
  );

  const petals = useMemo<PetalData[]>(() => {
    const arr: PetalData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10 + 1,
          (Math.random() - 0.5) * 8
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        speed: 0.004 + Math.random() * 0.008,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        scale: 0.12 + Math.random() * 0.18,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }
    return arr;
  }, [count, petalColors]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    petals.forEach((p, i) => {
      // Gentle downward drift with subtle sinusoidal swirl
      p.position.y -= p.speed;
      p.position.x += Math.sin(time * 0.8 + i) * 0.003;
      p.position.z += Math.cos(time * 0.6 + i) * 0.002;

      // Reset when falling below bottom
      if (p.position.y < -4) {
        p.position.y = 5.5;
        p.position.x = (Math.random() - 0.5) * 14;
      }

      // Rotate petal softly
      p.rotation.x += p.rotSpeed.x;
      p.rotation.y += p.rotSpeed.y;
      p.rotation.z += p.rotSpeed.z;

      dummy.position.copy(p.position);
      dummy.rotation.copy(p.rotation);
      dummy.scale.set(p.scale, p.scale * 1.5, p.scale * 0.4);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, p.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Organic teardrop / curved petal geometry */}
      <dodecahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial
        roughness={0.65}
        metalness={0.15}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};
