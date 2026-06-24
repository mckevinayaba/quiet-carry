import { createFileRoute, Link } from "@tanstack/react-router";

import { RouteErrorBoundary } from "@/components/route-error";
import { volumeOneSelarUrl } from "@/lib/note-data";

export const Route = createFileRoute("/volume-1/preview")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    links: [{ rel: "canonical", href: "https://thenoteyouneeded.today/volume-1/preview" }],
    meta: [
      { title: "Free Preview — Volume 1 | The Note You Needed Today" },
      {
        name: "description",
        content:
          "Read one free note from Chapter 01 — Survival. The first page of Volume 1, The Things We Do Not Say Out Loud.",
      },
    ],
  }),
  component: Volume1PreviewPage,
});

function Volume1PreviewPage() {
  const selarUrl = volumeOneSelarUrl;

  return (
    <div style={{ background: "#FAF6F1", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      {/* Minimal top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 24px",
          borderBottom: "1px solid #E8DDD4",
          maxWidth: "640px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Link
          to="/volume-1"
          style={{
            color: "#9C8478",
            textDecoration: "none",
            fontSize: "14px",
            fontFamily: "Georgia, serif",
            letterSpacing: "0.02em",
          }}
        >
          ← Back to Volume 1
        </Link>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "48px 24px 80px",
          boxSizing: "border-box",
        }}
      >
        {/* Preview label */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "Georgia, serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "#9C8478",
            textTransform: "uppercase",
            marginBottom: "40px",
            marginTop: "0",
          }}
        >
          Free Preview · Chapter 01 · Survival
        </p>

        {/* Ghost chapter number */}
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(60px, 15vw, 100px)",
              fontWeight: 300,
              color: "transparent",
              WebkitTextStroke: "1px #C4A882",
              lineHeight: "1",
              display: "block",
            }}
          >
            01
          </span>
        </div>

        {/* Chapter title */}
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(28px, 5vw, 36px)",
            fontWeight: 400,
            color: "#2C2420",
            textAlign: "center",
            margin: "0 0 8px 0",
          }}
        >
          Survival
        </h2>

        {/* Chapter tagline */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "16px",
            color: "#8B7355",
            textAlign: "center",
            margin: "0 0 40px 0",
          }}
        >
          Money, body, exhaustion, staying.
        </p>

        {/* Divider */}
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #E8DDD4",
            margin: "0 0 48px 0",
          }}
        />

        {/* Note heading */}
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(20px, 4vw, 24px)",
            fontWeight: 400,
            color: "#2C2420",
            lineHeight: "1.4",
            margin: "0 0 32px 0",
          }}
        >
          You Did Not Fall Behind. The World Moved Too Fast.
        </h3>

        {/* Note body */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "18px",
            lineHeight: "1.9",
            color: "#3D2B1F",
          }}
        >
          <p>There is a particular kind of exhaustion that does not show up on any test.</p>
          <p>
            It is not burnout. It is not depression, exactly.
            <br />
            It is what happens when you have been trying to keep up
            <br />
            with a pace that was never designed for a human being —
            <br />
            and somewhere along the way,
            <br />
            you started believing the problem was you.
          </p>
          <p>
            The bills that came faster than the money.
            <br />
            The body that started saying no before you were ready to listen.
            <br />
            The days you showed up anyway —
            <br />
            not because you were brave,
            <br />
            but because stopping felt more dangerous than continuing.
          </p>
          <p>
            That is not weakness.
            <br />
            That is a person doing the impossible
            <br />
            and calling it ordinary.
          </p>
          <p>
            You did not fall behind.
            <br />
            You were carrying something
            <br />
            that most people around you
            <br />
            had already set down.
          </p>
        </div>

        {/* Margin annotation */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "13px",
            color: "#9C8478",
            textAlign: "right",
            marginTop: "32px",
            marginBottom: "48px",
            borderTop: "1px solid #E8DDD4",
            paddingTop: "16px",
          }}
        >
          — This is what survival looks like from the inside. — MAD
        </p>

        {/* Receipt-style end of preview divider */}
        <div
          style={{
            borderTop: "1px dashed #C4A882",
            borderBottom: "1px dashed #C4A882",
            padding: "12px 0",
            textAlign: "center",
            marginBottom: "64px",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "11px",
              color: "#9C8478",
              letterSpacing: "0.1em",
            }}
          >
            — End of free preview —
          </span>
        </div>

        {/* CTA block */}
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(22px, 4vw, 28px)",
              fontWeight: 400,
              color: "#2C2420",
              margin: "0 0 12px 0",
            }}
          >
            There are 14 more notes waiting.
          </h3>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "16px",
              color: "#8B7355",
              margin: "0 0 36px 0",
              lineHeight: "1.6",
            }}
          >
            Five chapters. Five private letters.
            <br />
            Written for the weight you carry that no one else sees.
          </p>

          {/* Primary purchase button */}
          <a
            href={selarUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              background: "#8B6F5E",
              color: "#FAF6F1",
              textDecoration: "none",
              padding: "14px 36px",
              borderRadius: "100px",
              fontFamily: "Georgia, serif",
              fontSize: "16px",
              letterSpacing: "0.02em",
              width: "100%",
              maxWidth: "320px",
              boxSizing: "border-box",
              textAlign: "center",
              margin: "0 auto 16px auto",
            }}
          >
            Get Volume 1 — R149 →
          </a>

          {/* Secondary: already have code */}
          <div style={{ marginTop: "16px" }}>
            <Link
              to="/volume-1/unlock"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "14px",
                color: "#9C8478",
                textDecoration: "none",
                borderBottom: "1px solid #C4A882",
                paddingBottom: "2px",
              }}
            >
              I already have a code → Enter it here
            </Link>
          </div>

          {/* Fine print */}
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "12px",
              color: "#9C8478",
              marginTop: "20px",
            }}
          >
            One-time purchase. No subscription. Your access code arrives by email.
          </p>
        </div>

        {/* Bottom back-link */}
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <Link
            to="/volume-1"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "13px",
              color: "#9C8478",
              textDecoration: "none",
            }}
          >
            ← Return to Volume 1
          </Link>
        </div>
      </div>
    </div>
  );
}
