import React, { useState, useEffect } from 'react';

// Shows a banner when a new version of the app has been downloaded in the
// background. The user decides when to apply it so that unsaved input (for
// example a half-filled "add exercise" form) is never lost unexpectedly.
//
// The registration is handed over by src/index.js either through
// `window.__swUpdateRegistration` (if it arrived before this component
// mounted) or through the `sw-update-available` event.
const UpdatePrompt = () => {
  const [registration, setRegistration] = useState(
    () => window.__swUpdateRegistration || null
  );
  const [updating, setUpdating] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = (event) => {
      setRegistration(event.detail || window.__swUpdateRegistration || null);
      setDismissed(false);
    };
    window.addEventListener('sw-update-available', handleUpdateAvailable);
    return () => {
      window.removeEventListener('sw-update-available', handleUpdateAvailable);
    };
  }, []);

  const handleUpdate = () => {
    const waitingWorker = registration && registration.waiting;
    if (!waitingWorker) {
      // Nothing waiting any more (e.g. already applied in another tab).
      window.location.reload();
      return;
    }

    setUpdating(true);

    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });

    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  };

  if (!registration || dismissed) {
    return null;
  }

  return (
    <div
      className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto"
      role="status"
      aria-live="polite"
    >
      <div className="bg-gray-900 border border-green-500 border-opacity-40 rounded-xl p-4 shadow-2xl">
        <h3 className="text-white font-semibold text-sm mb-1">
          A new version is available
        </h3>
        <p className="text-gray-300 text-xs mb-3">
          Update now to get the latest improvements. The app will reload.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm rounded-lg transition-colors"
          >
            {updating ? 'Updating...' : 'Update'}
          </button>
          <button
            onClick={() => setDismissed(true)}
            disabled={updating}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-60 text-gray-300 text-sm rounded-lg transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePrompt;
