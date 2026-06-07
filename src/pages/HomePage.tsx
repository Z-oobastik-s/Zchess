import { lazy, Suspense } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/sections/HeroSection';
import { StatsSection } from '@/sections/StatsSection';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useParallaxBackground } from '@/hooks/useParallaxBackground';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SceneFallback } from '@/components/SceneFallback';
import bgHome from '../../assets/Image/background_home_page.png';

const SceneCanvas = lazy(() =>
  import('@/three/SceneCanvas').then((m) => ({ default: m.SceneCanvas })),
);
const ModesSection = lazy(() =>
  import('@/sections/ModesSection').then((m) => ({ default: m.ModesSection })),
);
const DifficultySection = lazy(() =>
  import('@/sections/DifficultySection').then((m) => ({ default: m.DifficultySection })),
);
const FeaturesSection = lazy(() =>
  import('@/sections/FeaturesSection').then((m) => ({ default: m.FeaturesSection })),
);
const SideSelectionSection = lazy(() =>
  import('@/sections/SideSelectionSection').then((m) => ({ default: m.SideSelectionSection })),
);
const PlayerStatsSection = lazy(() =>
  import('@/sections/PlayerStatsSection').then((m) => ({ default: m.PlayerStatsSection })),
);
const PlatformFeaturesSection = lazy(() =>
  import('@/sections/PlatformFeaturesSection').then((m) => ({ default: m.PlatformFeaturesSection })),
);
const FooterSection = lazy(() =>
  import('@/sections/FooterSection').then((m) => ({ default: m.FooterSection })),
);

function PanelFallback() {
  return <div className="h-48 animate-pulse glass-panel rounded-2xl opacity-30" />;
}

export function HomePage() {
  const mouseRef = useMouseParallax();
  const reducedMotion = useReducedMotion();
  useParallaxBackground('[data-parallax-bg]');

  return (
    <div className="relative min-h-screen bg-[#05020B] overflow-x-hidden">
      <div
        data-parallax-bg
        className="fixed inset-0 z-0 pointer-events-none will-change-transform bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgHome})` }}
      />

      <ErrorBoundary fallback={<SceneFallback />}>
        <Suspense fallback={<SceneFallback />}>
          <SceneCanvas mouseRef={mouseRef} reducedMotion={reducedMotion} />
        </Suspense>
      </ErrorBoundary>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 w-full max-w-[1920px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(280px,320px)_1fr_minmax(280px,320px)] gap-4 xl:gap-6 items-start">
            {/* Левая колонка */}
            <aside className="hidden xl:block space-y-2 pt-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide">
              <div className="mb-6">
                <h3 className="section-title mb-4">О платформе</h3>
                <StatsSection compact />
              </div>
              <Suspense fallback={<PanelFallback />}>
                <ModesSection compact />
                <DifficultySection compact />
                <SideSelectionSection />
              </Suspense>
            </aside>

            {/* Центральная колонка */}
            <div className="flex flex-col items-center min-h-[70vh] xl:min-h-[85vh]">
              <HeroSection />
              <div className="xl:hidden w-full">
                <StatsSection />
              </div>
            </div>

            {/* Правая колонка */}
            <aside className="hidden xl:block space-y-2 pt-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide">
              <Suspense fallback={<PanelFallback />}>
                <PlatformFeaturesSection />
                <PlayerStatsSection />
                <FeaturesSection compact />
              </Suspense>
            </aside>
          </div>

          {/* Мобильные секции */}
          <div className="xl:hidden">
            <Suspense fallback={<PanelFallback />}>
              <ModesSection />
              <DifficultySection />
              <SideSelectionSection />
              <PlatformFeaturesSection />
              <PlayerStatsSection />
              <FeaturesSection />
            </Suspense>
          </div>
        </main>

        <Suspense fallback={null}>
          <FooterSection />
        </Suspense>
      </div>
    </div>
  );
}
