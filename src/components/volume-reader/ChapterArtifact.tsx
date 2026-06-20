export type ChapterTitle =
  | "Survival"
  | "Unsaid Grief"
  | "Becoming Visible"
  | "Starting Over"
  | "Quiet Anger";

interface Props {
  chapter: ChapterTitle;
  isQuietAnger?: boolean;
}

export function ChapterArtifact({ chapter, isQuietAnger }: Props) {
  // Quiet Anger gets a heavier color treatment
  const opacity = isQuietAnger ? 0.55 : 0.38;

  switch (chapter) {
    case "Survival":
      return <FoldedPaper opacity={opacity} />;
    case "Unsaid Grief":
      return <SealedEnvelope opacity={opacity} />;
    case "Becoming Visible":
      return <MirrorRect opacity={opacity} />;
    case "Starting Over":
      return <HorizonLine opacity={opacity} />;
    case "Quiet Anger":
      return <LiftedCornerPaper opacity={opacity} />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Survival — folded paper with three fold lines and a dog-eared corner
// ---------------------------------------------------------------------------

function FoldedPaper({ opacity }: { opacity: number }) {
  return (
    <svg
      width="72"
      height="92"
      viewBox="0 0 72 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: `color-mix(in oklab, var(--foreground) ${Math.round(opacity * 100)}%, transparent)` }}
      aria-hidden
    >
      {/* Main body */}
      <rect x="1.5" y="1.5" width="62" height="84" stroke="currentColor" strokeWidth="1.5" />
      {/* Dog-ear top-right corner fill */}
      <polygon points="49,1.5 63.5,1.5 63.5,16 49,16" fill="currentColor" fillOpacity="0.07" />
      {/* Dog-ear fold crease */}
      <line x1="49" y1="1.5" x2="63.5" y2="16" stroke="currentColor" strokeWidth="1" />
      {/* Three horizontal fold lines */}
      <line x1="10" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="10" y1="48" x2="56" y2="48" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="10" y1="64" x2="42" y2="64" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Unsaid Grief — sealed envelope, closed flap, no address
// ---------------------------------------------------------------------------

function SealedEnvelope({ opacity }: { opacity: number }) {
  return (
    <svg
      width="100"
      height="68"
      viewBox="0 0 100 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: `color-mix(in oklab, var(--foreground) ${Math.round(opacity * 100)}%, transparent)` }}
      aria-hidden
    >
      {/* Envelope body */}
      <rect x="1" y="1" width="98" height="66" stroke="currentColor" strokeWidth="1.5" rx="1" />
      {/* Sealed flap — V pointing down from top edge */}
      <polyline points="1,1 50,37 99,1" stroke="currentColor" strokeWidth="1.5" />
      {/* Bottom corner fold lines (subtle) */}
      <line x1="1" y1="67" x2="44" y2="37" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="99" y1="67" x2="56" y2="37" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Becoming Visible — mirror / window, empty inside
// ---------------------------------------------------------------------------

function MirrorRect({ opacity }: { opacity: number }) {
  return (
    <svg
      width="52"
      height="80"
      viewBox="0 0 52 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: `color-mix(in oklab, var(--foreground) ${Math.round(opacity * 100)}%, transparent)` }}
      aria-hidden
    >
      {/* Outer frame */}
      <rect x="1.5" y="1.5" width="49" height="77" stroke="currentColor" strokeWidth="1.5" />
      {/* Inner surface — very faint */}
      <rect x="6" y="6" width="40" height="68" fill="currentColor" fillOpacity="0.04" />
      {/* Reflection highlight */}
      <line x1="11" y1="12" x2="17" y2="22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.22" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Starting Over — horizon line with a single destination dot
// ---------------------------------------------------------------------------

function HorizonLine({ opacity }: { opacity: number }) {
  return (
    <svg
      width="160"
      height="22"
      viewBox="0 0 160 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: `color-mix(in oklab, var(--foreground) ${Math.round(opacity * 100)}%, transparent)` }}
      aria-hidden
    >
      {/* Horizon line */}
      <line x1="0" y1="11" x2="144" y2="11" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      {/* Destination — open circle */}
      <circle cx="152" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Quiet Anger — paper with a lifted bottom-right corner, as if never sent
// ---------------------------------------------------------------------------

function LiftedCornerPaper({ opacity }: { opacity: number }) {
  return (
    <svg
      width="76"
      height="96"
      viewBox="0 0 76 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: `color-mix(in oklab, var(--foreground) ${Math.round(opacity * 100)}%, transparent)` }}
      aria-hidden
    >
      {/* Paper body — bottom-right corner clipped for lifted effect */}
      <polygon points="1.5,1.5 74.5,1.5 74.5,74 56,94.5 1.5,94.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Lifted corner triangle fill */}
      <polygon points="56,94.5 74.5,74 74.5,94.5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
      {/* Shadow crease under lifted corner */}
      <line x1="56" y1="94.5" x2="74.5" y2="74" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      {/* Letter text lines */}
      <line x1="12" y1="26" x2="64" y2="26" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
      <line x1="12" y1="40" x2="64" y2="40" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
      <line x1="12" y1="54" x2="52" y2="54" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
    </svg>
  );
}
