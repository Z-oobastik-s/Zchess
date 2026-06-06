import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import bgTexture from '../../assets/Image/background.png';

interface AtmosphericBackgroundProps {
  mouseRef: React.RefObject<{ normalizedX: number; normalizedY: number }>;
}

function BackgroundMesh({ mouseRef }: AtmosphericBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(bgTexture);

  useFrame(() => {
    if (!meshRef.current) return;
    const mx = mouseRef.current?.normalizedX ?? 0;
    const my = mouseRef.current?.normalizedY ?? 0;
    meshRef.current.position.x = mx * 0.3;
    meshRef.current.position.y = my * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -8]} scale={[16, 9, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.35}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function AtmosphericBackground({ mouseRef }: AtmosphericBackgroundProps) {
  return (
    <Suspense fallback={null}>
      <BackgroundMesh mouseRef={mouseRef} />
      <fog attach="fog" args={['#05020B', 8, 25]} />
      <ambientLight intensity={0.15} color="#1a0a2e" />
    </Suspense>
  );
}
