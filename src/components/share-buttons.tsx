import { useState } from "react";
import type { CSSProperties } from "react";

import { trackEvent } from "@/lib/analytics";

const baseButtonStyle: CSSProperties = {
  fontFamily: "'Lora', Georgia, serif",
  fontSize: "13px",
  color: "#8B7355",
  background: "transparent",
  border: "1px solid #E8DDD4",
  borderRadius: "100px",
  padding: "6px 14px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  whiteSpace: "nowrap",
};

export function CopyLinkButton({
  url,
  source,
  style,
}: {
  url: string;
  source: string;
  style?: CSSProperties;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("note_share_clicked", { source: `${source}_copy` });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently do nothing rather than show an error
    }
  }

  return (
    <button type="button" onClick={handleCopy} style={{ ...baseButtonStyle, ...style }}>
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}

export function WhatsAppShareButton({
  text,
  source,
  style,
}: {
  text: string;
  source: string;
  style?: CSSProperties;
}) {
  const href = `https://wa.me/?text=${encodeURIComponent(text)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("note_share_clicked", { source: `${source}_whatsapp` })}
      style={{ ...baseButtonStyle, ...style }}
    >
      WhatsApp
    </a>
  );
}

export function TwitterShareButton({
  text,
  url,
  source,
  style,
}: {
  text: string;
  url: string;
  source: string;
  style?: CSSProperties;
}) {
  const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("note_share_clicked", { source: `${source}_twitter` })}
      style={{ ...baseButtonStyle, ...style }}
    >
      Twitter/X
    </a>
  );
}
