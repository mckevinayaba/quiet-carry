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

        {/* Envelope card — the note itself, pulled out of the parchment envelope */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "8px",
            boxShadow: "0 4px 24px rgba(44,36,32,0.08)",
            marginBottom: "64px",
          }}
          className="px-6 py-8 sm:px-9 sm:py-10"
        >
          {/* THE NOTE YOU NEEDED TODAY */}
          <p
            style={{
              textAlign: "center",
              fontFamily: "Georgia, serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#9C8478",
              marginBottom: "24px",
              marginTop: 0,
            }}
          >
            The Note You Needed Today
          </p>

          {/* Note title */}
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
            You are not just tired. You are tired from holding everything together for people who
            never once asked if you were okay.
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
            <p>
              Most mornings, you are already exhausted before the day starts. Not because you are
              weak. Not because something is wrong with you. But because you have been carrying
              things that were never supposed to be yours alone.
            </p>
            <p>
              The bills that arrive before the money does. The job you show up to even when your
              chest feels like concrete. The family that needs you to be strong when you have
              nothing left. The friendships you maintain with what little energy remains after
              everyone else has taken their share.
            </p>
            <p>
              You smile in meetings. You answer messages. You say you are fine. You have said you
              are fine so many times that you have started to believe it is the only acceptable
              answer.
            </p>
            <p>
              Here is what nobody talks about. Most people who are struggling right now are not
              struggling because they gave up. They are struggling because they kept going past the
              point where any reasonable person would have stopped. The World Health Organisation
              says 280 million people are living with depression right now. Most of them are sitting
              next to someone who has no idea. Most of them are the person in the room that everyone
              else leans on.
            </p>
            <p>
              You were never taught how to rest. You were taught to survive. And survival is
              exhausting in a way that no amount of sleep can fix.
            </p>
          </div>

          {/* I hope you heal — emotional peak */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "20px",
              lineHeight: "1.9",
              color: "#3D2B1F",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
            <p>
              I hope you heal from the version of yourself that learned to make yourself small so
              that other people could feel comfortable.
            </p>
            <p>I hope someone asks how you are this week and this time you tell them the truth.</p>
            <p>
              I hope you find one thing you have been carrying that was never yours to carry and you
              put it down.
            </p>
            <p>I hope you rest. Not just sleep. Actually rest.</p>
          </div>

          {/* Receipt block */}
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              background: "#F5EFE6",
              borderRadius: "4px",
              padding: "24px",
              borderTop: "1px dashed #C4A882",
              borderBottom: "1px dashed #C4A882",
              display: "grid",
              gridTemplateColumns: "70px 1fr",
              gap: "6px 12px",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#6B5744", fontSize: "12px" }}>FROM:</span>
            <span style={{ color: "#3D2B1F", fontSize: "12px", lineHeight: "1.8" }}>
              Every single day you showed up when staying in bed felt safer.
            </span>

            <span style={{ fontWeight: "bold", color: "#6B5744", fontSize: "12px" }}>TO:</span>
            <span style={{ color: "#3D2B1F", fontSize: "12px", lineHeight: "1.8" }}>
              The version of you reading this who needed to know someone sees it.
            </span>

            <span style={{ fontWeight: "bold", color: "#6B5744", fontSize: "12px" }}>DATE:</span>
            <span style={{ color: "#3D2B1F", fontSize: "12px", lineHeight: "1.8" }}>
              Today. Right now. This moment.
            </span>

            <span style={{ fontWeight: "bold", color: "#6B5744", fontSize: "12px" }}>TOTAL:</span>
            <span style={{ color: "#3D2B1F", fontSize: "12px", lineHeight: "1.8" }}>
              You are still here. That counts for more than you know.{" "}
              <span style={{ color: "#8B3A2A" }}>♥</span>
            </span>
          </div>

          {/* MAD signature */}
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "24px",
              color: "#2C2420",
              textAlign: "right",
              marginTop: "24px",
              display: "block",
            }}
          >
            MAD
          </span>
        </div>

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
