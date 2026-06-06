import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnergyRingProps {
  mouseRef: React.RefObject<{ normalizedX: number; normalizedY: number }>;
}

export function EnergyRing({ mouseRef }: EnergyRingProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current?.normalizedX ?? 0;
    const my = mouseRef.current?.normalizedY ?? 0;

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      ringRef.current.rotation.x = Math.PI / 2 + my * 0.15;
      ringRef.current.rotation.y = mx * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.5;
      ring2Ref.current.rotation.x = Math.PI / 2 + my * 0.1;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.03;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={glowRef}>
        <torusGeometry args={[3.2, 0.8, 16, 64]} />
        <meshBasicMaterial
          color="#8B3DFF"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[3, 0.04, 8, 128]} />
        <meshStandardMaterial
          color="#D44CFF"
          emissive="#8B3DFF"
          emissiveIntensity={2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.4, 0.02, 8, 128]} />
        <meshStandardMaterial
          color="#B05CFF"
          emissive="#D44CFF"
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 3, Math.sin(angle) * 0.3, Math.sin(angle) * 3]}
          >
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#D44CFF"
              emissive="#8B3DFF"
              emissiveIntensity={3}
            />
          </mesh>
        );
      })}
    </group>
  );
}
