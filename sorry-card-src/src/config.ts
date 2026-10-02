export const sorryCardConfig = {
  recipient: "Ishita",
  sender: "Jatin",
  intro: {
    imageLabel: "I'm sorry. Please forgive me 🎀",
    title: "I Messed Up, {recipient} 😢",
    lines: ["But I'm ready to make it right.", "Will you hear me out?"],
    button: "Listen to my heart 💌",
  },
  slides: [
    {
      title: "I Know I Hurt You",
      message: "I messed up... and I'm really sorry for that.",
    },
    {
      title: "You Mean Everything",
      message: "I promise I'll be better for you.",
    },
    {
      title: "I'm Truly Sorry",
      message: "Please forgive me... You mean so much to me.",
    },
  ],
  envelope: {
    heading: "✉️ A LETTER AWAITS YOU",
    closed: "CLICK TO OPEN ❤️",
    opening: "Opening... 💌",
  },
  letter: {
    heading: "A VIRTUAL PEACE OFFERING ❤️",
    salutation: "My Dearest {recipient},",
    body: "I'm really sorry, my love. I accidentally upset the most precious and adorable person in my life — you. 🥺\n\nPlease forgive me if I hurt you or wasted even a second of your time being upset. You mean the entire world to me.Sorry For Being late ,Happy Girlfriend day my cuta I LOVE YOU MORE 💕",
    imageLabel: "itna Gussa aap par acha nahi lagta 🎀",
    button: "Continue →",
  },
  meter: {
    title: "FORGIVENESS METER ❤️",
    startLabel: "SORRY NA 🥺",
    warmingLabel: "Warming Up... 💗",
    almostLabel: "Almost There... 🥺",
    completeLabel: "FORGIVEN! 🎉",
    instruction: "TAP THE HEART TO HEAL MY HEART! 💓",
  },
  gifts: {
    heading: "🎁 VIRTUAL GIFTS FOR YOU",
    redeemable: "Redeemable anytime",
    button: "ENOUGH BRIBES! 💖",
    items: [
      {
        title: "FRESH BLOOMS 🌸",
        description: "Valid for 1 bouquet delivery + unlimited forehead kisses 💕",
      },
      {
        title: "CUDDLE PASS 🧸",
        description: "Valid for unlimited hugs, cuddles & no drama day 🤭",
      },
      {
        title: "SWEET TREAT 🍫",
        description: "Valid for your favorite chocolate + my full attention ☺️",
      },
    ],
  },
  final: {
    title: "Do You Forgive Me? 🥺",
    subtitle: "One tiny answer can make my whole heart smile.",
    yesButton: "Yes, I forgive you ❤️",
    noButton: "Not yet",
    acceptedTitle: "Thank You, {recipient}! 💕",
    acceptedMessage: "I promise to cherish your smile and do better every day. — {sender}",
    noResponse: "I'll keep trying, because you're worth it. 🥺",
  },
  navigation: {
    back: "← Back",
    next: "Next →",
  },
} as const;