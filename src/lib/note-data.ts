export type EmotionalIntensity = "low" | "medium" | "heavy" | "crisisAdjacent";
export type VolumeChapter =
  | "Unsaid Grief"
  | "Quiet Anger"
  | "Survival"
  | "Starting Over"
  | "Becoming Visible";

export interface StorySpine {
  wound: string;
  witness: string;
  way: string;
}

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
  // Social sharing
  shareExcerpt: string;
  hookLine: string;
  // Legacy — prefer shareExcerpt / hookLine above
  socialExcerpt?: string;
  publicHook?: string;
  // Caption fields
  shortCaption?: string;
  longCaption?: string;
  // Short receipt fields for visual exports — full receipt still shown on note pages
  shortReceiptFrom?: string;
  shortReceiptTo?: string;
  shortReceiptDate?: string;
  shortReceiptTotal?: string;
  // Editorial architecture (internal)
  storySpine: StorySpine;
  emotionalIntensity: EmotionalIntensity;
  volumeChapter: VolumeChapter;
  // Safety
  safetyNote?: boolean;
  needsSafetyCue?: boolean;
  safetyCueText?: string;
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
    title: "I'm fine, but not really",
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
  {
    slug: "money-that-never-stretched",
    title: "The Money That Never Stretched",
    subtitle: "For the months that asked you to become a miracle worker.",
  },
  {
    slug: "job-that-ended",
    title: "The Job That Ended",
    subtitle: "For the morning after the role ended before your heart was ready to leave.",
  },
  {
    slug: "marriage-that-became-a-memory",
    title: "The Marriage That Became a Memory",
    subtitle: "For the future you had to grieve when the relationship changed shape.",
  },
  {
    slug: "love-that-left",
    title: "The Love That Left",
    subtitle: "For the love that left before your heart knew how to let go.",
  },
  {
    slug: "family-that-hurt",
    title: "The Family That Hurt",
    subtitle: "For the pain people told you not to name because it came from family.",
  },
  {
    slug: "loneliness-no-one-sees",
    title: "The Loneliness No One Sees",
    subtitle: "For the loneliness people cannot see because you still know how to function.",
  },
  {
    slug: "dream-that-delayed",
    title: "The Dream That Delayed",
    subtitle: "For the dream that has taken longer than your heart expected.",
  },
  {
    slug: "body-is-tired",
    title: "The Body Is Tired",
    subtitle: "For the tiredness that rest alone could not explain.",
  },
  {
    slug: "when-staying-feels-hard",
    title: "When Staying Feels Hard",
    subtitle: "For the hour that feels too heavy to carry alone.",
  },
];

export const notes: NoteEntry[] = [
  {
    id: "note-im-fine-but-not-really",
    categorySlug: "im-fine-but-not-really",
    title: "The Truth Was Too Heavy",
    hookLine:
      "This is for the person who, when someone finally asked how they really were, took a breath — and said \"I'm fine\" anyway.",
    mainText: `They asked,\n"How are you?"\nand this time,\nthey really meant it.\n\nThey looked at you\nlike they had space\nfor the truth.\n\nBut you still smiled.\nYou still said,\n"I'm fine."\n\nNot because\nthey did not care.\nNot because\nthey would not stay.\n\nBecause the truth\nwas too heavy\nto carry out loud.\n\nI hope you\nheal from\nthe fear\nof being honest\nwith people\nwho are safe enough\nto hear you.`,
    shareExcerpt: `They asked, "How are you?"\nand this time, they really meant it.\n\nBut you still smiled.\nYou still said, "I'm fine."\n\nBecause the truth\nwas too heavy\nto carry out loud.\n\nI hope you find one safe place\nwhere you do not have to edit your pain.`,
    storySpine: {
      wound: "The truth was too heavy to carry out loud",
      witness: "You kept it swallowed even when someone offered space for it",
      way: "One safe place where you do not have to edit your pain",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Unsaid Grief",
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
    hookLine:
      "This is for the person still carrying a sentence someone said years ago — in a room that no longer exists, to a version of themselves they are still trying to outgrow.",
    mainText: `I hope you\nheal from\nthe words\nthat stayed\nlong after\nthe person\nwho said them\nmoved on.\n\nThe sentence\nthey forgot\nbecame something\nyou had to carry.\n\nBut what they said\nwas never your name.`,
    shareExcerpt: `I hope you heal from the words\nthat stayed long after\nthe person who said them moved on.\n\nThe sentence they forgot\nbecame something you had to carry.\n\nBut what they said\nwas never your name.`,
    storySpine: {
      wound: "A sentence someone forgot became something you had to carry as truth",
      witness: "You were shaped by words that were never meant to define you",
      way: "What they said was never your name",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Unsaid Grief",
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
    hookLine:
      "This is for the person who broke quietly last night and woke up this morning like nothing happened.",
    mainText: `I hope you\nheal from\nall the pain\nyou made\nlook easy.\n\nFrom the days\nyou smiled\nbecause explaining\nwould have taken\ntoo much strength.\n\nFrom the nights\nyou broke quietly\nand still woke up\nlike nothing happened.`,
    shareExcerpt: `I hope you heal from all the pain\nyou made look easy.\n\nFrom the nights you broke quietly\nand still woke up like nothing happened.\n\nYou carried it well.\nThat does not mean it was light.`,
    storySpine: {
      wound: "You hid pain in strength because explaining would have cost more than carrying it",
      witness: "You kept performing okay while nobody saw what it took",
      way: "You are allowed to receive the care you kept giving everyone else",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Survival",
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
    hookLine:
      "This is for the person who stopped arguing back and let the silence speak instead — and then wondered if that made them the problem.",
    mainText: `Distance is my new answer\nto disrespect.\n\nI no longer react.\nI no longer argue.\nI no longer dive\ninto drama.\n\nI simply remove\nmy presence.\n\nBecause some people\nthrow cruelty carelessly,\nthen call you sensitive\nfor bleeding.\n\nI hope you heal\nfrom the people\nwho made your reaction\nthe problem\ninstead of their actions.`,
    shareExcerpt: `Distance is my new answer\nto disrespect.\n\nI no longer react.\nI no longer argue.\nI simply remove my presence.\n\nBecause some people throw cruelty carelessly,\nthen call you sensitive for bleeding.`,
    storySpine: {
      wound: "Some people called your reaction the problem instead of their cruelty",
      witness: "You removed your presence and called it peace instead of punishment",
      way: "Distance is not punishment. It is protection.",
    },
    emotionalIntensity: "low",
    volumeChapter: "Starting Over",
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
    hookLine:
      "This is for the person whose stomach drops when an unknown number calls — even when they have done nothing wrong.",
    mainText: `I hope you\nheal from\nthe unknown number\nthat makes\nyour stomach drop\nbefore you even answer.\n\nSome debts\nlive in the body,\nnot the bank.\n\nSome fear\narrives as a ringtone.`,
    shareExcerpt: `I hope you heal from the unknown number\nthat makes your stomach drop\nbefore you even answer.\n\nSome debts live in the body, not the bank.\nSome fear arrives as a ringtone.\n\nI hope your days become safe enough to breathe through.`,
    storySpine: {
      wound: "Financial fear learned to live in the body as a ringtone, a balance check, a held breath",
      witness: "You carried dread in your body that never showed on your face",
      way: "One month at a time, the body can learn a different response",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Survival",
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
    hookLine:
      "This is for the person who reached for their phone to call someone, got halfway through dialing, and remembered.",
    mainText: `I hope you\nheal from\nstill reaching for\nthe phone number\nyou know\nwill not answer.\n\nFrom the habit\nof wanting to tell them\none more thing.\n\nFrom the silence\nthat arrives\nafter memory\ndials first.`,
    shareExcerpt: `I hope you heal from still reaching for\nthe phone number you know will not answer.\n\nFrom the habit of wanting to tell them one more thing.\nFrom the silence that arrives after memory dials first.\n\nGrief has strange habits.\nI hope the memory becomes softer than the absence.`,
    storySpine: {
      wound: "Grief lives in the thumb, in the habit of reaching for someone no longer there",
      witness: "You miss someone in the small daily moments nobody warned you about",
      way: "Memory can soften. The habit can become a gentle remembrance.",
    },
    emotionalIntensity: "heavy",
    volumeChapter: "Unsaid Grief",
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
    hookLine:
      "This is for the person who needed help, opened their mouth — and then closed it again, because shame got there first.",
    mainText: `I hope you\nheal from\nthe moments\nyou needed help\nbut chose silence\nbecause shame\ngot there first.\n\nFrom every time\nyour mouth opened,\nthen closed again\nbecause needing help\nfelt like failure.`,
    shareExcerpt: `I hope you heal from the moments you needed help\nbut chose silence because shame got there first.\n\nFrom every time your mouth opened,\nthen closed again,\nbecause needing help felt like failure.\n\nYou deserved support\nbefore survival became your only language.`,
    storySpine: {
      wound: "Shame arrived before the words could and sealed the mouth shut",
      witness: "You chose silence over humiliation, and it cost you more than people know",
      way: "Needing help is not failure. You deserved support before survival became your only language.",
    },
    emotionalIntensity: "heavy",
    volumeChapter: "Unsaid Grief",
    needsSafetyCue: true,
    safetyCueText:
      "If this brought up something heavy, please pause here. You do not have to carry it alone. Visit Safety & Support or reach out to someone you trust.",
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
    hookLine:
      "This is for the person still quietly checking the silence of someone who hurt them, half-hoping remorse is still on the way.",
    mainText: `I hope you\nheal from\nwaiting for\nthe apology\nthat never came.\n\nFrom checking\ntheir silence\nlike maybe\nremorse\nwas still on the way.\n\nSome people\nwill never name\nwhat they did.\n\nYou still deserve\nto be free.`,
    shareExcerpt: `I hope you heal from waiting for\nthe apology that never came.\n\nSome people will never name what they did.\n\nYou still deserve to be free.\n\nYour peace does not have to wait for their courage.`,
    storySpine: {
      wound: "A wound that never got a confession has to heal without permission",
      witness: "You kept checking their silence for something they were never going to give you",
      way: "Closure does not need their permission. Your peace does not wait for their courage.",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Unsaid Grief",
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
    hookLine:
      "This is for the person standing in a hard week who has quietly forgotten how many hard weeks they have already survived.",
    mainText: `Always remind yourself\nof who you are.\n\nEspecially on the days\nlife makes you feel\nlike giving up.\n\nLook back.\n\nNot to stay there.\nBut to remember\nhow far you have walked\nwith wounds\nnobody saw.\n\nI hope you heal\nfrom the moments\nthat made you forget\nyour own strength.`,
    shareExcerpt: `Always remind yourself of who you are.\n\nEspecially on the days life makes you feel like giving up.\n\nLook back.\nNot to stay there.\nBut to remember how far you have walked\nwith wounds nobody saw.\n\nYou did not come this far by accident.`,
    storySpine: {
      wound: "Life made you forget your own strength in the middle of carrying it",
      witness: "You have walked further than most people know, with wounds nobody saw",
      way: "Look back — not to stay there, but to remember you did not come this far by accident",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Becoming Visible",
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
    hookLine:
      "This is for the person who made it — and is now watching the same people who doubted them act like they always believed.",
    mainText: `I hope you\nheal from\nthe people\nwho wish\nfor your fall\nwithout knowing\nthe graves\nyou walked past\nto get here.\n\nThey saw you standing.\nThey never saw\nwhat tried\nto bury you.`,
    shareExcerpt: `I hope you heal from the people\nwho wished for your fall\nwithout knowing the graves\nyou walked past to get here.\n\nThey saw you standing.\nThey never saw what tried to bury you.\n\nYou cannot judge what you have not carried.`,
    storySpine: {
      wound: "People judged your standing without ever seeing the road that brought you there",
      witness: "You climbed past people who watched and hoped you would not make it",
      way: "You cannot judge what you have not carried. Keep going regardless.",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Becoming Visible",
    receiptFrom:
      "The nights you cried when no one was watching. the days you smiled through pain. the times you started over with nothing but hope.",
    receiptTo: "A single moment of peace without someone wishing you would fail.",
    receiptDate: "The day someone says \"I see your struggle\" instead of \"you do not belong.\"",
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
    hookLine:
      "This is for the person whose closest people waited for strangers to clap before they showed up — and then acted like they were always there.",
    mainText: `I hope you heal from\nthe people who knew your story\nbut still waited for strangers to clap\nbefore they supported you.\n\nThey knew what you survived.\n\nThey knew what you carried.\n\nThey knew the pit you crawled out of.\n\nAnd still, they waited.\n\nThey waited until money validated you.\n\nThey waited until the world\nstarted calling you successful.\n\nThey waited until it became safe\nto say they always believed in you.\n\nDo it anyway.\n\nStop expecting recognition\nfrom people who watched you bleed\nand still chose silence.\n\nBecome your own witness.\n\nYour own proof.\n\nYour own reason to keep going.\n\nBecause the dream was never given to the crowd.\n\nIt was given to you.`,
    shareExcerpt: `Do it anyway.\n\nStop expecting recognition\nfrom people who watched you bleed\nand still chose silence.\n\nBecome your own witness.\nYour own proof.\nYour own reason to keep going.\n\nBecause the dream was never given to the crowd.\nIt was given to you.`,
    storySpine: {
      wound: "The people who knew your story most still waited for the crowd to confirm it before believing you",
      witness: "You kept building in rooms where your closest people stayed silent",
      way: "Become your own witness. The dream was never given to the crowd.",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Becoming Visible",
    socialExcerpt: `Do it anyway.\n\nStop expecting recognition\nfrom people who watched you bleed\nand still chose silence.\n\nBecome your own witness.\nYour own proof.\nYour own reason to keep going.\n\nBecause the dream was never given to the crowd.\nIt was given to you.`,
    shortReceiptFrom: "Every silent room where you expected support and received distance.",
    shortReceiptTo: "The day you stop needing witnesses before you believe yourself.",
    shortReceiptTotal: "Your proof was never their permission. Keep going.",
    receiptFrom: "Every silent room where you expected support and received distance.",
    receiptTo: "The day you stop needing witnesses before you believe yourself.",
    receiptDate: "The moment you choose the dream without waiting for applause.",
    receiptTotal: "Your proof was never their permission. Keep going.",
    journalPrompt: "Where have you been waiting for recognition from people who already saw enough to support you?",
    sendableText:
      "Do it anyway.\n\nStop expecting recognition from people who watched you bleed and still chose silence.\n\nBecome your own witness.\nYour own proof.\nYour own reason to keep going.\n\nBecause the dream was never given to the crowd.\nIt was given to you.",
  },
  {
    id: "note-money-that-never-stretched",
    categorySlug: "money-that-never-stretched",
    title: "You Were Not Careless",
    hookLine:
      "This is for the person who checks their bank balance before buying bread — and still smiles normally at the checkout.",
    mainText: `I hope you heal from the shame of counting money that was never enough.\n\nFrom checking your balance before buying bread.\n\nFrom knowing exactly how much is in your account because your peace has been living inside numbers.\n\nFrom pretending you are managing when you are really deciding which problem can wait until next week.\n\nPeople say money is not everything.\n\nBut they do not always understand that sometimes money is sleep.\n\nMoney is dignity.\n\nMoney is answering your phone without fear.\n\nMoney is not rehearsing an apology before someone asks for what you owe.\n\nMoney is walking into a shop without doing mathematics in your chest.\n\nYou have made small money perform miracles.\n\nYou have stretched what was already thin.\n\nYou have gone without and still looked normal.\n\nYou have smiled in rooms while calculating whether you can afford to get home.\n\nAnd the cruelest part is that people may still call it irresponsibility when they never saw how many times you chose survival over comfort.\n\nI hope you heal from blaming yourself for a life that kept asking you to carry more than the money could hold.\n\nI hope one day money stops feeling like proof of your worth.\n\nI hope one day your body no longer tightens when you hear the word "due."\n\nI hope one day you have enough to breathe.`,
    shareExcerpt: `You have smiled in rooms while calculating whether you can afford to get home.\n\nYou have made small money perform miracles.\nYou have gone without and still looked normal.\n\nYou were not careless.\nYou were carrying more than the money could hold.`,
    storySpine: {
      wound: "Financial pressure lived in the body as mathematics in the chest and silence at the dinner table",
      witness: "You made small money perform miracles and still looked like everything was fine",
      way: "This was not carelessness. This was carrying more than money could hold.",
    },
    emotionalIntensity: "heavy",
    volumeChapter: "Survival",
    receiptFrom: "Every month that asked you to become a miracle worker.",
    receiptTo: "The part of you that felt ashamed for not having enough.",
    receiptDate: "The first day you stop calling survival a failure.",
    receiptTotal: "You were not careless. You were carrying more than the money could hold.",
    shortReceiptFrom: "Every month that asked you to become a miracle worker.",
    shortReceiptTo: "The part of you that felt ashamed for not having enough.",
    shortReceiptTotal: "You were not careless. You were carrying more than the money could hold.",
    journalPrompt: "Where have you been blaming yourself for financial pressure that was bigger than your choices?",
    sendableText: "I found this and thought of you.\n\nYou were not careless. You were carrying more than the money could hold.",
    socialExcerpt: "You were not careless. You were carrying more than the money could hold.",
    publicHook: "For the month that asked you to become a miracle worker.",
  },
  {
    id: "note-job-that-ended",
    categorySlug: "job-that-ended",
    title: "The Role Ended. You Did Not.",
    hookLine:
      "This is for the person whose alarm still woke them at the usual time on the morning after the job ended.",
    mainText: `I hope you heal from the morning after the job ended.\n\nThe morning when the alarm still knew your old life.\n\nThe morning your body woke up like it had somewhere to be, but your world had already changed.\n\nPeople may tell you to update your CV.\n\nTo network.\n\nTo stay positive.\n\nTo see it as redirection.\n\nAnd maybe one day you will.\n\nBut first, someone should say the truth.\n\nIt was not just a job.\n\nIt was your routine.\n\nYour answer when people asked what you do.\n\nYour proof that you were useful somewhere.\n\nYour way of paying bills without explaining yourself.\n\nYour place in the world, even if it was not perfect.\n\nSo when it ended, something in you lost its shape.\n\nNot your whole life.\n\nNot your value.\n\nBut something.\n\nAnd you are allowed to grieve that.\n\nYou are allowed to miss the emails, the access card, the desk, the salary, the small certainty of knowing where your mornings belonged.\n\nYou are allowed to feel embarrassed.\n\nYou are allowed to feel angry.\n\nYou are allowed to feel scared.\n\nLosing work can make a person feel like they have lost permission to stand tall.\n\nI hope you heal from tying your worth to a title that was never big enough to hold your whole life.\n\nI hope you find work again.\n\nBut before that, I hope you remember that your usefulness did not end when the role did.`,
    shareExcerpt: `It was not just a job.\n\nIt was your routine.\nYour answer when people asked what you do.\nYour proof that you were useful somewhere.\n\nThe role ended.\nYou did not.`,
    storySpine: {
      wound: "The job was not just income. It was identity, routine, and permission to stand tall.",
      witness: "You lost your place in the world and were told to update your CV the same week",
      way: "Your usefulness did not end when the role did.",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Starting Over",
    receiptFrom: "The door that closed before you were ready.",
    receiptTo: "The version of you learning how to stand without the title.",
    receiptDate: "The morning you realize your usefulness did not end with the job.",
    receiptTotal: "The role ended. You did not.",
    shortReceiptFrom: "The door that closed before you were ready.",
    shortReceiptTo: "The version of you learning how to stand without the title.",
    shortReceiptTotal: "The role ended. You did not.",
    journalPrompt: "What part of your identity did that job carry for you?",
    sendableText: "I found this and thought of you.\n\nThe role ended. You did not.",
    socialExcerpt: "The role ended. You did not.",
    publicHook: "For the job that ended before your heart was ready to leave.",
  },
  {
    id: "note-marriage-that-became-a-memory",
    categorySlug: "marriage-that-became-a-memory",
    title: "It Ended, But It Was Not Nothing",
    hookLine:
      "This is for the person now answering questions about paperwork for a life that used to be their home.",
    mainText: `I hope you heal from the silence after a marriage changes shape.\n\nBecause people will ask what happened.\n\nThey will ask who was wrong.\n\nThey will ask whether there is still hope.\n\nThey will ask about papers, houses, children, family, and what comes next.\n\nBut very few people ask what it feels like to become a stranger to a life you once called home.\n\nMarriage is not only love.\n\nIt is shared towels.\n\nShared bills.\n\nShared beds.\n\nShared names in people's mouths.\n\nShared jokes no one else understands.\n\nShared plans that once sounded so certain.\n\nIt is someone knowing how you take your tea.\n\nIt is ordinary things becoming sacred because they belonged to two people.\n\nSo when it breaks, you do not only lose the person.\n\nYou lose the future you had already rehearsed.\n\nThe house you imagined.\n\nThe children you planned.\n\nThe old age you thought you would reach together.\n\nThe version of yourself that believed this would last.\n\nSo no, you are not dramatic for grieving something other people now discuss like paperwork.\n\nYou are grieving a covenant.\n\nA rhythm.\n\nA room.\n\nA name you thought would always sound like home.\n\nI hope you heal from the shame of loving something that could not stay whole.\n\nI hope you release without erasing.\n\nI hope you remember that a marriage becoming a memory does not mean your heart became a mistake.`,
    shareExcerpt: `When it breaks, you do not only lose the person.\n\nYou lose the future you had already rehearsed.\nThe house you imagined.\nThe old age you thought you would reach together.\n\nIt ended, but it was not nothing.`,
    storySpine: {
      wound: "You lost not just a person but the entire future you had already rehearsed together",
      witness: "You are grieving a covenant, a rhythm, a room, a name — while people ask about the paperwork",
      way: "A marriage becoming a memory does not mean your heart became a mistake.",
    },
    emotionalIntensity: "heavy",
    volumeChapter: "Unsaid Grief",
    receiptFrom: "The home that stopped feeling like home.",
    receiptTo: "The heart learning how to release without erasing.",
    receiptDate: "The day you stop calling your grief an embarrassment.",
    receiptTotal: "It ended, but it was not nothing.",
    shortReceiptFrom: "The home that stopped feeling like home.",
    shortReceiptTo: "The heart learning how to release without erasing.",
    shortReceiptTotal: "It ended, but it was not nothing.",
    journalPrompt: "What future did you have to grieve quietly when the relationship changed?",
    sendableText: "I found this and thought of you.\n\nIt ended, but it was not nothing.",
    socialExcerpt: "It ended, but it was not nothing.",
    publicHook: "For the marriage that became a memory.",
  },
  {
    id: "note-love-that-left",
    categorySlug: "love-that-left",
    title: "Missing Them Is Not the Same as Needing Them Back",
    hookLine:
      "This is for the person whose chest is still waiting for a message from someone who stopped sending them.",
    mainText: `I hope you heal from the love that left before your heart knew how to let go.\n\nBecause some people do not only leave your life.\n\nThey leave your mornings different.\n\nYour phone quieter.\n\nYour plans unfinished.\n\nYour chest waiting for a message that is not coming.\n\nYour body checking places where they used to be.\n\nAnd the hardest part is not always that they left.\n\nSometimes the hardest part is that love stayed longer than they did.\n\nYou still remember their voice.\n\nTheir smell.\n\nTheir face when they were soft with you.\n\nThe small things nobody else knows how to replace.\n\nAnd now people expect you to move on as if love is a switch.\n\nAs if attachment obeys instructions.\n\nAs if the heart can forget just because the relationship ended.\n\nBut healing does not begin by pretending you no longer miss them.\n\nSometimes healing begins by admitting that you do.\n\nYou miss them.\n\nYou miss who you were with them.\n\nYou miss what you thought the two of you were becoming.\n\nThat does not mean you should go back.\n\nIt means you are human.\n\nI hope you heal from confusing missing them with needing them back.\n\nI hope memory becomes softer.\n\nI hope one day their name no longer feels like a door reopening inside you.`,
    shareExcerpt: `Some people do not only leave your life.\n\nThey leave your mornings different.\nYour phone quieter.\nYour chest waiting for a message that is not coming.\n\nMissing them is not the same as needing them back.\nThat does not mean you should go back.\nIt means you are human.`,
    storySpine: {
      wound: "Love stayed in the body long after the relationship ended and people expected you to move on",
      witness: "You miss who you were with them, not just who they were — and that is its own grief",
      way: "Missing them is not the same as needing them back. That distinction is the first space of healing.",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Unsaid Grief",
    receiptFrom: "The love that left but did not leave your body quickly.",
    receiptTo: "The part of you still checking for what is no longer coming.",
    receiptDate: "The first day memory stops feeling like a wound reopening.",
    receiptTotal: "Missing them is not the same as needing them back.",
    shortReceiptFrom: "The love that left but did not leave your body quickly.",
    shortReceiptTo: "The part of you still checking for what is no longer coming.",
    shortReceiptTotal: "Missing them is not the same as needing them back.",
    journalPrompt: "What do you still miss that you are afraid to admit?",
    sendableText: "I found this and thought of you.\n\nMissing them is not the same as needing them back.",
    socialExcerpt: "Missing them is not the same as needing them back.",
    publicHook: "For the love that left but stayed in your body.",
  },
  {
    id: "note-family-that-hurt",
    categorySlug: "family-that-hurt",
    title: "Honoring Family Should Not Require Abandoning Yourself",
    hookLine:
      "This is for the person who learned to stay quiet about their pain at the same kitchen table where the pain first started.",
    mainText: `I hope you heal from the pain people told you not to name because it came from family.\n\nBecause when family hurts you, the world often asks you to understand.\n\nTo forgive.\n\nTo be mature.\n\nTo remember they are still your blood.\n\nBut sometimes blood is where the wound began.\n\nSometimes home was the first place you learned to stay quiet.\n\nSometimes family was the first place you learned to apologize for having feelings.\n\nSometimes the people who should have made you feel safe were the first people who made you feel difficult to love.\n\nAnd you have spent years being fair to people who were not always gentle with you.\n\nYou explained their behavior.\n\nYou defended their limitations.\n\nYou carried their history.\n\nYou made excuses for the way they loved you badly.\n\nBut love does not stop being painful because it came from family.\n\nAnd pain does not become small because the person who caused it shares your blood.\n\nYou are allowed to name what happened.\n\nYou are allowed to need distance.\n\nYou are allowed to protect the version of yourself that nobody protected then.\n\nI hope you heal from calling self protection disrespect.\n\nI hope you stop abandoning yourself just to keep peace with people who never asked what their peace cost you.`,
    shareExcerpt: `I hope you heal from the pain people told you not to name because it came from family.\n\nSometimes blood is where the wound began.\n\nYou are allowed to name what happened.\nYou are allowed to protect the version of yourself\nthat nobody protected then.`,
    storySpine: {
      wound: "Family was where you first learned to minimize your own pain to keep the peace",
      witness: "You spent years being fair to people who were not always gentle with you",
      way: "Protecting yourself is not disrespect. It is the thing nobody protected you into.",
    },
    emotionalIntensity: "heavy",
    volumeChapter: "Unsaid Grief",
    needsSafetyCue: true,
    safetyCueText:
      "If this brought up something heavy, please pause. You do not have to process family pain alone. Stay close to someone you trust or visit Safety & Support.",
    receiptFrom: "The home that taught you to be quiet about your own pain.",
    receiptTo: "The child in you who still wonders why love felt unsafe.",
    receiptDate: "The day you stop calling self protection disrespect.",
    receiptTotal: "Family can explain the wound, but it does not excuse it.",
    shortReceiptFrom: "The home that taught you to be quiet about your own pain.",
    shortReceiptTo: "The child in you who still wonders why love felt unsafe.",
    shortReceiptTotal: "Family can explain the wound, but it does not excuse it.",
    journalPrompt: "What family pain have you minimized because you were told to understand?",
    sendableText: "I found this and thought of you.\n\nHonoring family should not require abandoning yourself.",
    socialExcerpt: "Honoring family should not require abandoning yourself.",
    publicHook: "For the family wound people told you not to name.",
  },
  {
    id: "note-loneliness-no-one-sees",
    categorySlug: "loneliness-no-one-sees",
    title: "You Were Not Hard to Love",
    hookLine:
      "This is for the person with a full phone and an empty feeling — who replies to everyone and still sits alone after the conversation ends.",
    mainText: `I hope you heal from the loneliness people cannot see because you still know how to function.\n\nBecause the hardest loneliness is not always an empty room.\n\nSometimes it is being surrounded by people who do not really know where you are inside yourself.\n\nPeople see you reply.\n\nThey see you laugh.\n\nThey see you show up.\n\nThey see you post.\n\nThey see you answer messages.\n\nThey see you keep moving.\n\nSo they assume you are fine.\n\nThey do not see the silence after the conversation ends.\n\nThey do not see how long you stare at your phone.\n\nThey do not see the part of you that wants someone to ask again, but differently.\n\nThey do not see how tired you are of being reachable but not really reached.\n\nYou are not lonely because nobody knows your name.\n\nYou are lonely because too few people know your weight.\n\nThe things you carry.\n\nThe things you avoid saying.\n\nThe truth behind your "I am okay."\n\nThe version of you that exists after everyone leaves.\n\nI hope you heal from having to collapse before people believe you needed someone.\n\nI hope one day you are known without performing pain.\n\nI hope someone sits beside your silence and does not rush to leave it.`,
    shareExcerpt: `I hope you heal from the loneliness people cannot see\nbecause you still know how to function.\n\nYou are not lonely because nobody knows your name.\nYou are lonely because too few people know your weight.\n\nYou were not hard to love.\nYou were hard to see from the surface.`,
    storySpine: {
      wound: "You are lonely not because nobody knows your name but because too few people know your weight",
      witness: "People see you functioning and assume you are fine. They do not see you after everyone leaves.",
      way: "You were not hard to love. You were hard to see from the surface.",
    },
    emotionalIntensity: "heavy",
    volumeChapter: "Unsaid Grief",
    needsSafetyCue: true,
    safetyCueText:
      "If this brought up something heavy, please pause. You do not have to carry loneliness alone. Stay close to someone or visit Safety & Support.",
    receiptFrom: "Every room where you were present but still unseen.",
    receiptTo: "The part of you waiting to be known without performing pain.",
    receiptDate: "The first time someone stays long enough to notice the silence.",
    receiptTotal: "You were not hard to love. You were hard to see from the surface.",
    shortReceiptFrom: "Every room where you were present but still unseen.",
    shortReceiptTo: "The part of you waiting to be known without performing pain.",
    shortReceiptTotal: "You were not hard to love. You were hard to see from the surface.",
    journalPrompt: "Where in your life do you feel surrounded but still unseen?",
    sendableText: "I found this and thought of you.\n\nYou were not hard to love. You were hard to see from the surface.",
    socialExcerpt: "You were not hard to love. You were hard to see from the surface.",
    publicHook: "For the loneliness people cannot see from the outside.",
  },
  {
    id: "note-dream-that-delayed",
    categorySlug: "dream-that-delayed",
    title: "Late Is Not Always Lost",
    hookLine:
      "This is for the person who still believes in the dream but is quietly embarrassed about how long it is taking.",
    mainText: `I hope you heal from the shame of still waiting for something you have worked so hard to become.\n\nBecause you are not always grieving failure.\n\nSometimes you are grieving delay.\n\nAnd delay has its own kind of heartbreak.\n\nYou can still believe in the dream and still be tired of waiting for it.\n\nYou can still know it is possible and still feel embarrassed that it has taken this long.\n\nYou can still be working hard and still feel like life is moving faster for everyone else.\n\nNobody tells you how heavy it is to carry a dream that keeps asking for more patience.\n\nMore faith.\n\nMore sacrifice.\n\nMore time.\n\nMore money.\n\nMore strength you are not sure you still have.\n\nAnd the hardest part is that people only celebrate dreams when they start looking successful.\n\nThey do not always see the years when the dream is still expensive.\n\nStill confusing.\n\nStill lonely.\n\nStill making you look foolish in rooms where results matter more than belief.\n\nBut delay is not always denial.\n\nSometimes delay is the place where the dream becomes honest.\n\nWhere you learn what part of it was ego.\n\nWhat part was calling.\n\nWhat part was pressure.\n\nWhat part was purpose.\n\nI hope you heal from measuring your calling only by speed.\n\nI hope you do not bury the dream just because it is late.\n\nBut I also hope you stop pretending the waiting has not hurt.`,
    shareExcerpt: `You can still believe in the dream\nand still be tired of waiting for it.\n\nNobody tells you how heavy it is\nto carry a dream that keeps asking for more patience.\n\nBut delay is not always denial.\nLate is not always lost.`,
    storySpine: {
      wound: "The dream kept asking for more patience, more time, more sacrifice than anyone warned you about",
      witness: "You kept going in rooms where results mattered more than belief",
      way: "Delay is not denial. Late is not always lost. Do not bury the dream just because it is late.",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Becoming Visible",
    receiptFrom: "The years that made your dream look like it was not working.",
    receiptTo: "The part of you still believing without enough evidence.",
    receiptDate: "The day you stop measuring purpose only by speed.",
    receiptTotal: "Late is not always lost.",
    shortReceiptFrom: "The years that made your dream look like it was not working.",
    shortReceiptTo: "The part of you still believing without enough evidence.",
    shortReceiptTotal: "Late is not always lost.",
    journalPrompt: "What dream are you still carrying that feels late but not dead?",
    sendableText: "I found this and thought of you.\n\nLate is not always lost.",
    socialExcerpt: "Late is not always lost.",
    publicHook: "For the dream that has taken longer than your heart expected.",
  },
  {
    id: "note-body-is-tired",
    categorySlug: "body-is-tired",
    title: "Your Body Was Not Weak. It Was Honest.",
    hookLine:
      "This is for the person who keeps pushing because people need them — while their own body quietly files a report they are not reading.",
    mainText: `I hope you heal from calling your body weak when it was only trying to tell the truth.\n\nYour body has been speaking for a long time.\n\nBut you kept calling it laziness.\n\nMood.\n\nExcuses.\n\nA bad week.\n\nA lack of discipline.\n\nYou kept pushing because people needed you.\n\nBecause bills did not pause.\n\nBecause children still needed care.\n\nBecause work still expected performance.\n\nBecause life kept asking for output from a body that was already running on warning signs.\n\nSo your body started speaking louder.\n\nThrough headaches.\n\nThrough heaviness.\n\nThrough sleep that did not restore you.\n\nThrough tears that arrived without permission.\n\nThrough irritation.\n\nThrough numbness.\n\nThrough the kind of tired that rest alone could not fix.\n\nMaybe your body is not betraying you.\n\nMaybe it is telling the truth your mouth kept editing.\n\nYou have carried too much for too long without enough softness.\n\nYou do not need to earn rest by breaking down first.\n\nYou do not need to collapse before you are allowed to stop.\n\nI hope you heal from treating exhaustion like a personal failure.\n\nI hope you listen before your body has to scream.`,
    shareExcerpt: `You kept calling it laziness.\nMood. Excuses. A bad week.\n\nBut your body was not betraying you.\nIt was telling the truth your mouth kept editing.\n\nYour body was not weak. It was honest.\nYou do not need to earn rest by breaking down first.`,
    storySpine: {
      wound: "You called exhaustion laziness and pushed past every warning sign your body sent",
      witness: "You kept producing output from a body that was already running on empty",
      way: "You do not need to earn rest by breaking down first.",
    },
    emotionalIntensity: "medium",
    volumeChapter: "Survival",
    receiptFrom: "The body that kept the score while you kept pretending.",
    receiptTo: "The part of you that thought exhaustion was a personal failure.",
    receiptDate: "The first time you listen before you collapse.",
    receiptTotal: "Your body was not weak. It was honest.",
    shortReceiptFrom: "The body that kept the score while you kept pretending.",
    shortReceiptTo: "The part of you that thought exhaustion was a personal failure.",
    shortReceiptTotal: "Your body was not weak. It was honest.",
    journalPrompt: "What has your body been trying to tell you that you keep explaining away?",
    sendableText: "I found this and thought of you.\n\nYour body was not weak. It was honest.",
    socialExcerpt: "Your body was not weak. It was honest.",
    publicHook: "For the tiredness that rest alone could not explain.",
  },
  {
    id: "note-when-staying-feels-hard",
    categorySlug: "when-staying-feels-hard",
    title: "You Do Not Have to Do This Alone",
    hookLine:
      "This is for the person for whom tonight feels too heavy to carry alone — and who needs one small place to land before doing anything else.",
    mainText: `I hope you stay close to help tonight.\n\nNot because you have to explain everything.\n\nNot because you have to be strong.\n\nNot because you have to turn this pain into a lesson before morning.\n\nJust because this moment is too heavy to carry alone.\n\nIf staying feels hard today, let this be one small place where you do not have to pretend.\n\nYou do not have to solve your whole life right now.\n\nYou do not have to become hopeful immediately.\n\nYou do not have to make the pain sound smaller than it is.\n\nYou do not have to apologize for needing someone.\n\nJust stay with the next breath.\n\nThen the next one.\n\nThen the next.\n\nThere are days when life becomes too loud inside the body.\n\nDays when everything feels like too much.\n\nDays when even being told to be strong feels unfair.\n\nSo I will not ask you to be strong right now.\n\nI will ask you to move closer to safety.\n\nText someone.\n\nCall someone.\n\nSit where another human can see you.\n\nMove away from anything you could use to hurt yourself.\n\nGo to the safest room you can reach.\n\nLet one safe person know you are not okay.\n\nYou are not a burden because you need support.\n\nYou are not dramatic because this is heavy.\n\nYou are not weak because today is hard to carry.\n\nI hope you stay.\n\nNot because everything is fixed.\n\nBut because this moment is not the whole story.`,
    shareExcerpt: `You do not have to solve your whole life right now.\n\nJust stay with the next breath.\nThen the next one.\nThen the next.\n\nYou are not a burden because you need support.\nYou do not have to do this alone.`,
    storySpine: {
      wound: "Life has become too loud inside the body and staying feels harder than it should",
      witness: "You are not dramatic. You are not a burden. This is genuinely heavy.",
      way: "Move closer to safety. One breath. One safe person. One room where another human can see you.",
    },
    emotionalIntensity: "crisisAdjacent",
    volumeChapter: "Survival",
    safetyNote: true,
    needsSafetyCue: true,
    safetyCueText:
      "If this brought up something that feels too heavy right now, please move close to someone safe. Visit Safety & Support or call a local crisis line.",
    receiptFrom: "The hour that felt too heavy to survive alone.",
    receiptTo: "The part of you that needs support, not shame.",
    receiptDate: "The moment you choose one more breath and one safe person.",
    receiptTotal: "You do not have to do this alone.",
    shortReceiptFrom: "The hour that felt too heavy to survive alone.",
    shortReceiptTo: "The part of you that needs support, not shame.",
    shortReceiptTotal: "You do not have to do this alone.",
    journalPrompt: "Who is one safe person or support place you can reach before the night gets heavier?",
    sendableText: "I found this and thought of you.\n\nYou do not have to do this alone.\n\nPlease stay near help. Message someone. Call someone. Let one safe person know you are not okay.",
    socialExcerpt: "You do not have to do this alone.",
    publicHook: "For the hour that feels too heavy to carry alone.",
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

function getDailyNoteIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return dayOfYear % notes.length;
}

export const featuredNote = notes[getDailyNoteIndex()];

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
