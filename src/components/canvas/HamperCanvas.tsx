'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { HamperBoxModel } from './HamperBoxModel';
import { CanvasFallback } from './CanvasFallback';

interface HamperCanvasProps {
  selectedItems: string[];
}

export default function HamperCanvas({ selectedItems }: HamperCanvasProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  if (!hasMounted || !webGLSupported) {
    return <CanvasFallback />;
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] select-none">
      <Suspense fallback={<CanvasFallback />}>
        <Canvas
          camera={{ position: [0, 2.6, 3.8], fov: 48 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="cursor-grab active:cursor-grabbing"
        >
          {/* Ambient Warm Golden Fill */}
          <ambientLight intensity={0.9} color="#FFF8EC" />

          {/* Key Light from Front Right */}
          <directionalLight
            position={[4, 7, 5]}
            intensity={1.8}
            color="#FFE6B8"
          />

          {/* Fill Light from Left */}
          <directionalLight
            position={[-4, 3, 2]}
            intensity={0.8}
            color="#FFF0D0"
          />

          {/* Deep Maroon Rim Light from Back */}
          <directionalLight
            position={[0, 4, -4]}
            intensity={1.0}
            color="#8E2737"
          />

          {/* The Procedural Hamper Box with Items */}
          <HamperBoxModel selectedItems={selectedItems} />

          {/* Interactive OrbitControls with sensible rotation limits */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.4}
            maxDistance={5.8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.3}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>

      {/* 360° Drag & Rotate Floating Pill Guide */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[#FFF8EC] text-[11px] font-medium border border-white/20 shadow-md pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-ping" />
        <span>Drag to rotate • Scroll to zoom 3D gift box</span>
      </div>
    </div>
  );
}
