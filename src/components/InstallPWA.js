import React, { useState, useEffect } from 'react';

const isIOS = () => {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
};

const isStandalone = () => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
};

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    const dismissedKey = 'pwa-install-dismissed';
    if (localStorage.getItem(dismissedKey) === 'true') return;

    if (isIOS()) {
      setShowBanner(true);
      return;
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS()) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSGuide(false);
    setDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (dismissed || isStandalone() || !showBanner) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
        <div className="bg-gray-900 border border-blue-500 border-opacity-40 rounded-xl p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="text-2xl flex-shrink-0">?</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm mb-1">
                Install Fitness Training App
              </h3>
              <p className="text-gray-300 text-xs mb-3">
                Add this app to your home screen for quick access and offline support.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstall}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  {isIOS() ? 'How to Install' : 'Install App'}
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-sm w-full border border-white border-opacity-20">
            <h3 className="text-white font-semibold text-lg mb-4">Install on iPhone/iPad</h3>
            <ol className="text-gray-300 text-sm space-y-3 mb-6">
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                Tap the <strong className="text-white">Share</strong> button in Safari
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                Scroll down and tap <strong className="text-white">Add to Home Screen</strong>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                Tap <strong className="text-white">Add</strong> to confirm
              </li>
            </ol>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallPWA;
