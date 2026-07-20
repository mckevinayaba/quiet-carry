// Volume 1 manuscript content.
// Product: The Note You Needed Today, Volume 1
// Subtitle: The Things We Do Not Say Out Loud
// Launch structure: 5 chapters, 15 notes (Quiet Anger exclusives are NOT included at launch)
//
// TODO markers indicate fields not yet authored:
//   TODO:BODY    — note body missing; do not ship without this
//   TODO:PROMPT  — journal prompt not yet written
//   TODO:CAPTION — short sharing caption not yet written
//
// Wallpaper lines are provided for all 15 notes (see spec).
// Quiet Anger chapter is preserved below the launch export — for Volume 2 / future expansion.

export interface Volume1Note {
  id: string;
  title: string;
  body: string;
  from: string;
  to: string;
  date: string;
  total: string;
  journalPrompt?: string;
  caption?: string;
  wallpaperLine?: string;
  safetyNote?: boolean;
}

export interface Volume1Chapter {
  number: number;
  title: string;
  tagline: string;
  chapterLine: string;
  emotionalJob: string;
  introLetter: string;
  notes: Volume1Note[];
  privateLetter: string;
}

export interface Volume1ClosingReceipt {
  from: string;
  to: string;
  date: string;
  total: string;
  closing: string;
}

// ---------------------------------------------------------------------------
// OPENING MAD LETTER
// ---------------------------------------------------------------------------

export const openingLetter = `You did not stumble onto this by accident.

Something brought you here. A feeling you have been carrying. A season you have not yet found the right words for. A truth you have been living quietly while the world around you kept moving at its usual, unbothered pace.

We built this for that moment. The one between feeling something deeply and being able to say it out loud.

This Volume is not a self-help book. It is not a workbook. It is not a prescription. It will not tell you to breathe deeply or practice gratitude or reframe your pain into a lesson. It will not rush you toward healing or hand you a five-step plan for becoming someone who suffers more neatly.

What it will do is sit with you.

It will name things your mouth has not been able to say. It will hold things you have been carrying alone. It will tell you the truth first, before it offers you anything that feels like comfort, because we believe you deserve honesty more than you deserve performance.

Inside this Volume, you will find five chapters. Each one is a different kind of weight. You do not have to read them in order. You do not have to read them all at once. You are allowed to open to the page that matches where you are tonight, read it, close it, and return when you are ready.

This Volume was written for the things people carry most quietly. Survival. Unsaid pain. Loss. Betrayal. Staying.

Not because pain should become beautiful.

But because pain should not have to remain nameless.

We are MAD. And we believe emotional language is infrastructure. We believe that when people cannot find words for what they carry, they carry it longer, heavier, and alone. This Volume is our attempt to build something that interrupts that silence, not with noise, but with the right words at the right time.

You paid for this. Which means you made a decision that what is happening inside you is worth something.

We agree.

We hope what is inside these pages agrees too.

Take your time with it.

No performance required.

With love and uncomfortable honesty,
MAD
The Note You Needed Today`;

// ---------------------------------------------------------------------------
// CHAPTER ONE — SURVIVAL
// ---------------------------------------------------------------------------

const chapter1: Volume1Chapter = {
  number: 1,
  title: "Survival",
  tagline: "Money, body, exhaustion.",
  chapterLine: "You got through things nobody clapped for.",
  emotionalJob:
    "For the seasons where getting through the day was the entire achievement.",
  introLetter: `This chapter is not about resilience.

Resilience is a word people use to make survival sound inspiring. But surviving is not always inspiring. Sometimes it is just what happened. Sometimes it is all you had left to do.

This chapter is for the seasons where getting through the day was the entire achievement. Where functioning looked fine on the outside and felt like warfare on the inside. Where you stretched money, energy, patience, and hope past the point where any of those things had a right to still be working.

It is for the months where your bank account and your dignity were in a constant, private negotiation. For the morning after the job ended and the alarm still remembered a life your body no longer knew how to enter. For the weight your body started holding when your mind had no more room.

You survived seasons that nobody celebrated. You made decisions under pressure that people who have never felt that pressure would not understand. You kept going when stopping would have been easier to explain.

This chapter does not ask you to be grateful for what you survived. It does not suggest that your hard seasons were lessons in disguise or part of a plan.

It simply acknowledges that you were there.

That it was heavy.

That you carried it anyway.

And that carrying it was enough.`,
  notes: [
    {
      id: "money-that-never-stretched",
      title: "The Money That Never Stretched",
      wallpaperLine: "You were not careless. You were carrying more than the money could hold.",
      body: `I hope you heal from the shame of counting money that was never enough.

From checking your balance before buying bread.

From knowing exactly how much is in your account because your peace has been living inside numbers.

From pretending you are managing when you are really deciding which problem can wait until next week.

People say money is not everything.

But they do not always understand that sometimes money is sleep.

Money is dignity.

Money is answering your phone without fear.

Money is not rehearsing an apology before someone asks for what you owe.

Money is walking into a shop without doing mathematics in your chest.

You have made small money perform miracles.

You have stretched what was already thin.

You have gone without and still looked normal.

You have smiled in rooms while calculating whether you can afford to get home.

And the cruelest part is that people may still call it irresponsibility when they never saw how many times you chose survival over comfort.

I hope you heal from blaming yourself for a life that kept asking you to carry more than the money could hold.

I hope one day money stops feeling like proof of your worth.

I hope one day your body no longer tightens when you hear the word "due."

I hope one day you have enough to breathe.`,
      from: "Every month that asked you to become a miracle worker.",
      to: "The part of you that felt ashamed for not having enough.",
      date: "The first day you stop calling survival a failure.",
      total: "You were not careless. You were carrying more than the money could hold.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
    {
      id: "job-that-ended",
      title: "The Job That Ended",
      wallpaperLine: "The role ended. You did not.",
      body: `I hope you heal from the morning after the job ended.

The morning when the alarm still knew your old life.

The morning your body woke up like it had somewhere to be, but your world had already changed.

People may tell you to update your CV.

To network.

To stay positive.

To see it as redirection.

And maybe one day you will.

But first, someone should say the truth.

It was not just a job.

It was your routine.

Your answer when people asked what you do.

Your proof that you were useful somewhere.

Your way of paying bills without explaining yourself.

Your place in the world, even if it was not perfect.

So when it ended, something in you lost its shape.

Not your whole life.

Not your value.

But something.

And you are allowed to grieve that.

You are allowed to miss the emails, the access card, the desk, the salary, the small certainty of knowing where your mornings belonged.

You are allowed to feel embarrassed.

You are allowed to feel angry.

You are allowed to feel scared.

Losing work can make a person feel like they have lost permission to stand tall.

I hope you heal from tying your worth to a title that was never big enough to hold your whole life.

I hope you find work again.

But before that, I hope you remember that your usefulness did not end when the role did.`,
      from: "The door that closed before you were ready.",
      to: "The version of you learning how to stand without the title.",
      date: "The morning you realize your usefulness did not end with the job.",
      total: "The role ended. You did not.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
    {
      id: "body-is-tired",
      title: "The Body Is Tired",
      wallpaperLine: "Your body was not weak. It was honest.",
      body: `I hope you heal from calling your body weak when it was only trying to tell the truth.

Your body has been speaking for a long time.

But you kept calling it laziness.

Mood.

Excuses.

A bad week.

A lack of discipline.

You kept pushing because people needed you.

Because bills did not pause.

Because children still needed care.

Because work still expected performance.

Because life kept asking for output from a body that was already running on warning signs.

So your body started speaking louder.

Through headaches.

Through heaviness.

Through sleep that did not restore you.

Through tears that arrived without permission.

Through irritation.

Through numbness.

Through the kind of tired that rest alone could not fix.

Maybe your body is not betraying you.

Maybe it is telling the truth your mouth kept editing.

You have carried too much for too long without enough softness.

You do not need to earn rest by breaking down first.

You do not need to collapse before you are allowed to stop.

I hope you heal from treating exhaustion like a personal failure.

I hope you listen before your body has to scream.`,
      from: "The body that kept the score while you kept pretending.",
      to: "The part of you that thought exhaustion was a personal failure.",
      date: "The first time you listen before you collapse.",
      total: "Your body was not weak. It was honest.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
  ],
  privateLetter: `There is a kind of survival that does not look like survival from the outside.

It looks like functioning. It looks like managing. It looks like showing up, answering the emails, making the phone calls, buying the groceries, getting through the meetings, coming home, doing it again the next day.

But you and I both know what it felt like from the inside. We know the mathematics in the chest. The calculations that happened before the purchase. The way certain days were negotiated rather than lived. The way some nights you sat very still because moving might cost more energy than you had left.

Nobody put "survived" on your chest and gave you a crowd. There was no marker for the morning you stretched the last week's money through another week. No ceremony for the day you stayed when staying was the hardest option available. No witness for the specific weight of being the person who held everything together while your own ground was unsteady.

The notes in this first chapter were not written to inspire you. They were written to see you.

You did that. You got through something that was genuinely heavy.

Not because you were strong.
Not because the universe was teaching you a lesson.
Not because it built character.

But because you had no other option, and you chose the option anyway, and that is a thing that should be said out loud and then said again.

You carried it.

Without the applause. Without the witness. Without anyone naming what it actually cost.

I am naming it now.

With love,
MAD`,
};

// ---------------------------------------------------------------------------
// CHAPTER TWO — UNSAID PAIN
// ---------------------------------------------------------------------------

const chapter2: Volume1Chapter = {
  number: 2,
  title: "Unsaid Pain",
  tagline: "The things you kept inside because saying them out loud felt too expensive.",
  chapterLine: "The truths you swallowed until they started living in your body.",
  emotionalJob:
    "For the things you kept inside because saying them out loud felt too expensive.",
  introLetter: `This chapter is for the things you did not say.

Not because they were small.

Because they were too expensive to speak.

There are truths people swallow because the room is not safe enough, the relationship is not honest enough, the family is not ready enough, the workplace is not kind enough, or the body is too tired to explain one more thing to people committed to misunderstanding.

So you learned to say "I'm fine."

You learned to keep the sentence inside.

You learned to make pain look easy.

You learned to carry words that never left your mouth, until they started living in your chest, your shoulders, your stomach, your silence.

This chapter is for that.

For the truth that was too heavy to carry out loud.

For the words that stayed.

For the shame that got there first.

For the version of you that kept functioning while something inside you kept asking to be named.

You do not have to say everything today.

But you deserve a place where the unsaid is not treated like it never existed.

This chapter gives language to what stayed inside.`,
  notes: [
    {
      id: "im-fine-but-not-really",
      title: "I'm Fine, But Not Really",
      wallpaperLine: '"I\'m fine" was never the whole truth.',
      body: `They asked,
"How are you?"
and this time,
they really meant it.

They looked at you
like they had space
for the truth.

But you still smiled.
You still said,
"I'm fine."

Not because
they did not care.
Not because
they would not stay.

Because the truth
was too heavy
to carry out loud.

I hope you
heal from
the fear
of being honest
with people
who are safe enough
to hear you.`,
      from: `Every time the truth climbed your throat and you swallowed it back down. Every question you dodged with a smile. Every night you cried alone because no one asked when you were ready to answer.`,
      to: "One safe place. One person. One moment where you do not have to edit your pain.",
      date: "The first time someone asks and you do not flinch.",
      total:
        "The tears you saved for the dark. They are not shame. They are just waiting for permission.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
      safetyNote: true,
    },
    {
      id: "the-words-that-stayed",
      title: "The Words That Stayed",
      wallpaperLine: "Some words stay because there was nowhere safe to put them.",
      body: `I hope you
heal from
the words
that stayed
long after
the person
who said them
moved on.

The sentence
they forgot
became something
you had to carry.

But what they said
was never your name.`,
      from: "Every sentence that entered your heart and started calling itself truth.",
      to: "The day your own voice becomes louder than what they said.",
      date: "The first time you remember it without becoming small again.",
      total: "The wound was real, but it was never your name.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
    {
      id: "shame-got-there-first",
      title: "Shame Got There First",
      wallpaperLine: "Shame arrived before anyone asked what happened.",
      // TODO:BODY — note body not yet authored; do not ship without this
      body: "TODO:BODY",
      from: "TODO:RECEIPT",
      to: "TODO:RECEIPT",
      date: "TODO:RECEIPT",
      total: "Shame arrived before anyone asked what happened.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
  ],
  privateLetter: `You learned, somewhere along the way, that your full self was too much.

Maybe it was said directly. Maybe it was communicated through the way certain rooms changed when you brought your actual feelings into them. Maybe it was the quiet feedback of people needing you to be a particular version of yourself — the useful one, the okay one, the one who does not require anything — and the way you eventually just became that version.

Becoming smaller is not always a decision. Sometimes it is an adaptation. A rational response to an environment that gave you specific information about what you were allowed to be.

You do not have to say everything today. But you deserve a place where the unsaid is not treated like it never existed.

With love,
MAD`,
};

// ---------------------------------------------------------------------------
// CHAPTER THREE — LOSS
// ---------------------------------------------------------------------------

const chapter3: Volume1Chapter = {
  number: 3,
  title: "Loss",
  tagline: "The losses that never received a ceremony, but still changed everything.",
  chapterLine: "The grief that kept arriving without asking permission.",
  emotionalJob:
    "For the losses that never received a ceremony, but still changed everything.",
  introLetter: `Not all grief comes with flowers and a service.

Some grief arrives quietly and stays for years without ever being named. It lives in the way you still reach for your phone before remembering. In the way certain music is no longer safe to play. In the way a street, or a smell, or a time of year can undo an entire week of holding yourself together.

This chapter is for losses that did not come with public acknowledgment.

The relationship that ended without a ceremony.

The love that left before you were ready to let it.

The marriage that became a memory slowly, painfully, and in private.

The grief that hides inside habits because ordinary things remember what people try to move on from.

These are the griefs people tend to minimize because they are hard to explain at a dinner table. Because someone will always say "at least."

At least you are still alive.
At least you have other people.
At least it ended before it got worse.
At least.

At least does not hold grief. It dismisses it.

This chapter holds it instead.

There is no timeline in here. No suggestion that you should be further along. No nudge toward forgiveness before you are ready. Just space for what was lost. For what you loved. For what you still miss even when you know, intellectually, that it had to go.

Grief does not need to be rushed.

It needs to be witnessed.

This chapter is your witness.`,
  notes: [
    {
      id: "grief-that-lives-in-habits",
      title: "Grief That Lives in Habits",
      wallpaperLine: "Grief lives in the ordinary things that still remember.",
      body: `I hope you
heal from
still reaching for
the phone number
you know
will not answer.

From the habit
of wanting to tell them
one more thing.

From the silence
that arrives
after memory
dials first.`,
      from: "Grief that lives in your thumb.",
      to: "A memory that no longer cuts.",
      date: "The first day love feels soft again.",
      total: "Missing them without losing yourself.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
    {
      id: "love-that-left",
      title: "The Love That Left",
      wallpaperLine: "Missing them is not the same as needing them back.",
      body: `I hope you heal from the love that left before your heart knew how to let go.

Because some people do not only leave your life.

They leave your mornings different.

Your phone quieter.

Your plans unfinished.

Your chest waiting for a message that is not coming.

Your body checking places where they used to be.

And the hardest part is not always that they left.

Sometimes the hardest part is that love stayed longer than they did.

You still remember their voice.

Their smell.

Their face when they were soft with you.

The small things nobody else knows how to replace.

And now people expect you to move on as if love is a switch.

As if attachment obeys instructions.

As if the heart can forget just because the relationship ended.

But healing does not begin by pretending you no longer miss them.

Sometimes healing begins by admitting that you do.

You miss them.

You miss who you were with them.

You miss what you thought the two of you were becoming.

That does not mean you should go back.

It means you are human.

I hope you heal from confusing missing them with needing them back.

I hope memory becomes softer.

I hope one day their name no longer feels like a door reopening inside you.`,
      from: "The love that left but did not leave your body quickly.",
      to: "The part of you still checking for what is no longer coming.",
      date: "The first day memory stops feeling like a wound reopening.",
      total: "Missing them is not the same as needing them back.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
    {
      id: "marriage-that-became-a-memory",
      title: "The Marriage That Became a Memory",
      wallpaperLine: "It ended, but it was not nothing.",
      body: `I hope you heal from the silence after a marriage changes shape.

Because people will ask what happened.

They will ask who was wrong.

They will ask whether there is still hope.

They will ask about papers, houses, children, family, and what comes next.

But very few people ask what it feels like to become a stranger to a life you once called home.

Marriage is not only love.

It is shared towels.

Shared bills.

Shared beds.

Shared names in people's mouths.

Shared jokes no one else understands.

Shared plans that once sounded so certain.

It is someone knowing how you take your tea.

It is ordinary things becoming sacred because they belonged to two people.

So when it breaks, you do not only lose the person.

You lose the future you had already rehearsed.

The house you imagined.

The children you planned.

The old age you thought you would reach together.

The version of yourself that believed this would last.

So no, you are not dramatic for grieving something other people now discuss like paperwork.

You are grieving a covenant.

A rhythm.

A room.

A name you thought would always sound like home.

I hope you heal from the shame of loving something that could not stay whole.

I hope you release without erasing.

I hope you remember that a marriage becoming a memory does not mean your heart became a mistake.`,
      from: "The home that stopped feeling like home.",
      to: "The heart learning how to release without erasing.",
      date: "The day you stop calling your grief an embarrassment.",
      total: "It ended, but it was not nothing.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
  ],
  privateLetter: `Grief does not always arrive with a name.

Sometimes it arrives as a habit you catch yourself in. A reaching. A checking. A specific kind of quiet that descends at a particular time of year. A space in your routines that used to be filled and is now conspicuous only to you.

People will tell you to move through grief as though moving through it is the goal. As though the other side of it is where you need to get to. As though sitting inside it, naming it, letting it be what it is without rushing it toward a conclusion — as though that is somehow the wrong relationship to have with loss.

The notes in this chapter were written for the losses that do not come with public acknowledgment. The ones that arrive without flowers or a service or a community that knows to gather. The ones that live only in the private economy of your own body.

You do not owe anyone a timeline for your grief. You do not owe anyone the performance of having moved on before you actually have.

You are allowed to still be grieving something that most people have stopped asking about.

You are allowed to still be grieving something that never had a name to begin with.

With love,
MAD`,
};

// ---------------------------------------------------------------------------
// CHAPTER FOUR — BETRAYAL
// ---------------------------------------------------------------------------

const chapter4: Volume1Chapter = {
  number: 4,
  title: "Betrayal",
  tagline:
    "For the wounds people made smaller because naming them would expose too much.",
  chapterLine: "The hurt people wanted you to forgive before they were willing to name.",
  emotionalJob:
    "For the wounds people made smaller because naming them would expose too much.",
  introLetter: `This chapter is for the pain people made smaller because naming it would expose too much.

The apology that never came.

The family that hurt.

The people who watched you bleed and still waited for strangers to clap before they supported you.

Betrayal is not always loud. Sometimes it is silence. Sometimes it is distance. Sometimes it is people knowing exactly what happened to you and still choosing comfort over courage. Sometimes it is family asking you to understand pain they never properly acknowledged. Sometimes it is watching someone continue with their life while you are still carrying the damage they left behind.

And then, somehow, the burden becomes yours.

You are asked to forgive.

To be mature.

To move on.

To stop bringing it up.

To not let bitterness win.

But people rarely ask what it costs to forgive something that was never named honestly.

This chapter does not tell you to stay angry forever.

It also does not rush you into peace that requires you to lie about what happened.

It gives you permission to name the wound before you release it.

Because healing that begins with denial is not healing.

It is performance.

This chapter was written for the part of you that is tired of performing peace for people who never made repair.`,
  notes: [
    {
      id: "apology-that-never-came",
      title: "The Apology That Never Came",
      wallpaperLine: "You can stop waiting for repair from someone committed to silence.",
      // TODO:BODY — note body not yet authored; do not ship without this
      body: "TODO:BODY",
      from: "TODO:RECEIPT",
      to: "TODO:RECEIPT",
      date: "TODO:RECEIPT",
      total: "You can stop waiting for repair from someone committed to silence.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
    {
      id: "family-that-hurt",
      title: "The Family That Hurt",
      wallpaperLine: "Family can explain the wound, but it does not excuse it.",
      body: `I hope you heal from the pain people told you not to name because it came from family.

Because when family hurts you, the world often asks you to understand.

To forgive.

To be mature.

To remember they are still your blood.

But sometimes blood is where the wound began.

Sometimes home was the first place you learned to stay quiet.

Sometimes family was the first place you learned to apologize for having feelings.

Sometimes the people who should have made you feel safe were the first people who made you feel difficult to love.

And you have spent years being fair to people who were not always gentle with you.

You explained their behavior.

You defended their limitations.

You carried their history.

You made excuses for the way they loved you badly.

But love does not stop being painful because it came from family.

And pain does not become small because the person who caused it shares your blood.

You are allowed to name what happened.

You are allowed to need distance.

You are allowed to protect the version of yourself that nobody protected then.

I hope you heal from calling self protection disrespect.

I hope you stop abandoning yourself just to keep peace with people who never asked what their peace cost you.`,
      from: "The home that taught you to be quiet about your own pain.",
      to: "The child in you who still wonders why love felt unsafe.",
      date: "The day you stop calling self protection disrespect.",
      total: "Family can explain the wound, but it does not excuse it.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
    {
      id: "people-who-watched-you-bleed",
      title: "The People Who Watched You Bleed",
      wallpaperLine: "Your proof was never their permission. Keep going.",
      body: `I hope you heal from
the people who knew your story
but still waited for strangers to clap
before they supported you.

They knew what you survived.

They knew what you carried.

They knew the pit you crawled out of.

And still, they waited.

They waited until money validated you.

They waited until the world
started calling you successful.

They waited until it became safe
to say they always believed in you.

Do it anyway.

Stop expecting recognition
from people who watched you bleed
and still chose silence.

Become your own witness.

Your own proof.

Your own reason to keep going.

Because the dream was never given to the crowd.

It was given to you.`,
      from: "Every silent room where you expected support and received distance.",
      to: "The day you stop needing witnesses before you believe yourself.",
      date: "The moment you choose the dream without waiting for applause.",
      total: "Your proof was never their permission. Keep going.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
  ],
  privateLetter: `The in-between does not have good lighting.

This chapter took the most courage to sit inside. Not because the words were hard to find, but because the people reading it are carrying something that has never been properly named by the people who should have named it.

The family wound does not heal on a schedule. The apology that never came is a specific grief — not because nothing happened, but because what happened was never acknowledged. The people who watched and said nothing took something from you that silence rarely gives back.

I did not write this chapter to fix the betrayal. I wrote it to say that you are allowed to name it before you release it. That naming is not the same as staying stuck. That acknowledging what happened is not bitterness. It is honesty. And honesty is the only place where real release can begin.

You are allowed to put it down without pretending it was nothing.

With love,
MAD`,
};

// ---------------------------------------------------------------------------
// CHAPTER FIVE — STAYING
// ---------------------------------------------------------------------------

const chapter5: Volume1Chapter = {
  number: 5,
  title: "Staying",
  tagline: "For the part of you that is tired, delayed, unseen, but still here.",
  chapterLine: "For the days when staying takes everything you have left.",
  emotionalJob:
    "For the part of you that is tired, delayed, unseen, but still here.",
  introLetter: `This chapter is for the days when hope feels far away but you are still here.

For the part of you that needs to remember who you are.

For the dream that delayed and made you question whether you were foolish for believing in it.

For the hour when staying feels hard and the next breath feels like the only assignment you can manage.

This chapter will not ask you to be strong in the way people usually mean it.

It will not tell you to smile through it.

It will not decorate your pain with easy inspiration.

It will simply sit beside the fact that some days ask more from a person than anyone else can see.

There are dreams that take longer than your heart expected.

There are seasons that make you forget your own name.

There are nights when the bravest thing is not a breakthrough, a speech, a plan, or a declaration.

Sometimes the bravest thing is staying close to help.

Sending the message.

Making the call.

Resting before you collapse.

Choosing one more honest breath.

This chapter is not here to fix everything.

It is here to remind you that this moment is not the whole story.

You are still here.

And that matters.`,
  notes: [
    {
      id: "remember-who-you-are",
      title: "Remember Who You Are",
      wallpaperLine: "You are still in there.",
      body: `Always remind yourself
of who you are.

Especially on the days
life makes you feel
like giving up.

Look back.

Not to stay there.
But to remember
how far you have walked
with wounds
nobody saw.

I hope you heal
from the moments
that made you forget
your own strength.`,
      from: "Every version of you that survived what almost broke you.",
      to: "The person you are still becoming.",
      date: "The day you remember you did not come this far by accident.",
      total: "Your story is not over. You are still here.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
    {
      id: "dream-that-delayed",
      title: "The Dream That Delayed",
      wallpaperLine: "Late is not always lost.",
      body: `I hope you heal from the shame of still waiting for something you have worked so hard to become.

Because you are not always grieving failure.

Sometimes you are grieving delay.

And delay has its own kind of heartbreak.

You can still believe in the dream and still be tired of waiting for it.

You can still know it is possible and still feel embarrassed that it has taken this long.

You can still be working hard and still feel like life is moving faster for everyone else.

Nobody tells you how heavy it is to carry a dream that keeps asking for more patience.

More faith.

More sacrifice.

More time.

More money.

More strength you are not sure you still have.

And the hardest part is that people only celebrate dreams when they start looking successful.

They do not always see the years when the dream is still expensive.

Still confusing.

Still lonely.

Still making you look foolish in rooms where results matter more than belief.

But delay is not always denial.

Sometimes delay is the place where the dream becomes honest.

Where you learn what part of it was ego.

What part was calling.

What part was pressure.

What part was purpose.

I hope you heal from measuring your calling only by speed.

I hope you do not bury the dream just because it is late.

But I also hope you stop pretending the waiting has not hurt.`,
      from: "The years that made your dream look like it was not working.",
      to: "The part of you still believing without enough evidence.",
      date: "The day you stop measuring purpose only by speed.",
      total: "Late is not always lost.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
    },
    {
      id: "when-staying-feels-hard",
      title: "When Staying Feels Hard",
      wallpaperLine: "You do not have to do this alone.",
      body: `I hope you stay close to help tonight.

Not because you have to explain everything.

Not because you have to be strong.

Not because you have to turn this pain into a lesson before morning.

Just because this moment is too heavy to carry alone.

If staying feels hard today, let this be one small place where you do not have to pretend.

You do not have to solve your whole life right now.

You do not have to become hopeful immediately.

You do not have to make the pain sound smaller than it is.

You do not have to apologize for needing someone.

Just stay with the next breath.

Then the next one.

Then the next.

There are days when life becomes too loud inside the body.

Days when everything feels like too much.

Days when even being told to be strong feels unfair.

So I will not ask you to be strong right now.

I will ask you to move closer to safety.

Text someone.

Call someone.

Sit where another human can see you.

Move away from anything you could use to hurt yourself.

Go to the safest room you can reach.

Let one safe person know you are not okay.

You are not a burden because you need support.

You are not dramatic because this is heavy.

You are not weak because today is hard to carry.

I hope you stay.

Not because everything is fixed.

But because this moment is not the whole story.`,
      from: "The hour that felt too heavy to survive alone.",
      to: "The part of you that needs support, not shame.",
      date: "The moment you choose one more breath and one safe person.",
      total: "You do not have to do this alone.",
      journalPrompt: "TODO:PROMPT",
      caption: "TODO:CAPTION",
      safetyNote: true,
    },
  ],
  privateLetter: `You made it to the last chapter.

Not because the other chapters were easy. But because you stayed with it. That matters more than it sounds.

There are dreams on long timelines. There are days where remembering who you are takes everything. There are moments where staying is not a choice that anyone else can see or celebrate — it is just a decision made quietly, in the dark, between you and the next breath.

This chapter was written for those moments.

Not to fix them. Not to give them a silver lining. Not to tell you that everything happens for a reason or that your delayed dream is part of a plan.

Just to say: you are still here. And from here — interrupted, tired, delayed, unseen — you are still allowed to begin.

The story is not over.

With love,
MAD`,
};

// ---------------------------------------------------------------------------
// SAFETY & CARE NOTE — shown after Chapter 5
// ---------------------------------------------------------------------------

export const safetyAndCareNote = `BEFORE YOU CLOSE THIS PAGE

This collection was written for weight — not crisis. But if something here opened a door that felt too heavy —

Please reach out.

South Africa: SADAG 0800 21 22 23
International: findahelpline.com

Or simply: tell someone you trust, today.

You are allowed to ask for more than words can give.

— with care, MAD`;

// ---------------------------------------------------------------------------
// CLOSING RECEIPT
// ---------------------------------------------------------------------------

export const closingReceipt: Volume1ClosingReceipt = {
  from: "Every quiet thing you carried without knowing how to explain it.",
  to: "The part of you that needed language before it needed advice.",
  date: "The moment you stopped pretending the weight was nothing.",
  total:
    "You were not too sensitive. You were not too much. You were carrying things that deserved words.",
  closing: `If one note found you, keep it.
If one sentence made you cry, let it.
If one page gave language to something you have been carrying for years, return to it when the silence gets heavy again.

This Volume does not ask you to perform healing.

It only asks you to stop carrying everything without words.

With love and honest words,
MAD
The Note You Needed Today
thenoteyouneeded.today`,
};

// ---------------------------------------------------------------------------
// LAUNCH EXPORT — 5 chapters, 15 notes, no exclusives
// ---------------------------------------------------------------------------

export const volume1Chapters: Volume1Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
];

export const CHAPTER_COUNT = volume1Chapters.length;

export function getChapter(number: number): Volume1Chapter | undefined {
  return volume1Chapters.find((c) => c.number === number);
}

// ---------------------------------------------------------------------------
// QUIET ANGER — reserved for future expansion (Volume 2 / bonus pack)
// NOT included in Volume 1 launch. Do not export in volume1Chapters.
// ---------------------------------------------------------------------------

export const quietAngerChapter = {
  number: 0,
  title: "Quiet Anger",
  tagline: "The chapter nobody wants to admit they need.",
  note: "Reserved for Volume 2 or a future paid expansion. Do not include in Volume 1.",
  noteIds: [
    "ch5-note-11",
    "ch5-note-12",
    "ch5-note-13",
    "ch5-note-14",
    "ch5-note-15",
  ],
};

// ---------------------------------------------------------------------------
// CONTENTS SUMMARY (for product page rendering)
// ---------------------------------------------------------------------------

export const VOLUME1_CONTENTS = [
  "15 complete emotional notes",
  "5 carefully structured chapters",
  "1 Opening MAD Letter",
  "5 private chapter letters",
  "15 journal prompts",
  "15 quiet sharing captions",
  "15 wallpaper or lockscreen lines",
  "1 Closing Receipt",
  "A private digital collection you can return to on your phone or computer",
] as const;

// ---------------------------------------------------------------------------
// MARGIN NOTES FROM MAD
// ---------------------------------------------------------------------------

export interface Volume1MarginNote {
  noteId: string;
  text: string;
}

export const marginNotes: Volume1MarginNote[] = [
  { noteId: "money-that-never-stretched", text: "Survival is expensive." },
  { noteId: "body-is-tired", text: "Your body was not exaggerating." },
  { noteId: "when-staying-feels-hard", text: "Staying is also a form of courage." },
  { noteId: "love-that-left", text: "Grief does not always come with a ceremony." },
  {
    noteId: "marriage-that-became-a-memory",
    text: "Some goodbyes happen slowly, without a word.",
  },
  {
    noteId: "im-fine-but-not-really",
    text: "Saying fine is not lying.\nIt is protecting yourself\nin a room that is not yet safe.",
  },
  { noteId: "job-that-ended", text: "The alarm still went off.\nYou got up anyway." },
  { noteId: "family-that-hurt", text: "You did not imagine it." },
  { noteId: "dream-that-delayed", text: "Late is not always lost." },
  { noteId: "remember-who-you-are", text: "You are still in there." },
];

export function getMarginNote(noteId: string): Volume1MarginNote | undefined {
  return marginNotes.find((n) => n.noteId === noteId);
}
