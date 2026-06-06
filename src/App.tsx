import { useEffect } from 'react';
import { HomePage } from '@/pages/HomePage';
import { UpdateBanner } from '@/components/UpdateBanner';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { initGsap } from '@/animations/gsapSetup';

export default function App() {
  const { updateAvailable, updating, applyUpdate } = useServiceWorker();

  useEffect(() => {
    initGsap();
  }, []);

  return (
    <>
      <HomePage />
      <UpdateBanner
        visible={updateAvailable}
        updating={updating}
        onUpdate={applyUpdate}
      />
    </>
  );
}
