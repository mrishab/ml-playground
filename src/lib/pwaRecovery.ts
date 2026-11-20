/**
 * Service Worker and stale cache recovery utilities.
 * Completely clears outdated caches, unregisters stale service workers,
 * and recovers from chunk loading failures to prevent blank white screens.
 */

export async function clearAppCacheAndReload(): Promise<void> {
  try {
    // 1. Unregister all service workers
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((reg) => reg.unregister()));
    }

    // 2. Clear all CacheStorage caches
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }

    // 3. Clear session storage
    sessionStorage.clear();
  } catch (err) {
    console.error("[pwaRecovery] Cache clear error:", err);
  } finally {
    // 4. Force hard reload with timestamp query to bypass HTTP cache
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.set("reload", Date.now().toString());
    window.location.href = cleanUrl.toString();
  }
}

export function isChunkLoadError(error: unknown): boolean {
  if (!error) return false;
  const msg =
    typeof error === "string"
      ? error
      : (error as Error)?.message || (error as Error)?.name || "";
  return (
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("Loading chunk") ||
    msg.includes("error loading dynamically imported module") ||
    msg.includes("Importing a module script failed")
  );
}

export function initPWARecovery(): void {
  // Global catch for chunk loading errors
  window.addEventListener("error", (event) => {
    if (isChunkLoadError(event.error || event.message)) {
      console.warn("[pwaRecovery] Caught chunk load error, clearing cache...");
      const lastReload = sessionStorage.getItem("pwa_chunk_reload");
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem("pwa_chunk_reload", now.toString());
        void clearAppCacheAndReload();
      }
    }
  });

  window.addEventListener("unhandledrejection", (event) => {
    if (isChunkLoadError(event.reason)) {
      console.warn("[pwaRecovery] Caught unhandled rejection chunk error...");
      const lastReload = sessionStorage.getItem("pwa_chunk_reload");
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem("pwa_chunk_reload", now.toString());
        void clearAppCacheAndReload();
      }
    }
  });

  // Check if service worker has an update waiting
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((reg) => {
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                console.info(
                  "[pwaRecovery] New service worker version installed.",
                );
              }
            });
          }
        });
      })
      .catch(() => {
        // Service worker not ready or unsupported
      });
  }
}
