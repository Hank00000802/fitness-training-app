import React, { useEffect } from 'react';

// How long the "Undo" bar stays on screen after something was deleted.
const UNDO_VISIBLE_MS = 10000;

// Bottom bar shown after any deletion: "<message>  [Undo] [x]".
// `toast` is { id, message } - a new id restarts the timer (a newer deletion replaces
// the previous bar).
const UndoToast = ({ toast, onUndo, onDismiss }) => {
  const toastId = toast ? toast.id : null;

  useEffect(() => {
    if (toastId === null) return undefined;
    const timer = setTimeout(onDismiss, UNDO_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [toastId, onDismiss]);

  if (!toast) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[60] max-w-md mx-auto"
      role="status"
      aria-live="polite"
    >
      <div className="bg-gray-900 border border-white border-opacity-30 rounded-xl px-4 py-3 shadow-2xl flex items-center gap-3">
        <p className="flex-1 min-w-0 text-sm text-white truncate">{toast.message}</p>
        <button
          onClick={onUndo}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex-shrink-0"
        >
          Undo
        </button>
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default UndoToast;
