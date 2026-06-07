import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import type { MousePosition } from '@/hooks/useMouseParallax';

const KingHero = lazy(() =>
  import('./KingHero').then((m) => ({ default: m.KingHero })),
);
const EnergyRing = lazy(() =>
  import('./EnergyRing').then((m) => ({ default: m.EnergyRing })),
);
const ParticleField = lazy(() =>
  import('./ParticleField').then((m) => ({ default: m.ParticleField })),
);
const LightningArcs = lazy(() =>
  import('./LightningArcs').then((m) => ({ default: m.LightningArcs })),
);

interface SceneCanvasProps {
  mouseRef: React.RefObject<MousePosition>;
  reducedMotion: boolean;
}

function SceneContent({ mouseRef, reducedMotion }: SceneCanvasProps) {
  return (
    <>
      <KingHero mouseRef={mouseRef} />
      <EnergyRing mouseRef={mouseRef} />
      {!reducedMotion && (
        <>
          <ParticleField mouseRef={mouseRef} count={600} />
          <LightningArcs />
        </>
      )}
    </>
  );
}

export function SceneCanvas({ mouseRef, reducedMotion }: SceneCanvasProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent mouseRef={mouseRef} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
