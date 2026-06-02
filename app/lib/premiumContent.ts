import { categoryShowcase, featuredPieces } from "@/app/lib/siteData";

export const premiumHero = {
  kicker: "MB Atelier",
  title: ["Where light", "becomes legacy"],
  subtitle:
    "A cinematic house of diamonds, gold, and bespoke bridal artistry — crafted in Rajasthan, finished for the world.",
  primaryCta: { label: "Explore collections", href: "/collections" },
  secondaryCta: { label: "Book a private viewing", href: "/contact" },
  video: "/instareel/Video-281.mp4",
  alt: "Gold and diamond jewellery in cinematic lighting",
};

export const premiumCollections = categoryShowcase.map((item) => {
  if (item.title === "Diamond") {
    return {
      ...item,
      coverImage: "/pics/signature-worlds/diamond-cinematic-lighting.png",
      coverAlt: "Diamond necklace and earrings in cinematic lighting on black display",
    };
  }

  if (item.title === "Gold") {
    return {
      ...item,
      coverImage: "/pics/signature-worlds/gold-cinematic-lighting.png",
      coverAlt: "Traditional gold necklace and earrings in cinematic lighting on blue display",
    };
  }

  if (item.title === "Silver") {
    return {
      ...item,
      coverImage: "/pics/signature-worlds/silver-cinematic-lighting.png",
      coverAlt: "Silver necklace and jhumka earrings on black display with MB Jewellers branding",
    };
  }

  if (item.title === "Accessories") {
    return {
      ...item,
      coverImage: "/pics/signature-worlds/accessories-cinematic-lighting.png",
      coverAlt: "Polished silver dining set with tumblers, bowls, and spoons in a gift presentation",
    };
  }

  return item;
});

export const premiumStory = {
  kicker: "Heritage in motion",
  chapters: [
    {
      title: "Forged with intention",
      copy: "Every silhouette begins as a sketch — balanced between heritage filigree and contemporary restraint.",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&q=85&auto=format&fit=crop",
    },
    {
      title: "Set with firelight",
      copy: "Diamonds are selected for depth, not just diameter — so each piece catches candlelight and daylight alike.",
      image:
        "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=1400&q=85&auto=format&fit=crop",
    },
    {
      title: "Finished for forever",
      copy: "Polish, proportion, and presence — the final details that make MB pieces feel inevitable on the skin.",
      image: "/pics/Bridal/b2.jpg",
    },
  ],
};

export const premiumPromises = [
  {
    title: "Certified purity",
    detail: "Hallmarked gold and certified diamonds with transparent sourcing and finishing notes.",
  },
  {
    title: "Bespoke atelier",
    detail: "Bridal suites, heirloom resets, and private consultations tailored to your ceremony.",
  },
  {
    title: "Lifetime care",
    detail: "Cleaning, resizing guidance, and restoration support from our studio team.",
  },
  {
    title: "Exchange clarity",
    detail: "Fair exchange conversations with documented valuations and no hidden surprises.",
  },
];

export const premiumCollage = [
  { src: "/pics/Bridal/b1.jpg", alt: "Bridal portrait in warm light", className: "col-span-6 row-span-2 md:col-span-4" },
  {
    src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=900&q=80",
    alt: "Gold necklace styling",
    className: "col-span-6 md:col-span-4",
  },
  {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80",
    alt: "Gold bangles detail",
    className: "col-span-6 md:col-span-4",
  },
  {
    src: "/pics/Bridal/b3.jpg",
    alt: "Bridal jewellery close-up",
    className: "col-span-6 md:col-span-8",
  },
  {
    src: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=900&q=80",
    alt: "Diamond pendant",
    className: "col-span-6 md:col-span-4",
  },
];

export const premiumTestimonials = [
  {
    quote:
      "The studio felt like a private salon. Every piece was presented with patience, and the bridal set looked even richer in person.",
    name: "Ananya R.",
    meta: "Bridal client, Jaipur",
  },
  {
    quote:
      "Understated luxury — the kind of craftsmanship you notice in movement, not noise. MB has become our family jeweller.",
    name: "Rahul M.",
    meta: "Collector, Sikar",
  },
];

export const premiumProducts = featuredPieces.slice(0, 8).map((piece, index) =>
  index === 0
    ? {
        ...piece,
        image: "/pics/new-arrivals/diamond1-main.png",
        alt: "Emerald diamond set with matching earrings on black display bust",
      }
    : index === 1
      ? {
          ...piece,
          image: "/pics/new-arrivals/diamond2-main.png",
          alt: "Diamond set with drop motifs on black display bust",
        }
      : index === 3
        ? {
            ...piece,
            image: "/pics/new-arrivals/gold-main.png",
            alt: "Bridal gold chokar set with pearl fringe on teal display bust",
          }
        : index === 4
          ? {
              ...piece,
              image: "/pics/new-arrivals/gold5-main.png",
              alt: "Layered heritage gold chokar necklace with pendant on teal display bust",
            }
          : index === 5
            ? {
                ...piece,
                image: "/pics/new-arrivals/gold6-main.png",
                alt: "Traditional gold chokar necklace with coin motifs on teal display bust",
              }
            : piece,
);
