import { createRoot } from 'react-dom/client';
import './styles/index.css';
import '@/animations/gsapSetup';
import App from './App';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const redirect = sessionStorage.getItem('redirect');
if (redirect) {
  sessionStorage.removeItem('redirect');
  history.replaceState(null, '', redirect);
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
