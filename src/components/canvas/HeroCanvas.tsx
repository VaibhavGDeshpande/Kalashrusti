'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PetalsField } from './PetalsField';
import { DiyaModel } from './DiyaModel';
import { CanvasFallback } from './CanvasFallback';

export default function HeroCanvas() {
  const [hasMounted, setHasMounted] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setHasMounted(true);

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPrefersReduced(true);
    }

    // Test WebGL support safely
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  if (!hasMounted) return <CanvasFallback />;
  if (prefersReduced || !webGLSupported) return <CanvasFallback />;

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] select-none">
      <Suspense fallback={<CanvasFallback />}>
        <Canvas
          camera={{ position: [0, 0.4, 4.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="cursor-grab active:cursor-grabbing"
        >
          {/* Ambient festive warm light */}
          <ambientLight intensity={0.8} color="#FFF8EC" />

          {/* Directional gold key light */}
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.6}
            color="#FFE5B4"
          />

          {/* Deep maroon back rim light */}
          <directionalLight
            position={[-4, -2, -3]}
            intensity={0.6}
            color="#8E2737"
          />

          {/* Marigold floating petals */}
          <PetalsField count={40} />

          {/* Glowing Brass Diya (Procedural / Drop-in GLTF placeholder) */}
          {/* NOTE: To drop in a custom .glb model later, replace <DiyaModel /> with <useGLTF url="/models/diya.glb" /> */}
          <DiyaModel />
        </Canvas>
      </Suspense>
    </div>
  );
}
