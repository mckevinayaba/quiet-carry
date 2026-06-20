# Editorial Spine — The Note You Needed Today

Internal reference. Not user-facing. The architecture behind how every note is written.

---

## What a note is

A note is not a quote. It is not a caption. It is not a poem formatted as prose.

A note is a specific emotional receipt — written for the person who has been carrying something quietly, in language that names the exact weight before it offers any comfort.

The voice is never wise. It is never above the reader. It is beside them.

---

## The Three-Part Structure (Wound / Witness / Way)

Every note has three movements. They do not have to appear as separate sections. But the writer must know all three before a note is finished.

### 1. Wound
The specific thing that happened. Not a category. A scene. A moment. Something that lives in the body.

> "You checked your balance before buying bread."
> "The alarm still knew your old life on the morning after the job ended."
> "Your mouth opened, then closed, because shame got there first."

The wound must be concrete enough that a person reading recognizes it as their own — not a general description of their pain, but a particular scene that happened in their life.

### 2. Witness
The acknowledgment that it was real. That it was hard. That the reader was not imagining it, exaggerating it, or being dramatic.

This is where most emotional writing fails. It skips witnessing and rushes to comfort. The Note never does this.

Witnessing sounds like:
> "You carried that without anyone seeing."
> "The people who should have shown up did not."
> "You were fair to people who were not always gentle with you."

It does not sound like:
> "This must have been so hard." (too soft, too distant)
> "You are so strong." (too fast, skips the wound)

### 3. Way
Not a solution. Not advice. Not "here is what you should do now."

The way is a small piece of language that opens — not resolves. It names what is possible. It offers a direction without forcing a destination.

> "Your peace does not have to wait for their courage."
> "Your usefulness did not end when the role did."
> "Late is not always lost."

---

## The Receipt

Every note has a receipt. The receipt makes the emotional transaction visible.

| Field | What it holds |
|-------|---------------|
| FROM  | Where the wound, pressure, silence, loss, or emotional debt came from |
| TO    | The part of the person that needed the note |
| DATE  | The emotional moment when something became clear, heavy, honest, or ready |
| TOTAL | The truth strong enough to screenshot — the one line the note is built around |

Receipt rules:
- TOTAL is always the strongest line in the note. If it is not, rewrite it.
- FROM and TO name emotional sources, not people by name.
- DATE names a type of moment, not a calendar date.
- Short receipt fields (for visual export) should be tighter — one clause each.

---

## The Hook Line

Every note has a `hookLine`. This is the stop-scroll sentence used in previews and social contexts.

A hookLine must:
- Name a specific daily scene, not a category of emotion
- Use concrete objects where possible (phone, alarm, checkout, kitchen table)
- Make the reader feel seen in private — not inspired
- Begin with "This is for the person who…" when possible

Good hookLines:
> "This is for the person whose stomach drops when an unknown number calls — even when they have done nothing wrong."
> "This is for the person who reached for their phone to call someone, got halfway through dialing, and remembered."

Poor hookLines (avoid):
> "This is for anyone who has felt grief." (too general)
> "This is for people who struggle." (no scene, no specificity)

---

## The Share Excerpt

Every note has a `shareExcerpt`. This is used on social image canvases (Instagram Square, WhatsApp Status, Facebook, LinkedIn).

Rules:
- Must stand alone without context
- Must contain the wound + one line of the way
- Should be shorter than the main note — enough to stop someone, not to replace the full note
- Never begins with "I" — begins with the note's natural opening or a direct line from the wound

---

## Emotional Intensity Scale

| Level | Description | Examples |
|-------|-------------|---------|
| `low` | Grounded, clear, has already moved through the wound | Distance Is Also Healing |
| `medium` | Present weight, soft comfort, relatable pain | Remember Who You Are, The Words That Stayed |
| `heavy` | Deep wound, longer grief, complex family or financial pain | Grief That Lives in Habits, Family That Hurt, Money That Never Stretched |
| `crisisAdjacent` | Immediate safety relevance — reader may be in crisis | When Staying Feels Hard |

---

## Safety Cue Logic

Two safety mechanisms, used separately:

**`safetyNote: true`** — Reserved for "When Staying Feels Hard" only. Shows the full Safety & Support CTA block with a link and a direct message. This note is crisis-adjacent.

**`needsSafetyCue: true`** — Used for heavy notes where the content may surface acute pain (shame, loneliness, family trauma). Shows a gentler inline care cue beneath the note. Uses `safetyCueText` if provided; falls back to a default.

Notes that currently carry `needsSafetyCue: true`:
- When Shame Got There First
- The Family That Hurt
- The Loneliness No One Sees
- When Staying Feels Hard (also `safetyNote: true`)

---

## Volume Chapters

Each note belongs to a chapter. Chapters are not tags — they are the editorial arc the reader is on.

| Chapter | Emotional territory |
|---------|---------------------|
| Unsaid Grief | Loss, words that stayed, grief in habits, what was never said |
| Quiet Anger | Distance, people who watched you bleed, apologies that never came |
| Survival | Money, body, exhaustion, staying |
| Starting Over | Job loss, distance, what comes after |
| Becoming Visible | Dreams, recognition, identity, remembering who you are |

---

## What a note is not

- Not a motivational quote repackaged as a note
- Not a poem that observes pain from a distance
- Not therapy, advice, or instructions
- Not an affirmation (affirmations name what you want to become; notes name what you have already carried)
- Not a general statement about human suffering — always specific to one kind of person in one kind of moment

---

## Voice standards

**Do write:**
- Concrete scenes ("the alarm still knew your old life")
- Cumulative short lines that build weight
- "I hope you heal from..." as an entry into witnessing
- Short, grounded comfort without urgency

**Do not write:**
- "Everything happens for a reason"
- "You are stronger than you know"
- "This too shall pass"
- Anything that requires the reader to perform hope before they have been heard
- Wellness language dressed as emotional language
- Anything that sounds like it could have been written by any person for any reader

---

## Quality check before publishing

1. Can a specific person point to this note and say "this is mine"?
2. Does it witness before it comforts?
3. Is the TOTAL line the strongest sentence in the note?
4. Is the hookLine a scene, not a category?
5. Does the shareExcerpt stand alone?
6. If emotionalIntensity is heavy or crisisAdjacent — is the safety cue set?
7. Does the storySpine have all three parts (wound, witness, way)?
8. Does the note sound like it was written for one person, not broadcast to many?

---

*This document is for the writer only. It does not appear in the app.*
