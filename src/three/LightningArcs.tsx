import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ARC_COUNT = 6;

function createArcPoints(radius: number, segments: number): Float32Array {
  const startAngle = Math.random() * Math.PI * 2;
  const arcLength = 0.4 + Math.random() * 0.8;
  const arr = new Float32Array((segments + 1) * 3);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = startAngle + arcLength * t;
    const r = radius + (Math.random() - 0.5) * 0.3;
    arr[i * 3] = Math.cos(angle) * r;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
    arr[i * 3 + 2] = Math.sin(angle) * r;
  }
  return arr;
}

export function LightningArcs() {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    return Array.from({ length: ARC_COUNT }, () => {
      const positions = createArcPoints(3 + Math.random() * 0.5, 12);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.LineBasicMaterial({
        color: '#D44CFF',
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Line(geo, mat);
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }

    lines.forEach((line, i) => {
      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = Math.max(0, 0.3 + Math.sin(t * 3 + i * 1.5) * 0.5);
    });
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}
