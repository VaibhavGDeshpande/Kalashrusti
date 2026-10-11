'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HamperBoxModelProps {
  selectedItems: string[];
}

export const HamperBoxModel: React.FC<HamperBoxModelProps> = ({ selectedItems }) => {
  const trunkRef = useRef<THREE.Group>(null!);
  const flameRef = useRef<THREE.Mesh>(null!);
  const flameLightRef = useRef<THREE.PointLight>(null!);

  const hasDiya = selectedItems.includes('h-1');
  const hasToran = selectedItems.includes('h-2');
  const hasRangoli = selectedItems.includes('h-3');
  const hasDhoop = selectedItems.includes('h-4');
  const hasSweets = selectedItems.includes('h-5');
  const hasBell = selectedItems.includes('h-6');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (flameRef.current && hasDiya) {
      const flicker = 1 + Math.sin(t * 14) * 0.1;
      flameRef.current.scale.set(flicker, flicker * 1.1, flicker);
    }

    if (flameLightRef.current && hasDiya) {
      flameLightRef.current.intensity = 2.0 + Math.sin(t * 12) * 0.4;
    }
  });

  return (
    <group ref={trunkRef} position={[0, -0.4, 0]}>
      {/* ======================================================== */}
      {/* 1. LUXURY WOODEN GIFT TRUNK BASE (Lacquered Teakwood) */}
      {/* ======================================================== */}
      {/* Bottom Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.12, 2.4]} />
        <meshStandardMaterial
          color="#3A1218"
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      {/* Front Wall */}
      <mesh position={[0, 0.45, 1.15]}>
        <boxGeometry args={[3.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#4A121C" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 0.45, -1.15]}>
        <boxGeometry args={[3.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#4A121C" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-1.55, 0.45, 0]}>
        <boxGeometry args={[0.1, 0.8, 2.2]} />
        <meshStandardMaterial color="#4A121C" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[1.55, 0.45, 0]}>
        <boxGeometry args={[0.1, 0.8, 2.2]} />
        <meshStandardMaterial color="#4A121C" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Velvet Interior Cushioned Lining (Crimson Silk) */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2.95, 0.08, 2.15]} />
        <meshStandardMaterial
          color="#5A1522"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* Golden Corner Trim Brackets */}
      {[-1.58, 1.58].map((x, i) =>
        [-1.18, 1.18].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.45, z]}>
            <boxGeometry args={[0.08, 0.82, 0.08]} />
            <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.2} />
          </mesh>
        ))
      )}

      {/* Front Golden Lock & Latch Plate */}
      <mesh position={[0, 0.6, 1.21]}>
        <boxGeometry args={[0.3, 0.25, 0.04]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Open Hinged Lid Angled Backwards */}
      <group position={[0, 0.85, -1.2]} rotation={[-Math.PI / 3.2, 0, 0]}>
        <mesh position={[0, 0.05, 1.15]}>
          <boxGeometry args={[3.25, 0.1, 2.35]} />
          <meshStandardMaterial color="#3A1218" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Golden Embossed Kalash Medallion on Inside Lid */}
        <mesh position={[0, 0.11, 1.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.02, 32]} />
          <meshStandardMaterial color="#F5A623" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. DYNAMICALLY PLACED 3D ITEMS INSIDE THE BOX */}
      {/* ======================================================== */}

      {/* ITEM 1: Pure Brass Diya (Center Left) */}
      {hasDiya && (
        <group position={[-0.65, 0.35, 0.15]} scale={[0.85, 0.85, 0.85]}>
          {/* Diya Base */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.35, 0.45, 0.1, 24]} />
            <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Diya Bowl */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.4, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#B88A2E" metalness={0.88} roughness={0.25} side={THREE.DoubleSide} />
          </mesh>
          {/* Diya Oil & Wick */}
          <mesh position={[0.2, 0.05, 0]} rotation={[0, 0, -Math.PI / 5]}>
            <cylinderGeometry args={[0.015, 0.02, 0.1, 8]} />
            <meshStandardMaterial color="#221105" roughness={0.9} />
          </mesh>
          {/* Glowing Flame */}
          <mesh ref={flameRef} position={[0.22, 0.16, 0]}>
            <coneGeometry args={[0.07, 0.22, 12]} />
            <meshBasicMaterial color="#FFB020" />
          </mesh>
          {/* Point Light from Diya Flame */}
          <pointLight
            ref={flameLightRef}
            position={[0.22, 0.25, 0]}
            color="#F5A623"
            intensity={2.2}
            distance={4}
            decay={2}
          />
        </group>
      )}

      {/* ITEM 2: Sola Marigold Flower Mala (Curved garland around edges) */}
      {hasToran && (
        <group position={[0, 0.3, 0]}>
          {[-1.1, -0.6, -0.1, 0.4, 0.9, 1.2].map((x, idx) => (
            <mesh key={idx} position={[x, 0.05 + Math.sin(idx * 0.8) * 0.04, 0.85]}>
              <sphereGeometry args={[0.13, 14, 14]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#F5A623' : '#E67E22'}
                roughness={0.7}
              />
            </mesh>
          ))}
          {/* Golden Bell accents */}
          <mesh position={[0.1, 0.02, 0.88]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#C9A24B" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>
      )}

      {/* ITEM 3: Kundan Rangoli Disc (Front Center-Right) */}
      {hasRangoli && (
        <group position={[0.65, 0.16, 0.35]} rotation={[0, 0.2, 0]}>
          {/* Base Acrylic disc */}
          <mesh>
            <cylinderGeometry args={[0.42, 0.42, 0.04, 32]} />
            <meshStandardMaterial color="#6B1D2A" roughness={0.3} metalness={0.4} />
          </mesh>
          {/* Central Ruby Gem */}
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 0.03, 16]} />
            <meshStandardMaterial color="#B0152B" roughness={0.1} metalness={0.5} />
          </mesh>
          {/* Gold Petal Beads */}
          {[0, 1, 2, 3, 4, 5].map((angle, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((angle * Math.PI) / 3) * 0.28,
                0.03,
                Math.sin((angle * Math.PI) / 3) * 0.28,
              ]}
            >
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshStandardMaterial color="#DFC47F" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
        </group>
      )}

      {/* ITEM 4: Organic Chandan Dhoop Cones (Back Left) */}
      {hasDhoop && (
        <group position={[-0.85, 0.22, -0.6]}>
          {[-0.14, 0.0, 0.14].map((offsetX, idx) => (
            <mesh key={idx} position={[offsetX, 0.08, idx === 1 ? -0.1 : 0]}>
              <coneGeometry args={[0.08, 0.24, 16]} />
              <meshStandardMaterial color="#5C4033" roughness={0.85} />
            </mesh>
          ))}
          {/* Small polished wooden holder */}
          <mesh position={[0, -0.02, -0.05]}>
            <cylinderGeometry args={[0.28, 0.3, 0.04, 20]} />
            <meshStandardMaterial color="#2E1C14" roughness={0.6} />
          </mesh>
        </group>
      )}

      {/* ITEM 5: Artisanal Sweets Box / Kaju Katli (Center Back) */}
      {hasSweets && (
        <group position={[0.1, 0.25, -0.55]} rotation={[0, -0.15, 0]}>
          {/* Hexagonal sweet box */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.22, 6]} />
            <meshStandardMaterial color="#C9A24B" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Silver foil top accent */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.02, 6]} />
            <meshStandardMaterial color="#E0E0E0" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      )}

      {/* ITEM 6: Solid Brass Pooja Bell (Back Right) */}
      {hasBell && (
        <group position={[0.85, 0.35, -0.55]}>
          {/* Bell Body */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.08, 0.22, 0.25, 24]} />
            <meshStandardMaterial color="#C9A24B" metalness={0.92} roughness={0.18} />
          </mesh>
          {/* Bell Handle */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.2, 12]} />
            <meshStandardMaterial color="#C9A24B" metalness={0.92} roughness={0.2} />
          </mesh>
          {/* Handle Garuda / Finial */}
          <mesh position={[0, 0.27, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#DFC47F" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>
      )}
    </group>
  );
};
