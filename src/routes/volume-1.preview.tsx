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

        {/* Envelope — outer kraft shell with decorative top/bottom flaps */}
        <div
          style={{
            background: "#C4A464",
            borderRadius: "12px",
            padding: 0,
            maxWidth: "600px",
            margin: "0 auto 64px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(44,36,32,0.18)",
          }}
        >
          {/* Top flap */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "#B8943A",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              borderRadius: "12px 12px 0 0",
            }}
          />

          {/* Inner letter card */}
          <div
            style={{
              background: "#FDFAF5",
              borderRadius: "6px",
              position: "relative",
              boxShadow: "0 2px 8px rgba(44,36,32,0.08)",
            }}
            className="mx-6 mt-[90px] mb-8 px-6 py-9 sm:px-8 sm:py-10"
          >
            {/* Brand header */}
            <p
              style={{
                textAlign: "center",
                fontFamily: "Georgia, serif",
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#9C8478",
                marginBottom: "28px",
                marginTop: 0,
              }}
            >
              ♥ The Note You Needed Today ♥
            </p>

            {/* Note title */}
            <h3
              className="text-[20px] sm:text-[22px]"
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: 500,
                color: "#2C2420",
                lineHeight: "1.4",
                margin: "0 0 28px 0",
              }}
            >
              You are not just tired. You are tired from holding everything together for people who
              never once asked if you were okay.
            </h3>

            {/* Note body */}
            <div
              className="text-[16px] sm:text-[17px]"
              style={{
                fontFamily: "'Lora', Georgia, serif",
                lineHeight: "1.75",
                color: "#3D2B1F",
              }}
            >
              <p style={{ marginBottom: "20px" }}>
                Most mornings you are already exhausted before the day even starts. Not because you
                are weak. Not because something is wrong with you. But because you have been
                carrying things that were never supposed to be yours alone.
              </p>
              <p style={{ marginBottom: "20px" }}>
                The bills that arrive before the money does. The job you still show up to even when
                your chest feels like concrete. The family that needs you to be strong when you have
                nothing left. The friendships you keep alive with whatever energy remains after
                everyone else has taken their share.
              </p>
              <p style={{ marginBottom: "20px" }}>
                You smile in meetings. You answer messages. You say you are fine. You have said it
                so many times you have started to believe it is the only acceptable answer.
              </p>
              <p style={{ marginBottom: "20px" }}>
                Here is what nobody says out loud. Most people who are struggling right now kept
                going. They did not break down in public. They did not ask for help. They showed up,
                they smiled, they made it look manageable. And then they went home and sat in the
                quiet and felt the weight of everything they had been carrying alone.
              </p>
              <p style={{ marginBottom: "20px" }}>
                You were never taught how to rest. You were taught to survive. And survival is
                exhausting in a way that no amount of sleep can fix.
              </p>
            </div>

            {/* I hope you heal — emotional peak */}
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "17px",
                fontStyle: "italic",
                color: "#3D2B1F",
                marginTop: "32px",
                marginBottom: "32px",
              }}
            >
              <p style={{ marginBottom: "20px" }}>
                I hope you heal from the version of yourself that learned to make yourself small so
                that other people could feel comfortable.
              </p>
              <p style={{ marginBottom: "20px" }}>
                I hope someone asks how you are this week and this time you tell them the truth.
              </p>
              <p style={{ marginBottom: "20px" }}>
                I hope you find one thing you have been carrying that was never yours and you put it
                down.
              </p>
              <p style={{ marginBottom: 0 }}>I hope you rest. Not just sleep. Actually rest.</p>
            </div>

            {/* Receipt block */}
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "12px",
                background: "#F5EFE6",
                padding: "20px",
                borderRadius: "4px",
                borderTop: "1px dashed #C4A882",
                borderBottom: "1px dashed #C4A882",
                marginTop: "28px",
                marginBottom: "20px",
                display: "grid",
                gridTemplateColumns: "62px 1fr",
                gap: "6px 10px",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#6B5744" }}>FROM:</span>
              <span style={{ fontWeight: "normal", color: "#3D2B1F", lineHeight: "1.7" }}>
                Every single day you showed up when staying in bed felt safer.
              </span>

              <span style={{ fontWeight: "bold", color: "#6B5744" }}>TO:</span>
              <span style={{ fontWeight: "normal", color: "#3D2B1F", lineHeight: "1.7" }}>
                The version of you reading this who needed to know someone sees it.
              </span>

              <span style={{ fontWeight: "bold", color: "#6B5744" }}>DATE:</span>
              <span style={{ fontWeight: "normal", color: "#3D2B1F", lineHeight: "1.7" }}>
                Today. Right now. This moment.
              </span>

              <span style={{ fontWeight: "bold", color: "#6B5744" }}>TOTAL:</span>
              <span style={{ fontWeight: "normal", color: "#3D2B1F", lineHeight: "1.7" }}>
                You are still here. That counts for more than you know.{" "}
                <span style={{ color: "#8B3A2A" }}>♥</span>
              </span>
            </div>

            {/* MAD signature */}
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "22px",
                color: "#2C2420",
                textAlign: "right",
                display: "block",
                marginTop: "20px",
              }}
            >
              MAD
            </span>
          </div>

          {/* Bottom flap */}
          <div
            aria-hidden
            style={{
              background: "#B8943A",
              height: "60px",
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
              borderRadius: "0 0 12px 12px",
            }}
          />

          {/* Heart wax seal */}
          <div
            aria-hidden
            style={{
              width: "44px",
              height: "44px",
              background: "#2C3E6B",
              border: "2px solid #1a2a50",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "-22px auto 0 auto",
              position: "relative",
              zIndex: 2,
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            ♥
          </div>
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
