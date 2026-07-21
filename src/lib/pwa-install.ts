// PWA install prompt utilities — platform detection, LS state, listener bus

const LS = {
  dismissedAt: "tnynt-install-dismissed-at",
  accepted: "tnynt-install-accepted",
  seen: "tnynt-install-prompt-seen",
} as const;

// Don't re-show within 30 days of dismissal
const DISMISS_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

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

export function isInstallAccepted(): boolean {
  try {
    return localStorage.getItem(LS.accepted) === "1";
  } catch {
    return false;
  }
}

export function shouldShowInstallPrompt(): boolean {
  if (isStandalone()) return false;
  if (isInstallAccepted()) return false;
  try {
    const dismissedAt = localStorage.getItem(LS.dismissedAt);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      if (elapsed < DISMISS_COOLDOWN_MS) return false;
    }
  } catch {
    // localStorage unavailable
  }
  return true;
}

export function markInstallDismissed() {
  try {
    localStorage.setItem(LS.dismissedAt, String(Date.now()));
    // Clear old key from previous implementation
    localStorage.removeItem("tnynyt-install-dismissed");
  } catch {
    // ignore
  }
}

export function markInstallAccepted() {
  try {
    localStorage.setItem(LS.accepted, "1");
    localStorage.removeItem("tnynyt-install-dismissed");
  } catch {
    // ignore
  }
}

export function markInstallSeen() {
  try {
    localStorage.setItem(LS.seen, "1");
  } catch {
    // ignore
  }
}

// ── Listener bus ─────────────────────────────────────────────────────────────

type InstallListener = () => void;
const installListeners = new Set<InstallListener>();

export function onInstallPromptRequested(listener: InstallListener): () => void {
  installListeners.add(listener);
  return () => { installListeners.delete(listener); };
}

/** Call this from any page to request the install prompt be shown (if eligible). */
export function requestInstallPrompt() {
  installListeners.forEach((l) => l());
}
