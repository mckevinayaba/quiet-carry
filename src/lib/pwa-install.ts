// PWA install prompt utilities — platform detection, LS state, listener bus

// ── Types ─────────────────────────────────────────────────────────────────────

export type DeferredInstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

// ── Module-level prompt capture ───────────────────────────────────────────────
// Register listener immediately when this module loads (before React hydration)
// so we never miss the early-firing beforeinstallprompt event.

let _deferredPrompt: DeferredInstallPrompt | null = null;
const _captureListeners = new Set<(evt: DeferredInstallPrompt) => void>();

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // suppress browser mini-infobar so we control timing
    _deferredPrompt = e as DeferredInstallPrompt;
    console.log("[PWA] beforeinstallprompt fired — native install available");
    _captureListeners.forEach((l) => l(_deferredPrompt!));
  });

  window.addEventListener("appinstalled", () => {
    console.log("[PWA] appinstalled event — marking accepted");
    markInstallAccepted();
    _deferredPrompt = null;
  });
}

/** Get the currently stored deferred prompt (may be null). */
export function getDeferredPrompt(): DeferredInstallPrompt | null {
  return _deferredPrompt;
}

/** Clear the stored prompt after use (Chrome only allows calling prompt() once). */
export function clearDeferredPrompt() {
  _deferredPrompt = null;
}

/**
 * Subscribe to deferred prompt availability.
 * If the prompt was already captured before subscription, cb fires immediately.
 * Returns an unsubscribe function.
 */
export function onDeferredPromptCaptured(cb: (evt: DeferredInstallPrompt) => void): () => void {
  _captureListeners.add(cb);
  if (_deferredPrompt) cb(_deferredPrompt); // already captured → notify immediately
  return () => { _captureListeners.delete(cb); };
}

// ── LS keys ───────────────────────────────────────────────────────────────────

const LS = {
  dismissedAt: "tnynt-install-dismissed-at",
  accepted: "tnynt-install-accepted",
  seen: "tnynt-install-prompt-seen",
} as const;

// 7 days — short enough for launch testing, long enough not to pester daily users
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

// ── Platform detection ────────────────────────────────────────────────────────

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true;
}

export function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  return /iP(hone|ad|od)/i.test(navigator.userAgent) && !("MSStream" in window);
}

export function isSamsungInternet(): boolean {
  if (typeof window === "undefined") return false;
  return /SamsungBrowser/i.test(navigator.userAgent);
}

// ── State helpers ─────────────────────────────────────────────────────────────

export function isInstallAccepted(): boolean {
  try { return localStorage.getItem(LS.accepted) === "1"; } catch { return false; }
}

export function shouldShowInstallPrompt(): boolean {
  if (isStandalone()) {
    console.log("[PWA] already standalone — hiding prompt");
    return false;
  }
  if (isInstallAccepted()) return false;
  try {
    const dismissedAt = localStorage.getItem(LS.dismissedAt);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      if (elapsed < DISMISS_COOLDOWN_MS) return false;
    }
  } catch { /* ignore */ }
  return true;
}

export function markInstallDismissed() {
  try {
    localStorage.setItem(LS.dismissedAt, String(Date.now()));
    // Clean up keys from previous implementations
    localStorage.removeItem("tnynyt-install-dismissed");
  } catch { /* ignore */ }
}

export function markInstallAccepted() {
  try {
    localStorage.setItem(LS.accepted, "1");
    localStorage.removeItem("tnynyt-install-dismissed");
  } catch { /* ignore */ }
}

export function markInstallSeen() {
  try { localStorage.setItem(LS.seen, "1"); } catch { /* ignore */ }
}

/** Dev helper: reset all install LS keys so you can re-test the prompt. */
export function resetInstallState() {
  try {
    localStorage.removeItem(LS.dismissedAt);
    localStorage.removeItem(LS.accepted);
    localStorage.removeItem(LS.seen);
    localStorage.removeItem("tnynyt-install-dismissed");
    console.log("[PWA] install state reset — prompt will show again on next trigger");
  } catch { /* ignore */ }
}

// ── Request-prompt listener bus ───────────────────────────────────────────────

type InstallListener = () => void;
const _requestListeners = new Set<InstallListener>();

export function onInstallPromptRequested(listener: InstallListener): () => void {
  _requestListeners.add(listener);
  return () => { _requestListeners.delete(listener); };
}

/** Call from any page to trigger the install prompt check. */
export function requestInstallPrompt() {
  _requestListeners.forEach((l) => l());
}
