import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import kingTexture from '../../assets/Image/1.png';

interface KingHeroProps {
  mouseRef: React.RefObject<{ normalizedX: number; normalizedY: number }>;
}

function KingMesh({ mouseRef }: KingHeroProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(kingTexture);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current?.normalizedX ?? 0;
    const my = mouseRef.current?.normalizedY ?? 0;

    if (groupRef.current) {
      groupRef.current.rotation.y = mx * 0.2;
      groupRef.current.rotation.x = my * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.05;
      glowRef.current.scale.set(2.8 * pulse, 4.2 * pulse, 1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      <mesh ref={glowRef} position={[0, 0, -0.5]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#8B3DFF"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.4, 3.6]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.1}
          metalness={0.85}
          roughness={0.15}
          emissive="#4a1a8a"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      <pointLight position={[0, 1, 2]} color="#D44CFF" intensity={3} distance={8} />
      <pointLight position={[2, -1, 1]} color="#8B3DFF" intensity={2} distance={6} />
      <pointLight position={[-2, 0, 1]} color="#B05CFF" intensity={1.5} distance={5} />
    </group>
  );
}

export function KingHero({ mouseRef }: KingHeroProps) {
  return (
    <Suspense fallback={null}>
      <KingMesh mouseRef={mouseRef} />
    </Suspense>
  );
}
