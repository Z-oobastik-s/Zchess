import { useEffect } from 'react';
import { HomePage } from '@/pages/HomePage';
import { UpdateBanner } from '@/components/UpdateBanner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { initGsap } from '@/animations/gsapSetup';

export default function App() {
  const { updateAvailable, updating, applyUpdate } = useServiceWorker();

  useEffect(() => {
    initGsap();
  }, []);

  return (
    <>
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
      <UpdateBanner
        visible={updateAvailable}
        updating={updating}
        onUpdate={applyUpdate}
      />
    </>
  );
}
