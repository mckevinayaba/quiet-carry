// Volume 1 manuscript content.
// Source of truth: VOLUME_1_MANUSCRIPT.md in the repository root.
// Update this file when the manuscript changes. Do not hardcode content in JSX.

export interface Volume1Note {
  id: string;
  title: string;
  body: string;
  from: string;
  to: string;
  date: string;
  total: string;
  safetyNote?: boolean;
  isExclusive?: boolean;
}

export interface Volume1Chapter {
  number: number;
  title: string;
  tagline: string;
  introLetter: string;
  notes: Volume1Note[];
  privateLetter: string;
  isExclusive?: boolean;
}

export interface Volume1ClosingReceipt {
  from: string;
  to: string;
  date: string;
  total: string;
  closing: string;
}

// ---------------------------------------------------------------------------
// CHAPTER ONE — SURVIVAL
// ---------------------------------------------------------------------------

const chapter1: Volume1Chapter = {
  number: 1,
  title: "Survival",
  tagline: "Money, body, exhaustion, staying.",
  introLetter: `This chapter is not about resilience.

Resilience is a word people use to make survival sound inspiring. But surviving is not always inspiring. Sometimes it is just what happened. Sometimes it is all you had left to do.

This chapter is for the seasons where getting through the day was the entire achievement. Where functioning looked fine on the outside and felt like warfare on the inside. Where you stretched money, energy, patience, and hope past the point where any of those things had a right to still be working.

It is for the tiredness that rest alone could not explain. For the months where your bank account and your dignity were in a constant, private negotiation. For the weight your body started holding when your mind had no more room. For the moments where staying felt like the hardest thing anyone had ever asked of you.

You survived seasons that nobody celebrated. You made decisions under pressure that people who have never felt that pressure would not understand. You kept going when stopping would have been easier to explain.

This chapter does not ask you to be grateful for what you survived. It does not suggest that your hard seasons were lessons in disguise or part of a plan. It simply acknowledges that you were there. That it was heavy. That you carried it anyway.

And that carrying it was enough.

The notes in this chapter were written for the parts of your survival that never got a witness. Read them slowly. Let them see you.`,
  notes: [
    {
      id: "money-that-never-stretched",
      title: "You Were Not Careless",
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
    },
    {
      id: "body-is-tired",
      title: "Your Body Was Not Weak. It Was Honest.",
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
    },
    {
      id: "body-remembers",
      title: "The Unknown Number",
      body: `I hope you
heal from
the unknown number
that makes
your stomach drop
before you even answer.

Some debts
live in the body,
not the bank.

Some fear
arrives as a ringtone.`,
      from: "Every ring that felt like a judge.",
      to: "A phone that only brings news you can handle.",
      date: "The first month you do not flinch.",
      total: "Breathing through the whole day.",
    },
    {
      id: "when-staying-feels-hard",
      title: "You Do Not Have to Do This Alone",
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
      safetyNote: true,
    },
  ],
  privateLetter: `There is a kind of survival that does not look like survival from the outside.

It looks like functioning. It looks like managing. It looks like showing up, answering the emails, making the phone calls, buying the groceries, getting through the meetings, coming home, doing it again the next day.

But you and I both know what it felt like from the inside. We know the mathematics in the chest. The calculations that happened before the purchase. The way certain days were negotiated rather than lived. The way some nights you sat very still because moving might cost more energy than you had left.

Nobody put "survived" on your chest and gave you a crowd. There was no marker for the morning you stretched the last week's money through another week. No ceremony for the day you stayed when staying was the hardest option available. No witness for the specific weight of being the person who held everything together while your own ground was unsteady.

The notes in this first chapter were not written to inspire you. They were written to see you. To sit beside the kind of survival that lives in the body as a tightness, a flinch, a held breath before opening a banking app. To name the exhaustion that rest alone does not fix. To acknowledge that some seasons asked you to perform a level of okay that no person should have to perform for as long as you did.

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
// CHAPTER TWO — UNSAID GRIEF
// ---------------------------------------------------------------------------

const chapter2: Volume1Chapter = {
  number: 2,
  title: "Unsaid Grief",
  tagline: "The losses that never received a funeral.",
  introLetter: `Not all grief comes with flowers and a service.

Some grief arrives quietly and stays for years without ever being named. It lives in the way you still reach for your phone before remembering. In the way certain music is no longer safe to play. In the way a street, or a smell, or a time of year can undo an entire week of holding yourself together.

This chapter is for losses that did not come with public acknowledgment. The relationship that ended without a ceremony. The love that left before you were ready to let it. The marriage that became a memory slowly, painfully, and in private. The distance that grew between you and someone you once knew completely, a distance that was necessary but still cost something real.

These are the griefs people tend to minimize because they are hard to explain at a dinner table. Because someone will always say "at least." At least you are still alive. At least you have other people. At least it ended before it got worse. At least.

At least does not hold grief. It dismisses it.

This chapter holds it instead.

There is no timeline in here. No gentle suggestion that you should be further along. No nudge toward forgiveness before you are ready. Just space for what was lost. For what you loved. For what you still miss even when you know, intellectually, that it had to go.

Grief does not need to be rushed. It needs to be witnessed.

This chapter is your witness.`,
  notes: [
    {
      id: "love-that-left",
      title: "Missing Them Is Not the Same as Needing Them Back",
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
    },
    {
      id: "marriage-that-became-a-memory",
      title: "It Ended, But It Was Not Nothing",
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
    },
    {
      id: "grief-that-lives-in-habits",
      title: "Grief in Your Thumb",
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
    },
    {
      id: "distance-is-also-healing",
      title: "Distance Is My New Answer",
      body: `Distance is my new answer
to disrespect.

I no longer react.
I no longer argue.
I no longer dive
into drama.

I simply remove
my presence.

Because some people
throw cruelty carelessly,
then call you sensitive
for bleeding.

I hope you heal
from the people
who made your reaction
the problem
instead of their actions.`,
      from: "Every argument that stole your peace.",
      to: "A silence that finally protects you.",
      date: "The day you stop explaining your absence.",
      total: "Your presence, returned to you.",
    },
  ],
  privateLetter: `Grief does not always arrive with a name.

Sometimes it arrives as a habit you catch yourself in. A reaching. A checking. A specific kind of quiet that descends at a particular time of year. A space in your routines that used to be filled and is now conspicuous only to you.

People will tell you to move through grief as though moving through it is the goal. As though the other side of it is where you need to get to. As though sitting inside it, naming it, letting it be what it is without rushing it toward a conclusion — as though that is somehow the wrong relationship to have with loss.

The notes in this chapter were written for the losses that do not come with public acknowledgment. The ones that arrive without flowers or a service or a community that knows to gather. The ones that live only in the private economy of your own body.

You do not owe anyone a timeline for your grief. You do not owe anyone the performance of having moved on before you actually have. You do not owe anyone the version of yourself that is easier to be around, lighter, less burdened, ready to receive the good things people want to offer you as a substitute for the thing that was lost.

You are allowed to still be grieving something that most people have stopped asking about.

You are allowed to still be grieving something that never had a name to begin with.

I hope this chapter sits with you the way you needed someone to sit with you when the loss was new. I hope it names the weight without making you justify it. I hope it gives the silence some company.

With love,
MAD`,
};

// ---------------------------------------------------------------------------
// CHAPTER THREE — BECOMING VISIBLE
// ---------------------------------------------------------------------------

const chapter3: Volume1Chapter = {
  number: 3,
  title: "Becoming Visible",
  tagline: "The parts of yourself you buried to survive.",
  introLetter: `There was a version of you that learned to disappear.

Maybe it happened early. Maybe it happened in a relationship, a job, a family dynamic, a community that did not have space for your full self. Maybe you learned to arrive smaller. To speak less. To want quietly. To have opinions but offer them only when asked, and sometimes not even then.

This chapter is about that version of you. The one who managed, adjusted, and edited in order to be allowed in the room.

It is also about what happens when you start to come back.

Because becoming visible is not a clean story. It does not always feel like confidence or breakthrough or arrival. Sometimes it feels like grief, because you are mourning the self you performed for so long. Sometimes it feels like loneliness, because the people who loved the smaller version of you are not always sure what to do with the larger one. Sometimes it feels like standing in the middle of a room and not knowing where to put your hands.

This chapter was written for the person learning, slowly and imperfectly, that they are allowed to take up space. That their feelings deserve more than a footnote. That "I'm fine" is not a personality. That the loneliness of being surrounded by people who cannot see you is real. That who you actually are was always worth protecting, even when protecting it felt impossible.

You are not becoming someone new. You are becoming someone true.

This chapter will sit with you while that happens.`,
  notes: [
    {
      id: "im-fine-but-not-really",
      title: "The Truth Was Too Heavy",
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
      total: "The tears you saved for the dark. They are not shame. They are just waiting for permission.",
      safetyNote: true,
    },
    {
      id: "the-words-that-stayed",
      title: "The Sentence That Stayed",
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
    },
    {
      id: "loneliness-no-one-sees",
      title: "You Were Not Hard to Love",
      body: `I hope you heal from the loneliness people cannot see because you still know how to function.

Because the hardest loneliness is not always an empty room.

Sometimes it is being surrounded by people who do not really know where you are inside yourself.

People see you reply.

They see you laugh.

They see you show up.

They see you post.

They see you answer messages.

They see you keep moving.

So they assume you are fine.

They do not see the silence after the conversation ends.

They do not see how long you stare at your phone.

They do not see the part of you that wants someone to ask again, but differently.

They do not see how tired you are of being reachable but not really reached.

You are not lonely because nobody knows your name.

You are lonely because too few people know your weight.

The things you carry.

The things you avoid saying.

The truth behind your "I am okay."

The version of you that exists after everyone leaves.

I hope you heal from having to collapse before people believe you needed someone.

I hope one day you are known without performing pain.

I hope someone sits beside your silence and does not rush to leave it.`,
      from: "Every room where you were present but still unseen.",
      to: "The part of you waiting to be known without performing pain.",
      date: "The first time someone stays long enough to notice the silence.",
      total: "You were not hard to love. You were hard to see from the surface.",
    },
    {
      id: "remember-who-you-are",
      title: "Remember Who You Are",
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
    },
  ],
  privateLetter: `You learned, somewhere along the way, that your full self was too much.

Maybe it was said directly. Maybe it was communicated through the way certain rooms changed when you brought your actual feelings into them. Maybe it was the quiet feedback of people needing you to be a particular version of yourself — the useful one, the okay one, the one who does not require anything — and the way you eventually just became that version.

Becoming smaller is not always a decision. Sometimes it is an adaptation. A rational response to an environment that gave you specific information about what you were allowed to be. You listened. You adjusted. You made yourself easier to have around.

And now something is trying to come back.

Not loudly, not all at once, not with a clear plan for what comes next. But something in you is pushing against the edges of the smaller shape and asking for more room. More honesty. More space for the feelings that do not fit neatly into what people need from you.

This chapter was written for that pushing. For the part of you that is becoming more honest with itself even when it is uncomfortable. For the loneliness of being seen and still feeling unseen. For the fear of taking up space that is actually yours to take. For the remembering of who you were before the adapting started.

You were always allowed to be this.

The people who needed you smaller were working with their own limitations. That was never evidence that you were too much.

You are exactly the right amount. Take your time coming back to that.

With love,
MAD`,
};

// ---------------------------------------------------------------------------
// CHAPTER FOUR — STARTING OVER
// ---------------------------------------------------------------------------

const chapter4: Volume1Chapter = {
  number: 4,
  title: "Starting Over",
  tagline: "The life that ended before the next one began.",
  introLetter: `Nobody tells you how long the in-between lasts.

They celebrate the ending and they celebrate the new beginning. But the space between them, the mornings where you are not yet who you are becoming and no longer who you were, that part does not make it into the story people tell about reinvention.

This chapter is for the in-between.

For the morning after the job ended and the alarm still went off. For the family that hurt you in ways you are still learning to name without flinching. For the dream you announced to people who are still waiting for the update, while you are still waiting for the momentum. For the life you are trying to rebuild quietly, without making it a public project, without collapsing under the pressure of people who want you to be further along by now.

Starting over is rarely a dramatic pivot. Usually it is a slow, uncomfortable accumulation of small decisions. Saying no to something that once defined you. Allowing a new shape of things to begin forming. Letting the old version of the plan dissolve without having the new version ready to replace it.

It takes more patience than it should. It costs more than people acknowledge. It requires you to tolerate uncertainty at a level that most people would find unbearable, for longer than most people realize is normal.

You are not failing the starting over. You are inside it. That is a different thing entirely.

This chapter holds the transition. Read it for the days when the new life has not yet arrived and the old one still visits.`,
  notes: [
    {
      id: "job-that-ended",
      title: "The Role Ended. You Did Not.",
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
    },
    {
      id: "dream-that-delayed",
      title: "Late Is Not Always Lost",
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
    },
    {
      id: "family-that-hurt",
      title: "Honoring Family Should Not Require Abandoning Yourself",
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
    },
    {
      id: "people-who-watched-you-bleed",
      title: "Do It Anyway",
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
    },
  ],
  privateLetter: `The in-between does not have good lighting.

It is the space where the old shape of your life has dissolved but the new one has not arrived yet. Where you are making decisions you cannot yet see the full consequences of. Where you are being asked to trust a process that has not yet given you enough evidence to trust.

This is the chapter that took me the longest to write. Not because the words were hard to find, but because I know that the people reading it are in the middle of something and the middle is the worst place to receive words that are supposed to help. Words feel insufficient in the in-between. They feel like someone handing you a quote when what you actually need is a different set of circumstances.

I know that.

I did not write this chapter to fix the in-between. I wrote it to say that I know it exists. That the starting over is not clean. That the family wound does not heal on a schedule. That the dream on a long timeline is still a dream even when the evidence is not in yet. That losing a role that held your identity is a specific grief that takes longer to process than people give it credit for.

If you are in this chapter right now, I am not going to tell you it is going to be fine. Fine is not a promise I can make, and it is not what you need anyway. What I can tell you is that this transition — as uncomfortable as it is — is a thing that happens to people who are honest enough to let the old thing end before the new thing is ready.

That takes more courage than people name.

You are in the middle.
That is not a failure.
It is a location.

With love,
MAD`,
};

// ---------------------------------------------------------------------------
// CHAPTER FIVE — QUIET ANGER (EXCLUSIVE)
// ---------------------------------------------------------------------------

const chapter5: Volume1Chapter = {
  number: 5,
  title: "Quiet Anger",
  tagline: "The chapter nobody wants to admit they need.",
  isExclusive: true,
  introLetter: `This is the chapter people skip first and return to last.

Because anger is not what we were taught to bring into healing. We were taught forgiveness. Acceptance. Moving on. Gratitude for what the hard season taught us. Compassion for the people who hurt us. Grace, always grace, even when grace was not extended to us in return.

Nobody taught us what to do with the anger that did not go away after we forgave. The anger that returned at 2am even after we had been to therapy and journaled and prayed and talked about it until we were exhausted from our own processing. The anger that sits quietly in the body and expresses itself in ways we do not always recognize as anger: impatience, perfectionism, isolation, a flinch at certain names, a tiredness that arrives whenever certain topics get close.

That anger is not a character flaw. It is information. It is your body keeping a record of what was done, what was taken, what was promised and never delivered, what was said and never acknowledged.

This chapter was written for the anger you stopped performing for other people's comfort. The anger that came from being loved only for your usefulness. The anger of waiting for people who made it clear, eventually, that they were never going to come. The anger at an apology that never arrived. The anger at what strength cost you. The anger at watching the life you wanted keep moving on a timeline that did not include you.

These are the notes that only exist here.

They were not written for the homepage. They were not written to be shared softly. They were written for the private room. For the honest one. For you.

You are allowed to feel this. You are allowed to name it. You do not have to make it beautiful for anyone.

Read this chapter on the nights the other chapters are not enough.`,
  notes: [
    {
      id: "ch5-note-11",
      title: "The Version of You They Only Loved When You Were Useful",
      isExclusive: true,
      body: `I hope you heal from the specific ache of being loved most when you were giving the most.

You know the kind of love I mean. The kind that arrived reliably when you had something to offer. When you had money to lend, time to spare, advice to give, energy to carry someone else's emergency. When your presence came with a service. When your value was legible because it was measurable.

The calls came when something was needed. The warmth arrived when you were capable. The closeness found you when you were able, available, functional, and giving.

But on the days you were none of those things, on the days your own cup was empty and your own hands were full and your own chest was heavy with things nobody had asked about, the warmth had somewhere else to be.

That is not love. That is management.

And the cruelest part is that you kept showing up anyway. Because you loved them differently than they loved you. Because you told yourself the distance was temporary. Because you decided that being needed was close enough to being wanted. Because you did not yet have the language for the difference between someone who loves you and someone who loves what you do for them.

But your body knew. Your body has always known.

It kept the record of the times you needed and no one came. The times you were struggling and no one noticed. The times you said "I'm fine" and were believed too quickly, because believing you was more convenient than asking again.

You spent years being useful. Being available. Being the reliable one, the capable one, the one people call when they need something sorted.

You were not loved for your availability. You were used by it.

And you deserve to feel the anger of that distinction.

You do not have to perform understanding for people who treated your love like a service. You do not have to soften this truth to make it easier to carry. You do not have to call it complicated when the honest word is simpler and harder.

You were loved when you were useful. That is not the kind of love you were built for. And you are allowed to stop arranging your life around people who only show up for the version of you that gives.`,
      from: "Every relationship where your value disappeared the moment your capacity did.",
      to: "The part of you that kept giving, hoping giving would eventually be enough to make them stay.",
      date: "The day you stop calling conditional love complicated and start calling it what it is.",
      total: "You were not too much. You were not enough for the wrong people. There is a difference.",
    },
    {
      id: "ch5-note-12",
      title: "The Day You Realized They Were Never Coming",
      isExclusive: true,
      body: `I hope you heal from the day you stopped waiting and the grief of that stopping hit harder than the waiting ever did.

Because waiting, at least, still has hope in it. Waiting still keeps the door open. Waiting still allows the version of the story where they show up, where they choose you, where they finally understand what it cost you to stay available for so long.

But there was a day the waiting ended.

Maybe it was not dramatic. Maybe it did not arrive as a revelation or a confrontation or a clean final conversation. Maybe it was smaller than that. A silence that went on too long. A birthday that passed without a word. A moment of need where you reached and found nothing. A realization that arrived quietly while you were doing something ordinary, washing dishes, walking to your car, sitting in a room full of people, a realization that they had told you, through their absence, everything you needed to know.

And they were never coming.

Not in the way you needed. Not in the way you deserved. Not in the way you had restructured your hope, again and again, to accommodate. They were not on their way. They were not delayed. They were not struggling to find the words. They had simply made a different choice, quietly, without ever saying it directly to your face.

The grief of that is a specific grief. It does not have a clear start date. It does not have a ceremony. Nobody brings food or sits with you in it because from the outside, nothing happened. You just stopped expecting something that was never confirmed but was always quietly hoped for.

And now you are grieving a future that never existed while being expected to act like what you lost was not real because it was never officially promised.

But hope is real. Waiting is real. The love you kept giving into an absence is real. The years you organized your life around a possibility is real. What you lost is real.

You are allowed to grieve it without justifying it.

You are allowed to be angry that they never had the decency to say, directly and honestly, that they were not coming. That they let you wait without the dignity of a clear answer. That their silence was a choice they made at your expense.

It is okay that it took you longer than other people think it should have. Letting go of something you never got to properly hold takes exactly as long as it takes.`,
      from: "Every morning you woke up still giving someone the benefit of a doubt they had long stopped earning.",
      to: "The part of you that kept the door open long after the light went out.",
      date: "The day you understood that their absence was never an accident.",
      total: "Waiting for people who had already decided is one of the loneliest things a person can do. You did not deserve that silence. You deserved a real answer.",
    },
    {
      id: "ch5-note-13",
      title: "The Apology You Stopped Waiting For",
      isExclusive: true,
      body: `I hope you heal from having to close a wound that someone else opened, using only your own hands.

Because that is what the apology that never came actually asks of you. It asks you to do the work of their accountability without their participation. To heal around an absence. To put yourself back together using the same hands that were never acknowledged as broken in the first place.

And they made it look easy. Or perhaps they made it look like nothing happened at all. Perhaps they moved on. Perhaps they reappeared in your life acting normal, laughing too easily, bringing up the past only in the version where they are comfortable. Perhaps they never brought it up again because not bringing it up was their version of resolution.

But you remember.

You remember exactly what was said and how it landed. You remember where you were standing. You remember what your body did. You remember the night after, and the week after, and the version of yourself that arrived on the other side of what they did carrying something heavier than you walked in with.

You needed them to say: I know what I did. I know what it cost you. I am sorry for both.

Instead you got silence. Or excuses dressed as explanations. Or a partial admission that carefully avoided the part that actually hurt. Or a "sorry you felt that way" that placed the wound back in your hands and called it resolution.

So you waited. Because you believed that people who cared would eventually find the courage to be honest. That time would give them the clarity to understand what they owed you. That the relationship meant enough to both of you that they would eventually do the harder thing.

But they did not.

And now you are left with a choice nobody should have to make: carry the anger indefinitely, or find a way to put it down without the thing you actually needed to help you let it go.

Here is what I want you to know before you decide.

Putting it down does not require their participation. It does not require that you pretend it did not happen or that what they did was understandable or that you have found peace with how it was handled. It does not require you to minimize your wound so they can remain comfortable.

It means you stop organizing your healing around a moment that may never come. It means you stop giving them the power of your waiting. It means you take back the part of yourself that has been on hold since it happened.

You are allowed to be angry that you never got what you deserved. You are allowed to grieve the closure that did not come. You are allowed to put it down and still know, quietly and privately, that what they did was wrong and that a real apology would have mattered.

You can heal without their help. That is not justice. But it is yours to take.`,
      from: "Every conversation you rehearsed in your head that never happened in real life.",
      to: "The part of you that kept a door open for someone who never came back to close it properly.",
      date: "The day you decide your healing does not require their honesty to begin.",
      total: "The apology that never came did not mean what happened did not matter. It meant they were not yet brave enough to admit that it did. That is their failure. Not yours.",
    },
    {
      id: "ch5-note-14",
      title: "The Strength That Cost Too Much",
      isExclusive: true,
      body: `I hope you heal from everything you lost in the process of not falling apart.

Because staying strong cost you something. Maybe many things. And nobody counted the cost with you because the whole point of appearing strong is that it is invisible. The maintenance is private. The price is paid quietly. The bill arrives in ways that look unrelated: exhaustion that does not lift, impatience that surprises you, a sudden heaviness in social situations you used to navigate easily, a numbness that arrived in the places that used to feel something.

You carried what needed to be carried. You showed up when showing up felt impossible. You kept functioning when functioning was the hardest thing anyone could have asked of you. You held other people's weight while yours was already past capacity. You smiled in the rooms. You answered the messages. You managed the situations. You did what needed to be done.

And nobody asked what it was doing to you.

Not because they were cruel. Some of them. But mostly because your strength made the question feel unnecessary. You looked like you were handling it. So the assumption was that you were. And because you were capable, the world kept bringing you things that required capability. Because you were reliable, people kept relying. Because you never once said "I cannot hold this right now," they never once stopped handing you things to hold.

Somewhere in there, strong became something you had to be instead of something you sometimes were.

Somewhere in there, your capacity became other people's comfort. Your composure became their permission to stay comfortable. Your refusal to collapse became the reason nobody thought to check whether you were close to it.

Here is the thing about strength that is never said loudly enough: it is not free. Every act of endurance has a biological, emotional, and relational cost. Every time you held it together when falling apart would have been more honest, your body recorded the effort. Your nervous system kept the receipt. And those receipts accumulate, quietly, until the body finds its own way to present the bill.

The tiredness you cannot explain is part of the bill. The flinching at certain things is part of the bill. The way certain sounds or words or dynamics make your whole body want to leave a room is part of the bill. The dreams that make no sense but leave you heavy in the morning are part of the bill.

You are not broken. You are paying for something you were never fairly charged for in real time.

You are allowed to be angry that you were handed too much. That you were trusted with more than any one person should carry. That the very thing people praised you for, your strength, was also the thing that made them comfortable handing you things they should have carried themselves.

You are allowed to want, from now on, a different arrangement. One where your limits are visible. One where needing rest is not treated as a failure. One where you can say "not today" without it becoming a crisis for everyone around you.

You were strong for a long time. Sometimes too long, for too many people, at too high a cost.

You are allowed to put some of it down now.`,
      from: "Every moment your endurance was mistaken for inexhaustibility.",
      to: "The part of you that does not yet believe rest is something you have earned.",
      date: "The day you stop performing strength for people who should have helped you carry the load.",
      total: "You did not stay strong because it was easy. You stayed strong because nobody made it safe enough to fall apart. That is not a compliment to your character. That is an indictment of the support you were never given.",
    },
    {
      id: "ch5-note-15",
      title: "The Life That Moved On Without Me",
      isExclusive: true,
      body: `I hope you heal from the specific cruelty of watching a life you wanted continue on a timeline that did not include you.

Not your fault. Not entirely. But also not something anyone warned you about. That grief, loss, circumstances, systems, or simply the compounding weight of surviving can remove you from your own timeline so quietly that by the time you notice, it feels like years have passed while you were somewhere else, trying to get back to yourself.

You watched people move. Not strangers. People you know. People you started with, or alongside, or even behind, who are now in places you once pointed at and said, quietly, that is where I am going. Houses. Relationships that stuck. Careers that compounded. Children. Stability. Momentum. The kind of life that looks, from the outside, like something clicked.

And you are still here. Still carrying. Still trying to clear enough space in the present just to begin thinking about a future that used to feel closer than it does now.

The comparison is not vanity. It is grief. It is the gap between the life you imagined and the life that actually arrived, measured against the lives of people who did not have to survive the same things you did to get to the same starting line.

That gap is real. The anger at that gap is also real.

Because some of what looks like "behind" is not behind. It is the aftermath of things that happened to you. It is the cost of circumstances that had nothing to do with your ambition and everything to do with your access, your safety, your money, your losses, your body, your family, your country, the specific weight of the life you were handed.

You were not lazy. You were carrying something heavy in a race where not everyone was carrying the same load. And the world did not stop the clock while you carried it.

That is not motivation. That is not a silver lining. That is simply the uncomfortable truth of what was asked of you and what it cost you in time, in years, in milestones, in the compounding interest of a life that was interrupted too many times to count.

You are allowed to be angry that life kept moving. You are allowed to grieve the years that felt more like survival than living. You are allowed to feel the specific sadness of looking at what should have been and acknowledging that should and is are two different countries.

And then, slowly, when you are ready, you are allowed to look at what is still possible. Not to rush there. Not to perform optimism. But because even a life that has been interrupted still has unclaimed territory. Even a timeline that has been broken still has pages left.

The life that moved on without you did not take everything with it. It left you. And leaving means there is still somewhere for you to be.

You are still here. That is not a consolation. That is a fact with weight. And from here, even interrupted, even late by someone else's calendar, even tired from everything you carried just to remain standing, you are still allowed to begin.`,
      from: "Every year that demanded survival when you came for something more.",
      to: "The part of you that is afraid the window has permanently closed.",
      date: "The day you stop measuring your life against timelines that were never designed to account for what you carried.",
      total: "The life you wanted did not move on without you. It waited in the only place it could: inside you. Interrupted, not cancelled. Delayed, not denied.",
    },
  ],
  privateLetter: `You made it to the end of the hardest chapter.

Not because it was the longest. Not because the other chapters were easy. But because this one asked you to sit with the kind of feelings people spend entire lifetimes avoiding. The ones that do not photograph well. The ones that make people uncomfortable at dinner tables. The ones you were told, directly or quietly, you should have moved past by now.

You did not skip it. That matters.

Anger does not make you ungrateful. It does not make you bitter or broken or someone who cannot heal. It makes you honest. And honesty, in a world that rewards performance, is one of the most difficult things a person can choose.

What you carried into this chapter, the love that was conditional, the people who never came, the apology that never arrived, the cost of your strength, the life that seemed to move without you, none of it was small. None of it was something you should have simply gotten over. All of it deserved language. All of it deserved a room.

This chapter was that room.

You are allowed to leave it differently than you entered.
Not fixed. Not resolved. But witnessed.
That is what this was for.

Take the anger with you if you need to. You do not have to leave it here before you are ready. But know that you named it. And naming something, even once, even quietly, even just to yourself inside a document nobody else will see, changes your relationship to it.

You are not your anger. But your anger is information. And now you have some of the words for it.

That is not nothing. For many people, that is everything.

With love,
MAD
The Note You Needed Today`,
};

// ---------------------------------------------------------------------------
// CLOSING RECEIPT
// ---------------------------------------------------------------------------

export const closingReceipt: Volume1ClosingReceipt = {
  from: "The five heaviest chapters of the quiet life.",
  to: "The version of you that opened this and stayed.",
  date: "Today. Whichever day that is. It is the right day.",
  total: `You did not need to be further along. You did not need to be healed first. You needed exactly what you came with: the willingness to sit with your own truth for a little while longer. That was enough. That has always been enough.`,
  closing: `Volume 2 is being written for what comes next.\nWhen you are ready, we will be here.\n\nWith love and honest words,\nMAD\nThe Note You Needed Today\nthenoteyouneeded.today`,
};

// ---------------------------------------------------------------------------
// EXPORT
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
