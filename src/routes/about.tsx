import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    links: [
      { rel: "canonical", href: "https://thenoteyouneeded.today/about" },
    ],
    meta: [
      { title: "About | The Note You Needed Today" },
      {
        name: "description",
        content:
          "The Note You Needed Today helps people find, keep, send, and share words for what they carry quietly.",
      },
      { property: "og:title", content: "About | The Note You Needed Today" },
      {
        property: "og:description",
        content:
          "The Note You Needed Today helps people find, keep, send, and share words for what they carry quietly.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AppLayout className="space-y-10 pb-12">
      <AboutInner />
    </AppLayout>
  );
}

function WhyThisExists() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="mx-auto max-w-2xl space-y-8 py-4">
      <div className="space-y-3">
        <span className="eyebrow-copy">Why this exists</span>
        <h2 className="text-balance font-display text-4xl leading-[1.02] sm:text-5xl">
          Why This Exists
        </h2>
      </div>

      <div className="space-y-5 text-[1.0625rem] leading-[1.85]">
        <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
          Most people are carrying things they will never fully explain.
        </p>

        <p className="text-muted-foreground">
          Not because they do not want to speak.
          <br />
          But because some pain is too complicated to summarize.
        </p>

        <div className="space-y-3 text-muted-foreground">
          <p>There is the pain of betrayal, when someone you trusted made you question your own judgment.</p>
          <p>There is the pain of heartbreak, when love leaves but your body keeps remembering.</p>
          <p>There is the pain of grief, when the world keeps moving and you are still standing in the place where someone disappeared.</p>
          <p>There is the pain of money that never stretches, when every month asks you to become a miracle worker with numbers that were never enough.</p>
          <p>There is the pain of family wounds, when the people who were supposed to protect you became the first place you learned to stay quiet.</p>
          <p>There is the pain of the job that ended, when the alarm still remembers a life your body no longer knows how to enter.</p>
          <p>There is the pain of the marriage that became a memory, when the house, the plans, the name, the future, and the ordinary routines all start sounding like something that belonged to another version of you.</p>
          <p>There is the pain of the apology that never came, when you are left holding the damage while the person who caused it continues as if nothing happened.</p>
          <p>There is the pain of the friendship that faded, the child you worry about, the parent you are losing, the body that is tired, the dream that keeps delaying, the shame that arrived before anyone asked what happened, and the loneliness that sits beside you even when people are around.</p>
        </div>

        <p className="font-display text-xl text-foreground sm:text-2xl">And then there is the pain nobody sees.</p>

        <div className="space-y-2 text-muted-foreground">
          <p>The pain you carry while answering messages.</p>
          <p>The pain you carry while going to work.</p>
          <p>The pain you carry while raising children.</p>
          <p>The pain you carry while being the responsible one, the strong one, the funny one, the dependable one, the one everybody assumes will manage.</p>
          <p>The pain you carry while showing up for people who never ask how much it costs you to keep showing up.</p>
          <p>The pain you carry while smiling in photos, attending meetings, paying bills, making plans, replying &ldquo;I&rsquo;m fine,&rdquo; and trying not to collapse in places where people expect you to be okay.</p>
        </div>

        {expanded ? (
          <>
            <div className="border-l-2 border-border pl-5">
              <p className="font-display text-xl text-foreground sm:text-2xl">This is the uncomfortable truth.</p>
            </div>

            <div className="space-y-2 text-muted-foreground">
              <p className="text-foreground">A lot of people are not healing.</p>
              <p>They are functioning.</p>
              <p>They are surviving inside routines.</p>
              <p>They are laughing with wounds still open.</p>
              <p>They are giving advice from places where they are still bleeding.</p>
              <p>They are helping others breathe while they are quietly running out of air.</p>
              <p>They are making pain look normal because life does not pause long enough for them to fall apart.</p>
            </div>

            <p className="text-muted-foreground">And when life becomes heavy, the world often gives them small sentences that sound good but do not go deep enough.</p>

            <div className="space-y-1 border-l-2 border-border pl-5 text-muted-foreground">
              <p>Be strong.</p>
              <p>Move on.</p>
              <p>Let go.</p>
              <p>Everything happens for a reason.</p>
            </div>

            <p className="font-display text-xl text-foreground sm:text-2xl">But pain is not generic.</p>

            <div className="space-y-2 text-muted-foreground">
              <p>A betrayal does not feel like grief.</p>
              <p>A divorce does not feel like job loss.</p>
              <p>A family wound does not feel like loneliness.</p>
              <p>Financial shame does not feel like heartbreak.</p>
              <p>A delayed dream does not feel like the body finally saying, &ldquo;I cannot keep carrying this.&rdquo;</p>
              <p>The silence after someone dies does not feel like the silence after someone abandons you while still alive.</p>
            </div>

            <p className="font-display text-xl text-foreground sm:text-2xl">Different wounds need different words.</p>

            <p className="text-muted-foreground">The Note You Needed Today exists because people need language for the things they carry quietly.</p>

            <div className="space-y-2 text-muted-foreground">
              <p>Not noise. Not performance. Not perfect healing.</p>
              <p className="text-foreground">Language.</p>
            </div>

            <div className="space-y-2 text-muted-foreground">
              <p>Words that make someone stop and say, &ldquo;This is what I have been trying to explain.&rdquo;</p>
              <p>Words that can sit beside grief without rushing it.</p>
              <p>Words that can name betrayal without decorating it.</p>
              <p>Words that can hold heartbreak without begging someone to be okay too quickly.</p>
              <p>Words that can tell a tired person, &ldquo;You are not weak. You have been carrying too much for too long.&rdquo;</p>
              <p>Words that can help someone understand that missing them is not the same as needing them back.</p>
              <p>Words that can remind someone that family can explain the wound, but it does not excuse it.</p>
              <p>Words that can tell someone who lost a job that the role ended, but they did not.</p>
              <p>Words that can tell someone ashamed of money that they were not careless, they were carrying more than the money could hold.</p>
              <p>Words that can be kept. Words that can be sent quietly. Words that can be shared when speaking feels impossible.</p>
              <p>Words that make people feel seen, then leave them with enough hope to breathe again.</p>
            </div>

            <p className="font-display text-xl text-foreground sm:text-2xl">This is why The Note exists.</p>

            <div className="space-y-2 text-muted-foreground">
              <p>For the things people survive in silence.</p>
              <p>For the truths they keep swallowing.</p>
              <p>For the pain they make look normal.</p>
              <p>For the wounds they do not always have the language to name.</p>
              <p className="text-foreground">For the words they needed before they knew how to ask.</p>
            </div>

            <p className="text-muted-foreground">And maybe today, one note will find you.</p>

            <div className="space-y-2 text-muted-foreground">
              <p>Maybe it will not fix everything.</p>
              <p>Maybe it will not change what happened.</p>
              <p>Maybe it will not take the grief away, bring the person back, pay the bill, heal the family, return the job, restore the marriage, or make the loneliness disappear by morning.</p>
            </div>

            <div className="space-y-2">
              <p className="text-foreground">But maybe it will say the thing you have been carrying.</p>
              <p className="text-foreground">Maybe it will help you feel less alone inside it.</p>
              <p className="text-foreground">Maybe it will give you one honest sentence to hold.</p>
            </div>

            <p className="font-display text-xl text-foreground sm:text-2xl">And maybe, for today, that is enough to breathe.</p>
          </>
        ) : (
          <div className="space-y-4 rounded-lg border border-border bg-[color:var(--paper-deep)]/10 px-5 py-4">
            <p className="text-sm leading-7 text-muted-foreground">
              A lot of people are not healing. They are functioning. Different wounds need different
              words. The Note exists to give language to what people carry quietly.
            </p>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-70"
            >
              Read the full story
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function AboutInner() {
  return (
    <>
      {/* Back */}
      <section className="space-y-3 py-2">
        <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
          <Link to="/">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to Home
          </Link>
        </Button>
        <div className="stitched-label">About</div>
        <h1 className="font-display text-5xl leading-none text-foreground">
          The Note You Needed Today
        </h1>
      </section>

      {/* Opening */}
      <section className="mx-auto max-w-2xl space-y-5 text-base leading-8 text-foreground">
        <p>
          The Note You Needed Today was created for the moments people carry quietly.
        </p>
        <p>
          The moments when you are not ready to explain everything.
        </p>
        <p>
          The moments when someone asks, "How are you?" and the honest answer is too heavy to say
          out loud.
        </p>
      </section>

      {/* What it is not */}
      <div className="paper-panel space-y-5 text-base leading-8">
        <p className="font-display text-2xl leading-snug text-foreground">
          This is not a quote site.
        </p>
        <p className="text-muted-foreground">
          It is not here to rush your healing, decorate your pain, or tell you to be strong before
          you have been heard.
        </p>
        <p className="text-foreground">
          The Note exists to help you find words for what you are carrying.
        </p>
      </div>

      {/* Some notes are for */}
      <section className="space-y-4">
        <ul className="space-y-2 text-base leading-8 text-foreground">
          {[
            "Some notes are for grief.",
            "Some are for shame.",
            "Some are for the apology that never came.",
            "Some are for the love that left.",
            "Some are for the days you keep saying, “I’m fine,” even when you are not.",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3">
              <Heart className="heart-mark mt-1.5 size-3.5 shrink-0" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="text-base leading-8 text-muted-foreground">
          Each note is written to feel specific, because pain is not generic.
        </p>
      </section>

      {/* What you can do */}
      <section className="paper-panel space-y-4">
        <span className="eyebrow-copy">What you can do here</span>
        <ul className="space-y-2 text-base leading-8 text-foreground">
          {[
            "Read a note.",
            "Keep it for later.",
            "Send it quietly to someone.",
            "Download it as a card.",
            "Or simply sit with it until the words feel less heavy.",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why the receipt */}
      <section className="space-y-5">
        <div className="space-y-1">
          <span className="eyebrow-copy">Why the receipt?</span>
          <h2 className="font-display text-3xl leading-tight text-foreground">
            Because sometimes pain feels like something was taken from you.
          </h2>
        </div>

        {/* Receipt visual — four named fields */}
        <div className="space-y-3">
          {[
            {
              label: "FROM",
              description: "Where the wound, pressure, silence, loss, or emotional debt came from.",
              example: "A version of yourself. A safe place. A truth you were not allowed to say.",
            },
            {
              label: "TO",
              description: "The part of you that needed the note.",
              example: "The part of you that is still counting what it cost.",
            },
            {
              label: "DATE",
              description: "The emotional moment when something became clear, heavy, honest, or ready to be released.",
              example: "The moment it became too much to carry alone.",
            },
            {
              label: "TOTAL",
              description: "The truth strong enough to screenshot.",
              example: "A love you paid for with silence. A strength people kept spending without asking what it cost you.",
            },
          ].map(({ label, description, example }) => (
            <div key={label} className="receipt-block space-y-2 p-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="font-label text-xs font-bold tracking-widest text-foreground">{label}</span>
                <span className="text-sm leading-6 text-muted-foreground">{description}</span>
              </div>
              <p className="font-mono text-sm leading-6 text-foreground">{example}</p>
            </div>
          ))}
        </div>

        <p className="text-base leading-8 text-foreground">
          The receipt names the emotional transaction. What was carried. Who it was for. When it
          became too much. And what it really cost.
        </p>
      </section>

      {/* Who is MAD */}
      <section className="paper-panel space-y-4">
        <div className="space-y-1">
          <span className="eyebrow-copy">Who is MAD?</span>
          <h2 className="font-display text-3xl leading-tight text-foreground">
            MAD is the human signature behind the notes.
          </h2>
        </div>
        <p className="text-base leading-8 text-muted-foreground">
          It is not a brand mask.
        </p>
        <p className="text-base leading-8 text-foreground">
          It is a reminder that these words were shaped with care, feeling, memory, and attention.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          Every note signed MAD is written for the part of you that needed language before it
          needed advice.
        </p>
        <div className="pt-1">
          <span className="font-label text-2xl tracking-widest text-foreground">MAD ©</span>
        </div>
      </section>

      {/* What you can find here */}
      <section className="space-y-5">
        <div className="space-y-1">
          <span className="eyebrow-copy">What you can find here</span>
          <h2 className="font-display text-3xl leading-tight text-foreground">
            A library of emotional language.
          </h2>
        </div>
        <p className="text-base leading-8 text-muted-foreground">
          The Note is a library of emotional language for the things people carry quietly.
        </p>
        <p className="text-base leading-8 text-foreground">
          Here, you will find notes, prompts, keepsakes, private letters, daily reminders, and
          words you can return to when life feels too heavy to explain.
        </p>
        <ul className="space-y-2 text-base leading-8 text-muted-foreground">
          {[
            "Some words are meant to be kept.",
            "Some are meant to be sent.",
            "Some are meant to be shared.",
            "Some are simply meant to sit with you until you feel less alone.",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3">
              <Heart className="heart-mark mt-1.5 size-3.5 shrink-0" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What this is not */}
      <section className="paper-panel space-y-4 border-l-4 border-l-border">
        <div className="space-y-1">
          <span className="eyebrow-copy">What this is not</span>
          <h2 className="font-display text-2xl leading-tight text-foreground">
            A language space. Not a substitute for care.
          </h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          The Note You Needed Today is not therapy, medical advice, or crisis support. It does not
          replace professional help, counselling, emergency care, or community support.
        </p>
        <p className="text-sm leading-7 text-foreground">
          It is a language space. A place to pause. A place to feel seen. A place to find the
          words you could not reach alone.
        </p>
        <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
          <Link to="/support">Safety &amp; Support</Link>
        </Button>
      </section>

      {/* Why This Exists */}
      <WhyThisExists />

      {/* Closing */}
      <section className="mx-auto max-w-2xl space-y-4 py-4 text-center">
        <p className="font-display text-2xl leading-snug text-foreground">
          If one note finds you at the right time, keep it.
        </p>
        <p className="font-display text-2xl leading-snug text-muted-foreground">
          If it reminds you of someone, send it quietly.
        </p>
        <p className="font-display text-2xl leading-snug text-foreground">
          If it says what you could not say, let it speak.
        </p>
        <div className="flex justify-center gap-3 pt-4">
          <Button asChild variant="note" className="min-h-12">
            <Link to="/feelings">Find your note</Link>
          </Button>
          <Button asChild variant="paper" className="min-h-12">
            <Link to="/shelf">Your Shelf</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
