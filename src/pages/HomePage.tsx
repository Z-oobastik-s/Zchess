import { lazy, Suspense } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/sections/HeroSection';
import { StatsSection } from '@/sections/StatsSection';
import { useParallaxBackground } from '@/hooks/useParallaxBackground';
import bgHome from '../../assets/Image/background_home_page.png';

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
  useParallaxBackground('[data-parallax-bg]');

  return (
    <div className="relative min-h-screen xl:h-screen xl:overflow-hidden bg-[#05020B] overflow-x-hidden">
      <div
        data-parallax-bg
        className="fixed inset-0 z-0 pointer-events-none will-change-transform bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgHome})` }}
      />

      <div className="relative z-10 flex flex-col min-h-screen xl:h-full">
        <Header />

        <main className="flex-1 xl:min-h-0 w-full max-w-[1920px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(250px,290px)_1fr_minmax(250px,290px)] gap-3 xl:gap-4 xl:h-full items-start xl:items-stretch">
            {/* Левая колонка */}
            <aside className="hidden xl:flex xl:flex-col xl:gap-1 xl:h-full xl:min-h-0 xl:overflow-y-auto scrollbar-hide xl:py-1">
              <div className="mb-1">
                <h3 className="section-title mb-2">О платформе</h3>
                <StatsSection compact />
              </div>
              <Suspense fallback={<PanelFallback />}>
                <ModesSection compact />
                <DifficultySection compact />
                <SideSelectionSection compact />
              </Suspense>
            </aside>

            {/* Центральная колонка */}
            <div className="flex flex-col items-center justify-center min-h-[60vh] xl:min-h-0 xl:h-full xl:py-2">
              <HeroSection />
              <div className="xl:hidden w-full">
                <StatsSection />
              </div>
            </div>

            {/* Правая колонка */}
            <aside className="hidden xl:flex xl:flex-col xl:gap-1 xl:h-full xl:min-h-0 xl:overflow-y-auto scrollbar-hide xl:py-1">
              <Suspense fallback={<PanelFallback />}>
                <PlatformFeaturesSection compact />
                <PlayerStatsSection compact />
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

        <div className="xl:hidden">
          <Suspense fallback={null}>
            <FooterSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
