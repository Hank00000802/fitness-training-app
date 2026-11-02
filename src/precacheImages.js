import { exerciseData, DEFAULT_EXERCISE_IMAGE } from './data/exerciseData';

// Files in /public are not part of the Workbox precache manifest, so exercise
// images would otherwise only be cached after the user opens each one online.
// This warms the "images" runtime cache (same cache used in service-worker.js)
// in the background so every built-in exercise image works offline.

const IMAGE_CACHE_NAME = 'images';

const getBuiltInImageUrls = () => {
  // The fallback image is needed offline too (exercises without a picture).
  const urls = new Set([DEFAULT_EXERCISE_IMAGE]);
  Object.values(exerciseData.exercises || {}).forEach((list) => {
    list.forEach((exercise) => {
      if (typeof exercise.image === 'string' && exercise.image.startsWith('/images/')) {
        urls.add(exercise.image);
      }
    });
  });
  return Array.from(urls);
};

export const precacheExerciseImages = async () => {
  if (!('serviceWorker' in navigator) || !('caches' in window)) return;

  // Respect the user's data-saver preference and avoid wasting a failed attempt offline.
  const connection = navigator.connection;
  if (connection && connection.saveData) return;
  if (!navigator.onLine) return;

  try {
    await navigator.serviceWorker.ready;
    const cache = await caches.open(IMAGE_CACHE_NAME);

    const missing = [];
    for (const url of getBuiltInImageUrls()) {
      if (!(await cache.match(url))) {
        missing.push(url);
      }
    }

    // Small batches keep the main thread and network free for the actual UI.
    const BATCH_SIZE = 4;
    for (let i = 0; i < missing.length; i += BATCH_SIZE) {
      await Promise.all(
        missing.slice(i, i + BATCH_SIZE).map((url) =>
          cache.add(url).catch(() => {
            // Ignore individual failures; the runtime cache will retry on demand.
          })
        )
      );
    }
  } catch (error) {
    console.warn('Image precache skipped:', error);
  }
};
