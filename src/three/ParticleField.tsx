import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  mouseRef: React.RefObject<{ normalizedX: number; normalizedY: number }>;
}

export function ParticleField({ count = 800, radius = 12, mouseRef }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.3 + Math.random() * 0.7);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * radius * 1.5;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      sz[i] = Math.random() * 2 + 0.5;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sz, 1));
    return geo;
  }, [count, radius]);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      vel[i] = (Math.random() - 0.5) * 0.002;
    }
    return vel;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current?.normalizedX ?? 0;
    const my = mouseRef.current?.normalizedY ?? 0;

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i) + velocities[i * 3];
      let y = posAttr.getY(i) + velocities[i * 3 + 1];
      let z = posAttr.getZ(i) + velocities[i * 3 + 2];

      x += mx * 0.003;
      y += my * 0.002;
      z += Math.sin(t * 0.5 + i * 0.01) * 0.001;

      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > radius) {
        x *= 0.95;
        y *= 0.95;
        z *= 0.95;
      }

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.02 + mx * 0.1;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#B05CFF"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
