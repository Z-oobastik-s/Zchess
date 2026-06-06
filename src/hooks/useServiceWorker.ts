import { useEffect, useState, useCallback } from 'react';
import { assetPath } from '@/utils/assetPath';

interface UpdateState {
  updateAvailable: boolean;
  updating: boolean;
}

export function useServiceWorker() {
  const [state, setState] = useState<UpdateState>({
    updateAvailable: false,
    updating: false,
  });

  const applyUpdate = useCallback(() => {
    setState((s) => ({ ...s, updating: true }));
    navigator.serviceWorker?.getRegistration().then((reg) => {
      reg?.waiting?.postMessage({ type: 'SKIP_WAITING' });
    });
    window.location.reload();
  }, []);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register(assetPath('sw.js'), {
          scope: assetPath(''),
        });

        reg.addEventListener('updatefound', () => {
          const worker = reg.installing;
          if (!worker) return;

          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              setState((s) => ({ ...s, updateAvailable: true }));
            }
          });
        });

        setInterval(() => reg.update(), 5 * 60 * 1000);
      } catch (err) {
        console.warn('SW registration failed:', err);
      }
    };

    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', register);
      return () => window.removeEventListener('load', register);
    }
  }, []);

  return { ...state, applyUpdate };
}
