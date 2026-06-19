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
  socialExcerpt?: string;
  publicHook?: string;
  shortCaption?: string;
  longCaption?: string;
  // Short receipt fields for visual exports — full receipt still shown on note pages
  shortReceiptFrom?: string;
  shortReceiptTo?: string;
  shortReceiptDate?: string;
  shortReceiptTotal?: string;
}

export interface CollectionEntry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  contents?: string[];
  price?: string;
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
  {
    slug: "people-who-watched-you-bleed",
    title: "The People Who Watched You Bleed",
    subtitle: "For the people who knew what you survived, saw what you carried, and still waited for the world to clap before they supported you.",
  },
];

export const notes: NoteEntry[] = [
  {
    id: "note-im-fine-but-not-really",
    categorySlug: "im-fine-but-not-really",
    title: "The Truth Was Too Heavy",
    mainText: `They asked,\n“How are you?”\nand this time,\nthey really meant it.\n\nThey looked at you\nlike they had space\nfor the truth.\n\nBut you still smiled.\nYou still said,\n“I’m fine.”\n\nNot because\nthey did not care.\nNot because\nthey would not stay.\n\nBecause the truth\nwas too heavy\nto carry out loud.\n\nI hope you\nheal from\nthe fear\nof being honest\nwith people\nwho are safe enough\nto hear you.`,
    receiptFrom:
      "Every time the truth climbed your throat and you swallowed it back down. every question you dodged with a smile. every night you cried alone because no one asked when you were ready to answer.",
    receiptTo:
      "One safe place. one person. one moment where you do not have to edit your pain.",
    receiptDate: "The first time someone asks and you do not flinch.",
    receiptTotal:
      "The tears you saved for the dark. they are not shame. they are just waiting for permission.",
    socialExcerpt: `They asked, "How are you?"\nand this time, they really meant it.\n\nBut you still smiled.\nYou still said, "I'm fine."\n\nBecause the truth\nwas too heavy\nto carry out loud.`,
    shortReceiptFrom: "Every truth you swallowed with a smile.",
    shortReceiptTo: "One safe place where you do not have to edit your pain.",
    shortReceiptDate: "The first time someone asks and you do not flinch.",
    shortReceiptTotal: "The tears you saved for the dark were never shame.",
    journalPrompt: "What truth reached your throat but never became words?",
    sendableText:
      "I found this and thought of you. You do not have to explain everything today. I just hope you find one safe place where the truth does not feel too heavy.",
  },
  {
    id: "note-the-words-that-stayed",
    categorySlug: "the-words-that-stayed",
    title: "The Sentence That Stayed",
    mainText: `I hope you\nheal from\nthe words\nthat stayed\nlong after\nthe person\nwho said them\nmoved on.\n\nThe sentence\nthey forgot\nbecame something\nyou had to carry.\n\nBut what they said\nwas never your name.`,
    receiptFrom: "Every sentence that entered your heart and started calling itself truth.",
    receiptTo: "The day your own voice becomes louder than what they said.",
    receiptDate: "The first time you remember it without becoming small again.",
    receiptTotal: "The wound was real, but it was never your name.",
    journalPrompt: "What sentence are you still trying to stop believing?",
    sendableText:
      "Some words stay too long. I hope one day your own voice becomes louder than what they said.",
  },
  {
    id: "note-the-pain-i-made-look-easy",
    categorySlug: "the-pain-i-made-look-easy",
    title: "The Pain You Made Look Easy",
    mainText: `I hope you\nheal from\nall the pain\nyou made\nlook easy.\n\nFrom the days\nyou smiled\nbecause explaining\nwould have taken\ntoo much strength.\n\nFrom the nights\nyou broke quietly\nand still woke up\nlike nothing happened.`,
    receiptFrom: "Every wound you dressed in strength so no one would worry.",
    receiptTo: "A life where surviving is not mistaken for being okay.",
    receiptDate: "The day you stop performing strength for people who never asked what it cost.",
    receiptTotal: "You carried it well, but that does not mean it was light.",
    journalPrompt: "Where have you been praised for strength when what you really needed was care?",
    sendableText:
      "You made pain look easy for too long. I hope you finally get the care you never asked for.",
  },
  {
    id: "note-distance-is-also-healing",
    categorySlug: "distance-is-also-healing",
    title: "Distance Is My New Answer",
    mainText: `Distance is my new answer\nto disrespect.\n\nI no longer react.\nI no longer argue.\nI no longer dive\ninto drama.\n\nI simply remove\nmy presence.\n\nBecause some people\nthrow cruelty carelessly,\nthen call you sensitive\nfor bleeding.\n\nI hope you heal\nfrom the people\nwho made your reaction\nthe problem\ninstead of their actions.`,
    receiptFrom: "Every argument that stole your peace.",
    receiptTo: "A silence that finally protects you.",
    receiptDate: "The day you stop explaining your absence.",
    receiptTotal: "Your presence, returned to you.",
    socialExcerpt: `Distance is my new answer\nto disrespect.\n\nI no longer react.\nI no longer argue.\nI no longer dive\ninto drama.\n\nI simply remove\nmy presence.`,
    shortReceiptFrom: "Every argument that stole your peace.",
    shortReceiptTo: "A silence that finally protects you.",
    shortReceiptTotal: "Your presence, returned to you.",
    journalPrompt: "Where do you need distance, not another explanation?",
    sendableText:
      "Sometimes distance is not pride. Sometimes it is the first time your peace becomes visible.",
  },
  {
    id: "note-the-body-remembers",
    categorySlug: "the-body-remembers",
    title: "The Unknown Number",
    mainText: `I hope you\nheal from\nthe unknown number\nthat makes\nyour stomach drop\nbefore you even answer.\n\nSome debts\nlive in the body,\nnot the bank.\n\nSome fear\narrives as a ringtone.`,
    receiptFrom: "Every ring that felt like a judge.",
    receiptTo: "A phone that only brings news you can handle.",
    receiptDate: "The first month you do not flinch.",
    receiptTotal: "Breathing through the whole day.",
    journalPrompt: "What does your body still react to before your mind can explain it?",
    sendableText:
      "Some fear lives quietly in the body. I hope your days become safe enough for you to breathe through them.",
  },
  {
    id: "note-grief-that-lives-in-habits",
    categorySlug: "grief-that-lives-in-habits",
    title: "Grief in Your Thumb",
    mainText: `I hope you\nheal from\nstill reaching for\nthe phone number\nyou know\nwill not answer.\n\nFrom the habit\nof wanting to tell them\none more thing.\n\nFrom the silence\nthat arrives\nafter memory\ndials first.`,
    receiptFrom: "Grief that lives in your thumb.",
    receiptTo: "A memory that no longer cuts.",
    receiptDate: "The first day love feels soft again.",
    receiptTotal: "Missing them without losing yourself.",
    journalPrompt: "What habit still carries someone you miss?",
    sendableText:
      "Grief has strange habits. I hope one day the memory becomes softer than the absence.",
  },
  {
    id: "note-shame-got-there-first",
    categorySlug: "shame-got-there-first",
    title: "When Shame Got There First",
    mainText: `I hope you\nheal from\nthe moments\nyou needed help\nbut chose silence\nbecause shame\ngot there first.\n\nFrom every time\nyour mouth opened,\nthen closed again\nbecause needing help\nfelt like failure.`,
    receiptFrom: "Every prayer you whispered instead of asking someone.",
    receiptTo: "A hand that reaches before you collapse.",
    receiptDate: "The day help stops feeling like humiliation.",
    receiptTotal: "You deserved support before survival became your only language.",
    journalPrompt: "What help did you need before shame convinced you to stay silent?",
    sendableText:
      "Needing help was never the shame. Carrying everything alone was never supposed to be your proof of strength.",
  },
  {
    id: "note-the-apology-that-never-came",
    categorySlug: "the-apology-that-never-came",
    title: "The Apology That Never Came",
    mainText: `I hope you\nheal from\nwaiting for\nthe apology\nthat never came.\n\nFrom checking\ntheir silence\nlike maybe\nremorse\nwas still on the way.\n\nSome people\nwill never name\nwhat they did.\n\nYou still deserve\nto be free.`,
    receiptFrom: "Every wound that had to heal without a confession.",
    receiptTo: "A life that no longer waits for their honesty.",
    receiptDate: "The day closure stops needing their permission.",
    receiptTotal: "Your peace, even without their apology.",
    journalPrompt: "What are you still waiting for them to admit?",
    sendableText:
      "Some apologies never come. I hope your freedom does not have to wait for their courage.",
  },
  {
    id: "note-remember-who-you-are",
    categorySlug: "remember-who-you-are",
    title: "Remember Who You Are",
    mainText: `Always remind yourself\nof who you are.\n\nEspecially on the days\nlife makes you feel\nlike giving up.\n\nLook back.\n\nNot to stay there.\nBut to remember\nhow far you have walked\nwith wounds\nnobody saw.\n\nI hope you heal\nfrom the moments\nthat made you forget\nyour own strength.`,
    receiptFrom: "Every version of you that survived what almost broke you.",
    receiptTo: "The person you are still becoming.",
    receiptDate: "The day you remember you did not come this far by accident.",
    receiptTotal: "Your story is not over. You are still here.",
    journalPrompt: "What part of your story proves you are stronger than this moment?",
    sendableText:
      "Please remember who you are. Not because life is easy, but because you have already survived more than this moment can see.",
  },
  {
    id: "note-people-who-wanted-your-fall",
    categorySlug: "people-who-wanted-your-fall",
    title: "They Never Saw Your Road",
    mainText: `I hope you\nheal from\nthe people\nwho wish\nfor your fall\nwithout knowing\nthe graves\nyou walked past\nto get here.\n\nThey saw you standing.\nThey never saw\nwhat tried\nto bury you.`,
    receiptFrom:
      "The nights you cried when no one was watching. the days you smiled through pain. the times you started over with nothing but hope.",
    receiptTo: "A single moment of peace without someone wishing you would fail.",
    receiptDate: "The day someone says “I see your struggle” instead of “you do not belong.”",
    receiptTotal:
      "Every step you took when the ground was shaking beneath you. you cannot judge what you have not carried.",
    journalPrompt: "What part of your journey do people judge because they never had to carry it?",
    sendableText:
      "People may see where you are, but they do not always see what it cost you to stand there.",
  },
  {
    id: "note-people-who-watched-you-bleed",
    categorySlug: "people-who-watched-you-bleed",
    title: "Do It Anyway",
    mainText: `I hope you heal from\nthe people who knew your story\nbut still waited for strangers to clap\nbefore they supported you.\n\nThey knew what you survived.\n\nThey knew what you carried.\n\nThey knew the pit you crawled out of.\n\nAnd still, they waited.\n\nThey waited until money validated you.\n\nThey waited until the world\nstarted calling you successful.\n\nThey waited until it became safe\nto say they always believed in you.\n\nDo it anyway.\n\nStop expecting recognition\nfrom people who watched you bleed\nand still chose silence.\n\nBecome your own witness.\n\nYour own proof.\n\nYour own reason to keep going.\n\nBecause the dream was never given to the crowd.\n\nIt was given to you.`,
    receiptFrom: "Every silent room where you expected support and received distance.",
    receiptTo: "The day you stop needing witnesses before you believe yourself.",
    receiptDate: "The moment you choose the dream without waiting for applause.",
    receiptTotal: "Your proof was never their permission. Keep going.",
    socialExcerpt: `Do it anyway.\n\nStop expecting recognition\nfrom people who watched you bleed\nand still chose silence.\n\nBecome your own witness.\nYour own proof.\nYour own reason to keep going.\n\nBecause the dream was never given to the crowd.\nIt was given to you.`,
    shortReceiptFrom: "Every silent room where you expected support and received distance.",
    shortReceiptTo: "The day you stop needing witnesses before you believe yourself.",
    shortReceiptTotal: "Your proof was never their permission. Keep going.",
    journalPrompt: "Where have you been waiting for recognition from people who already saw enough to support you?",
    sendableText:
      "Do it anyway.\n\nStop expecting recognition from people who watched you bleed and still chose silence.\n\nBecome your own witness.\nYour own proof.\nYour own reason to keep going.\n\nBecause the dream was never given to the crowd.\nIt was given to you.",
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
    price: "R149 launch price",
    ctaLabel: "Get Volume 1",
    ctaHref: "#volume-1-coming-soon",
    comingSoon: true,
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
