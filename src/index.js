import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { precacheExerciseImages } from './precacheImages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register({
  // A new version finished installing in the background: let the UI offer it.
  onUpdate: (registration) => {
    window.__swUpdateRegistration = registration;
    window.dispatchEvent(
      new CustomEvent('sw-update-available', { detail: registration })
    );
  },
});

// Once the page has loaded, quietly cache the built-in exercise images so they
// are available offline. Production only, because no service worker runs in dev.
if (process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    const run = () => precacheExerciseImages();
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: 5000 });
    } else {
      setTimeout(run, 3000);
    }
  });
}
