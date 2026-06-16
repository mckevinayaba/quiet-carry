export interface EmotionalCategory {
  slug: string;
  title: string;
  subtitle: string;
}

export interface NoteEntry {
  id: string;
  categorySlug: string;
  title: string;
  mainText: string;
  receiptFrom?: string;
  receiptTo?: string;
  receiptDate?: string;
  receiptTotal?: string;
  journalPrompt: string;
  sendableText: string;
}

export interface CollectionEntry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  contents?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  comingSoon?: boolean;
}

export const categories: EmotionalCategory[] = [
  {
    slug: "im-fine-but-not-really",
    title: "I’m fine, but not really",
    subtitle: "For the truth you keep swallowing.",
  },
  {
    slug: "the-words-that-stayed",
    title: "The words that stayed",
    subtitle: "For the sentence that still lives in you.",
  },
  {
    slug: "the-pain-i-made-look-easy",
    title: "The pain I made look easy",
    subtitle: "For everything you survived while looking strong.",
  },
  {
    slug: "distance-is-also-healing",
    title: "Distance is also healing",
    subtitle: "For the people you had to stop explaining yourself to.",
  },
  {
    slug: "the-body-remembers",
    title: "The body remembers",
    subtitle: "For fear, grief, anxiety, and survival that live beneath the skin.",
  },
  {
    slug: "grief-that-lives-in-habits",
    title: "Grief that lives in habits",
    subtitle: "For the numbers you still want to call and the memories that still visit.",
  },
  {
    slug: "shame-got-there-first",
    title: "Shame got there first",
    subtitle: "For the help you needed but could not ask for.",
  },
  {
    slug: "the-apology-that-never-came",
    title: "The apology that never came",
    subtitle: "For wounds that healed without closure.",
  },
  {
    slug: "remember-who-you-are",
    title: "Remember who you are",
    subtitle: "For the days life makes you feel like giving up.",
  },
  {
    slug: "people-who-wanted-your-fall",
    title: "People who wanted your fall",
    subtitle: "For the ones who judged your climb without knowing what you survived.",
  },
];

export const notes: NoteEntry[] = [
  {
    id: "note-im-fine-but-not-really",
    categorySlug: "im-fine-but-not-really",
    title: "I’m fine, but not really",
    mainText: `They asked,\n“How are you?”\nand this time,\nthey really meant it.\n\nThey looked at you\nlike they had space\nfor the truth.\n\nBut you still smiled.\nYou still said,\n“I’m fine.”\n\nNot because\nthey did not care.\nNot because\nthey would not stay.\n\nBecause the truth\nwas too heavy\nto carry out loud.\n\nI hope you\nheal from\nthe fear\nof being honest\nwith people\nwho are safe enough\nto hear you.`,
    receiptFrom:
      "Every time the truth climbed your throat and you swallowed it back down. every question you dodged with a smile. every night you cried alone because no one asked when you were ready to answer.",
    receiptTo:
      "One safe place. one person. one moment where you do not have to edit your pain.",
    receiptDate: "The first time someone asks and you do not flinch.",
    receiptTotal:
      "The tears you saved for the dark. they are not shame. they are just waiting for permission.",
    journalPrompt: "What truth reached your throat but never became words?",
    sendableText:
      "They asked, ‘How are you?’ and this time, they really meant it. But the truth was too heavy to carry out loud. I hope you heal from the fear of being honest with people who are safe enough to hear you.",
  },
  {
    id: "note-the-words-that-stayed",
    categorySlug: "the-words-that-stayed",
    title: "The words that stayed",
    mainText: `Some sentences\ndo not leave\nwhen the person does.\n\nThey sit in your chest\nlike unfinished weather.\n\nYou still hear them\nat the wrong time.\nIn the shower.\nAt red lights.\nAt 2:14 in the morning.\n\nI hope you heal\nfrom the words\nthat kept talking\nlong after the room went quiet.`,
    receiptFrom: "The sentence you replayed until it felt like fact.",
    receiptTo: "The version of you that deserves a gentler voice.",
    receiptDate: "The day their words stop sounding like your own.",
    receiptTotal: "Not every sentence spoken to you deserved permanent housing.",
    journalPrompt: "What words still visit you after everything else has moved on?",
    sendableText:
      "Some sentences do not leave when the person does. I hope you heal from the words that kept talking long after the room went quiet.",
  },
  {
    id: "note-the-pain-i-made-look-easy",
    categorySlug: "the-pain-i-made-look-easy",
    title: "The pain I made look easy",
    mainText: `You made survival\nlook ordinary.\n\nYou answered messages.\nYou kept appointments.\nYou laughed in the right places.\n\nNo one saw\nhow much strength\nit took\njust to look steady.\n\nI hope you heal\nfrom being praised\nfor carrying too much\nwithout dropping it.`,
    receiptFrom: "The weight you learned to hold with a calm face.",
    receiptTo: "The tired part of you that never got witnessed.",
    receiptDate: "The first day you stop calling overfunctioning strength.",
    receiptTotal: "Looking strong is not the same as feeling safe.",
    journalPrompt: "What did you survive while everyone thought you were just being strong?",
    sendableText:
      "You made survival look ordinary. I hope you heal from being praised for carrying too much without dropping it.",
  },
  {
    id: "note-distance-is-also-healing",
    categorySlug: "distance-is-also-healing",
    title: "Distance is also healing",
    mainText: `Distance is not always bitterness.\nSometimes\nit is the first clean breath.\n\nYou did not leave\nbecause you stopped caring.\nYou left\nbecause you could not keep\nbleeding in the same room.\n\nI hope you heal\nfrom the guilt\nof choosing peace\nover access.`,
    receiptFrom: "Every explanation that still got turned against you.",
    receiptTo: "The boundary that finally sounds like self-respect.",
    receiptDate: "The moment silence stops feeling cruel and starts feeling clean.",
    receiptTotal: "Distance can be a mercy, too.",
    journalPrompt: "What did distance protect in you that staying could not?",
    sendableText:
      "Distance is not always bitterness. Sometimes it is the first clean breath. I hope you heal from the guilt of choosing peace over access.",
  },
  {
    id: "note-the-body-remembers",
    categorySlug: "the-body-remembers",
    title: "The body remembers",
    mainText: `Your body kept notes\nwhen your mouth could not.\n\nThe tight shoulders.\nThe quick breath.\nThe flinch at small sounds.\nThe tired that sleep did not touch.\n\nNothing about that\nmeans you are weak.\n\nIt means\nsomething happened\nand your body believed\nit had to stay ready.\n\nI hope you heal\ninto a body\nthat does not have to brace\nfor every hour.`,
    receiptFrom: "The survival response that kept working after the danger changed.",
    receiptTo: "The body that deserves gentleness instead of punishment.",
    receiptDate: "The first breath that reaches all the way down.",
    receiptTotal: "Your body is not betraying you. It is remembering for you.",
    journalPrompt: "Where does your body still hold what your mind has tried to move on from?",
    sendableText:
      "Your body kept notes when your mouth could not. I hope you heal into a body that does not have to brace for every hour.",
  },
  {
    id: "note-grief-that-lives-in-habits",
    categorySlug: "grief-that-lives-in-habits",
    title: "Grief that lives in habits",
    mainText: `Grief is not always crying.\nSometimes\nit is reaching for a number\nyou already know will not answer.\n\nSometimes\nit is setting two plates in your mind.\nSaving a story.\nTurning to tell someone\nwho is no longer here.\n\nI hope you heal\nfrom the routines\nthat still expect\nwhat your life had to lose.`,
    receiptFrom: "The ordinary moments that still arrive with absence inside them.",
    receiptTo: "The version of love that keeps remembering anyway.",
    receiptDate: "Every day you miss them in a new language.",
    receiptTotal: "Grief often returns disguised as habit.",
    journalPrompt: "What small habit still carries the shape of who or what you lost?",
    sendableText:
      "Grief is not always crying. Sometimes it is reaching for a number you already know will not answer. I hope you heal from the routines that still expect what your life had to lose.",
  },
  {
    id: "note-shame-got-there-first",
    categorySlug: "shame-got-there-first",
    title: "Shame got there first",
    mainText: `You needed help.\nBut before the words could form,\nshame sat down first.\n\nIt told you\nnot to be difficult.\nNot to be needy.\nNot to make your pain\nsomeone else’s work.\n\nI hope you heal\nfrom the lie\nthat needing care\nmakes you harder to love.`,
    receiptFrom: "Every time you minimized a real need to stay easy to hold.",
    receiptTo: "The part of you that deserved help without earning it.",
    receiptDate: "The first ask that leaves your mouth without apology.",
    receiptTotal: "Need is human. Shame just got there first.",
    journalPrompt: "What did you need that shame convinced you to hide?",
    sendableText:
      "You needed help. But before the words could form, shame sat down first. I hope you heal from the lie that needing care makes you harder to love.",
  },
  {
    id: "note-the-apology-that-never-came",
    categorySlug: "the-apology-that-never-came",
    title: "The apology that never came",
    mainText: `Some wounds healed\nwithout closure.\n\nNot because\nwhat happened was small.\nBut because\nyou could not keep\nwaiting at the same locked door.\n\nI hope you heal\nfrom believing\nthat your peace\nmust arrive\nthrough their understanding.`,
    receiptFrom: "The explanation you deserved and never received.",
    receiptTo: "The self who learned to stop building home in maybe.",
    receiptDate: "The day you stop waiting for accountability to authorize your healing.",
    receiptTotal: "Closure is not always given. Sometimes it is chosen.",
    journalPrompt: "What would you stop carrying if you no longer waited for their apology?",
    sendableText:
      "Some wounds healed without closure. I hope you heal from believing that your peace must arrive through their understanding.",
  },
  {
    id: "note-remember-who-you-are",
    categorySlug: "remember-who-you-are",
    title: "Remember who you are",
    mainText: `There are days\nlife speaks so harshly\nyou forget your own name\ninside it.\n\nOn those days,\nplease remember:\nfatigue is not failure.\nStarting over is not shame.\nBeing tired of hurting\nis not the same\nas being finished.\n\nI hope you heal\ninto the version of yourself\nthat still knows\nyou are worth staying for.`,
    receiptFrom: "The chapter that tried to convince you the story was over.",
    receiptTo: "The self still waiting for you on the other side of this day.",
    receiptDate: "Right now. this breath. this choice.",
    receiptTotal: "Your next move matters more than your last mistake.",
    journalPrompt: "What part of you needs to be remembered before you can keep going?",
    sendableText:
      "Being tired of hurting is not the same as being finished. I hope you heal into the version of yourself that still knows you are worth staying for.",
  },
  {
    id: "note-people-who-wanted-your-fall",
    categorySlug: "people-who-wanted-your-fall",
    title: "People who wanted your fall",
    mainText: `Some people only liked you\nwhen you were easier to overlook.\n\nThey called your healing pride.\nYour distance disrespect.\nYour rebuilding selfishness.\n\nBut your growth\nwas never an attack.\n\nI hope you heal\nfrom the eyes\nthat watched your rise\nlike it was something\nyou owed them to avoid.`,
    receiptFrom: "Every room that welcomed your struggle more than your becoming.",
    receiptTo: "The future that does not shrink to keep others comfortable.",
    receiptDate: "The moment you stop performing smallness for people committed to misunderstanding you.",
    receiptTotal: "Their judgment was never proof that you were wrong to rise.",
    journalPrompt: "Where have you been making yourself smaller so other people feel safer?",
    sendableText:
      "Some people only liked you when you were easier to overlook. I hope you heal from the eyes that watched your rise like it was something you owed them to avoid.",
  },
];

export const collections: CollectionEntry[] = [
  {
    id: "volume-1",
    title: "The Note You Needed Today, Volume 1:",
    subtitle: "The Things We Do Not Say Out Loud",
    description:
      "A digital collection of emotional notes, mobile wallpapers, captions, journal prompts, and private letters for people healing quietly, starting over, grieving privately, feeling unseen, or carrying things they do not always know how to say.",
    contents: [
      "15 designed notes",
      "15 mobile wallpapers",
      "15 captions",
      "15 journal prompts",
      "5 private letters",
    ],
    ctaLabel: "Get Volume 1",
    ctaHref: "https://selar.com",
  },
  {
    id: "words-that-stayed",
    title: "The Words That Stayed",
    subtitle: "For the sentences that broke something in you.",
    description: "Coming soon",
    comingSoon: true,
  },
  {
    id: "distance-healing",
    title: "Distance Is Also Healing",
    subtitle: "For boundaries, silence, and taking your presence back.",
    description: "Coming soon",
    comingSoon: true,
  },
  {
    id: "body-remembers",
    title: "The Body Remembers",
    subtitle: "For anxiety, grief, fear, and survival that live beneath the skin.",
    description: "Coming soon",
    comingSoon: true,
  },
  {
    id: "days-you-almost-gave-up",
    title: "For the Days You Almost Gave Up",
    subtitle: "For starting over, regret, identity, and remembering who you are.",
    description: "Coming soon",
    comingSoon: true,
  },
];

export const notesByCategory = Object.fromEntries(
  notes.map((note) => [note.categorySlug, note]),
) as Record<string, NoteEntry>;

export const notesById = Object.fromEntries(notes.map((note) => [note.id, note])) as Record<
  string,
  NoteEntry
>;

export const featuredNote = notesByCategory["im-fine-but-not-really"];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getNoteByCategorySlug(slug: string) {
  return notes.find((note) => note.categorySlug === slug);
}

export function getNoteById(id: string) {
  return notesById[id];
}

export function getSimilarNotes(categorySlug: string) {
  return notes.filter((note) => note.categorySlug !== categorySlug).slice(0, 3);
}

export function getFirstLine(text: string) {
  return text.split("\n").find(Boolean) ?? "";
}
